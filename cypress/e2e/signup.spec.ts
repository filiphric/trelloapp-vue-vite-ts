describe('Signup', () => {

  beforeEach(() => {
    cy.request('POST', '/api/reset')
  });

  it('sign up a user (click)', () => {

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

    cy.getCookie('auth_token')
      .should('exist')

  });

  it('sign up a user (enter)', () => {

    const user = {
      email: 'filip@example.com',
      password: 'Asdf.1234#'
    }

    cy.visit('/signup')

    cy.getDataCy('signup-email')
      .type(user.email)

    cy.getDataCy('signup-password')
      .type(`${user.password}{enter}`)

    cy.location('pathname')
      .should('eq', '/')

    cy.getCookie('auth_token')
      .should('exist')

  });
});