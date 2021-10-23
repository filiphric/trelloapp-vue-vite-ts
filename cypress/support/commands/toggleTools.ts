Cypress.Commands.add('toggleTools', () => {

  cy.window().invoke('store').invoke('toggleTools')

})