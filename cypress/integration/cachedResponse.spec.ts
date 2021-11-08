it('handling a cached response', () => {
  cy.intercept('/api/boards', (req) => {
    delete req.headers['if-none-match']
  }).as('boards')
  cy.visit('/');
  cy.wait('@boards')
    .its('response.statusCode')
    .should('eq', 200)
});