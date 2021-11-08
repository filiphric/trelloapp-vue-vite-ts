it('intercept body with fixture', () => {
  cy.intercept('GET', '/api/boards', {
    fixture: 'customList'
  }).as('boards');
  cy.visit('/');
});