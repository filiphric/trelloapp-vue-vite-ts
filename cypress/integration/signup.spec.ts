describe('Signup', () => {
  it('sign up a user', () => {

    const user = {
      email: 'filip@example.com',
      password: 'Asdf.1234#'
    }

    cy.visit('/signup')

    cy.get('[data-cy=signup-email]')
      .type(user.email)

    cy.get('[data-cy=signup-password]')
      .type(user.password)

    cy.get('[data-cy=signup-submit]')
      .click()

    cy.location('pathname')
      .should('eq', '/')

    cy.getCookie('trello_token')
      .should('exist')


  });
});