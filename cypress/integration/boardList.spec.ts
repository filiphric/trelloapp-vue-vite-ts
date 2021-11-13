import '../support/commands/addBoardApi'

describe('Board list', () => {

  beforeEach(() => {
    cy.request('POST', '/api/reset')
  });

  it('shows error message', () => {

    cy.intercept('/api/boards', {
      forceNetworkError: true
    })

    cy.visit('/')

    cy.getDataCy('board-list-error-message')
      .should('contain.text', 'There was an error loading your boards')
    
  });

  it('shows create board button when only starred board is present', () => {

    cy.addBoardApi('new board')
    cy.visit('/')
    cy.getDataCy('board-item').realHover();
    cy.getDataCy('star').click();
    cy.getDataCy('starred-boards')
    cy.getDataCy('create-board').should('be.visible')
    
  });

});