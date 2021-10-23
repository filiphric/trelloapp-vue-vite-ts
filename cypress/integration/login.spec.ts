describe('Login', () => {
  
  const user = {
    email: 'filip@example.com',
    password: 'Asdf.1234#'
  }

  beforeEach(() => {
    
    cy.request('POST', '/api/reset')
    cy.signupApi({login: false, ...user})

  });

  it('logs in a new user', () => {

    cy.visit('/')

    cy.get('[data-cy=login-menu]')
      .should('be.visible')
      .click()

    cy.location('pathname')
      .should('eq', '/login')

    cy.get('[data-cy=login-email]')
      .type(user.email)

    cy.get('[data-cy=login-password]')
      .type(user.password)

    cy.get('[data-cy=login-submit]')
      .click()

    cy.location('pathname')
      .should('eq', '/')

    cy.getCookie('trello_token')
      .should('exist')

    cy.get('[data-cy=logged-user]')
      .click()

    cy.get('[data-cy=notification-message]')
      .should('contain.text', 'User was logged out')
    
  });

});