import { onlyOn } from '@cypress/skip-test'

beforeEach( () => {
 cy.request('POST', '/api/reset')
})

it('Google SSO signup and login', () => {

  onlyOn(Cypress.env('googleEnabled') === 'true')

  cy.step('Signup with Google')
  cy.googleSignup()
  
  cy.visit('/')
  
  cy.step('User is logged in')
  cy.getDataCy('logged-user')
    .should('contain.text', 'filip@filiphric.sk')
  
  cy.step('create board')
  cy.getDataCy('first-board')
    .type('google board{enter}')
  
  cy.step('go back to home page')
  cy.go('back')

  cy.step('board is visible')
  cy.getDataCy('board-item')
    .should('be.visible')
  
  cy.step('logout')
  cy.getDataCy('logged-user')
    .click()
  
  cy.step('board disappears from view')
  cy.getDataCy('board-item')
    .should('not.exist')

  cy.googleLogin()
  cy.reload()

  cy.step('board is visible')
  cy.getDataCy('board-item')
    .should('be.visible')

})