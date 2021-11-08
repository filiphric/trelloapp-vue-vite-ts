it('shows error when board cannot be displayed', () => {
  cy.intercept({
      method: 'GET',
      url: '/api/boards'
    }, {
      forceNetworkError: true
    }
  ).as('boards');

  cy.visit('/');

  cy.get('[data-cy=board-list-error-message]').should('be.visible');
});
