it('intercept status code', () => {
  cy.intercept('/api/boards', {
    statusCode: 500,
    body: {
      message: 'Oops something went wrong!'
    }
  }).as('boards');
  cy.visit('/');
});