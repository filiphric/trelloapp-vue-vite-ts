describe('Password recovery', () => {
  let serverId;
  before(() => {
    cy.env(['MAILOSAUR_SERVER_ID']).then((env) => {
      serverId = env.MAILOSAUR_SERVER_ID;
    });
  });
  it('resets a password through the emailed link and logs in', () => {
    const email = `reset-${Date.now()}-${Cypress._.random(100000, 999999)}@${serverId}.mailosaur.net`;
    const oldPassword = 'Original-password-123!';
    const newPassword = 'Updated-password-456!';
    const receivedAfter = new Date();

    cy.log(`Mailosaur recipient: ${email}`);
    cy.request('POST', '/api/signup', { email, password: oldPassword });
    cy.visit('/login');
    cy.get('[data-test-id="forgot-password"]').click();
    cy.get('[data-test-id="reset-email"]').type(email);
    cy.intercept('POST', '/api/password-reset/request').as('sendReset');
    cy.get('[data-test-id="reset-submit"]').click();
    cy.wait('@sendReset', { responseTimeout: 30000 }).its('response.statusCode').should('eq', 202);
    cy.get('[data-test-id="reset-success"]').should('contain', 'If an account exists');

    cy.mailosaurGetMessage(serverId, { sentTo: email }, { receivedAfter, timeout: 60000 }).then((message) => {
      expect(message.subject).to.equal('Reset your Trello app password');
      const resetLink = message.html.links.find((link) => link.text === 'Reset password');
      expect(resetLink, 'email contains a reset link').to.exist;
      cy.writeFile('cypress/results/reset-message.json', {
        messageId: message.id,
        recipient: email,
        receivedAfter: receivedAfter.toISOString(),
        subject: message.subject,
        // Keep the reset token out of CI artifacts.
        resetPath: new URL(resetLink.href).pathname,
      });
      cy.visit(resetLink.href);
    });

    cy.get('[data-test-id="reset-password"]', { timeout: 10000 }).should('be.visible').type(newPassword);
    cy.get('[data-test-id="reset-submit"]').click();
    cy.get('[data-test-id="reset-success"]').should('contain', 'Password updated');
    cy.contains('Back to login').click();
    cy.get('[data-test-id="login-email"]').type(email);
    cy.get('[data-test-id="login-password"]').type(newPassword);
    cy.intercept('POST', '/api/login').as('login');
    cy.get('[data-test-id="login-submit"]').click();
    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('eq', '/');
    cy.request({ method: 'POST', url: '/api/login', body: { email, password: oldPassword }, failOnStatusCode: false })
      .its('status')
      .should('eq', 400);
  });
});
