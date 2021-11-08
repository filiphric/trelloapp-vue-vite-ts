it('intercept body', () => {
  cy.intercept('GET', '/api/boards', {
    body: []
  }).as('boards');
  cy.visit('/');
});