it('intercept once', () => {
  cy.intercept({
    method: 'GET', 
    url: '/api/boards',
    times: 1
  }, {
    body: []
  }).as('boards');
  cy.visit('/');

  cy.get('[data-cy=first-board]')
    .type('rocket launch{enter}')

  cy.get('[data-cy=home]')
    .click()
});