describe('Password reset safeguards', () => {
  let serverId;
  before(() => {
    cy.env(['MAILOSAUR_SERVER_ID']).then((env) => {
      serverId = env.MAILOSAUR_SERVER_ID;
    });
  });
  it('rejects malformed requests and invalid tokens', () => {
    cy.request({ method: 'POST', url: '/api/password-reset/request', body: { email: 'invalid' }, failOnStatusCode: false })
      .its('status')
      .should('eq', 400);
    cy.request({ method: 'POST', url: '/api/password-reset/confirm', body: { token: 'invalid', password: 'New-password-123!' }, failOnStatusCode: false })
      .its('status')
      .should('eq', 400);
    cy.request({ method: 'POST', url: '/api/password-reset/confirm', body: { token: 'invalid', password: 'short' }, failOnStatusCode: false })
      .its('status')
      .should('eq', 400);
  });

  it('changes the password once and rejects token reuse', () => {
    const email = `api-${Date.now()}-${Cypress._.random(100000, 999999)}@${serverId}.mailosaur.net`;
    const password = 'New-password-123!';
    const receivedAfter = new Date();
    cy.request('POST', '/api/signup', { email, password: 'Old-password-123!' });
    cy.request('POST', '/api/password-reset/request', { email }).then((known) => {
      cy.request('POST', '/api/password-reset/request', { email: `unknown-${email}` }).then((unknown) => {
        expect(unknown.status).to.equal(known.status);
        expect(unknown.body).to.deep.equal(known.body);
      });
    });
    cy.mailosaurGetMessage(serverId, { sentTo: email }, { receivedAfter, timeout: 60000 }).then((message) => {
      const link = message.html.links.find((entry) => entry.text === 'Reset password');
      const token = new URL(link.href).searchParams.get('token');
      cy.request('POST', '/api/password-reset/confirm', { token, password }).its('status').should('eq', 200);
      cy.request({ method: 'POST', url: '/api/password-reset/confirm', body: { token, password }, failOnStatusCode: false }).its('status').should('eq', 400);
      cy.request('POST', '/api/login', { email, password }).its('status').should('eq', 200);
    });
  });
});
