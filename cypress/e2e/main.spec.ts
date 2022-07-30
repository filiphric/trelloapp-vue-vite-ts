describe('main page', () => {

  beforeEach(() => {
    cy.addBoardApi('new board')
  });

  it('has 404 page', function() {

    const boardId = this.board.id

    cy.visit('/board/9999999999');
    cy.getDataCy('board-list-error-message').should('be.visible');

    cy.contains('Go back home').click()
    cy.location('pathname').should('eq', '/')

    cy.visit(`/board/${boardId}?card=1`);
    cy.getDataCy('notification-message').should('contain.text', 'Card with id: 1 was not found')

  });

  
});
