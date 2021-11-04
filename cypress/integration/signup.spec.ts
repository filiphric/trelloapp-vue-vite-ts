describe('Signup', () => {

  beforeEach(() => {
    cy.request('POST', '/api/reset')
  });

  it('sign up a user', () => {

    const user = {
      email: 'filip@example.com',
      password: 'Asdf.1234#'
    }

    cy.visit('/signup')

    cy.getDataCy('signup-email')
      .type(user.email)

    cy.getDataCy('signup-password')
      .type(user.password)

    cy.getDataCy('signup-submit')
      .click()

    cy.location('pathname')
      .should('eq', '/')

    cy.getCookie('trello_token')
      .should('exist')

  });
});