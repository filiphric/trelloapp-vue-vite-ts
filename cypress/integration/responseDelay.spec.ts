it('delays a request', () => {
  cy.intercept({
    url: '/api/boards',
    times: 1
  }, (req) => {
    req.reply( (res) => {
      res.delay = 5000
    })
  }).as('boards');
  cy.visit('/');
  cy.contains('This is taking too long.')
    .should('be.visible')
  cy.contains('Reload')
    .click()
});