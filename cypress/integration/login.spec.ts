import '@commands/signupApi'

describe('Login', () => {
  
  const user = {
    email: 'filip@example.com',
    password: 'Asdf.1234#'
  }

  beforeEach(() => {
    
    cy.request('POST', '/api/reset')
    cy.signupApi({login: false, ...user})

  });

  it('logs in a user (click)', () => {

    cy.visit('/')

    cy.getDataCy('login-menu')
      .should('be.visible')
      .click()

    cy.location('pathname')
      .should('eq', '/login')

    cy.getDataCy('login-email')
      .type(user.email)

    cy.getDataCy('login-password')
      .type('invalid{enter}')

    cy.getDataCy('notification-message')
      .should('contain.text', 'Incorrect password')

    cy.getDataCy('login-password')
      .clear()
      .type(user.password)

    cy.getDataCy('login-submit')
      .click()

    cy.location('pathname')
      .should('eq', '/')

    cy.getCookie('trello_token')
      .should('exist')

    cy.getDataCy('logged-user')
      .click()

    cy.getDataCy('notification-message')
      .should('contain.text', 'User was logged out')
    
  });

  it('logs in a user (enter)', () => {

    cy.visit('/')

    cy.getDataCy('login-menu')
      .should('be.visible')
      .click()

    cy.location('pathname')
      .should('eq', '/login')

    cy.getDataCy('login-email')
      .type(user.email)

    cy.getDataCy('login-password')
      .type(`${user.password}{enter}`)

    cy.location('pathname')
      .should('eq', '/')

    cy.getCookie('trello_token')
      .should('exist')

    cy.getDataCy('logged-user')
      .click()

    cy.getDataCy('notification-message')
      .should('contain.text', 'User was logged out')
    
  });

  it('shows error on invalid login', () => {

    cy.setCookie('trello_token', 'invalid')

    cy.visit('/login')

    cy.getDataCy('notification-message')
      .should('contain.text', 'User is not authorized')

  })

});