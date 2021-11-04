describe('Board list', () => {

  it('shows error message', () => {

    cy.intercept('/api/boards', {
      forceNetworkError: true
    })

    cy.visit('/')

    cy.getDataCy('board-list-error-message')
      .should('contain.text', 'There was an error loading your boards')
    
  });

});