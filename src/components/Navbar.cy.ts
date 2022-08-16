import Navbar from '@/components/Navbar.vue'

it('Hides home button', () => {

  cy.mount(Navbar)
  cy.get('nav').should('be.visible')
  cy.get('[data-cy=home]').should('not.be.visible')

})

it.only('Shows home button', () => {

  cy.mount(Navbar, { path: '/login' })
  cy.get('nav').should('be.visible')
  cy.get('[data-cy=home]').should('be.visible')
  cy.get('[data-cy="login-menu"]').should('not.be.visible')

})