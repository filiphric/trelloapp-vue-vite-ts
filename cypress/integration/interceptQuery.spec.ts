it('intercept query', () => {
  cy.intercept('/api/boards', (req) => {
    req.query = {
      starred: 'false'
    }
  }).as('boards');
  cy.visit('/');
});