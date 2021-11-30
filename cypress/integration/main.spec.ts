describe('main page', () => {

  beforeEach(() => {
    cy.addBoardApi('new board')
  });

  it('has 404 page', function() {

    const boardId = this.board.id

    cy.visit('/board/1');
    cy.url().should('contain', '/404');
    cy.getDataCy('404').should('be.visible');

    cy.visit(`/board/${boardId}?card=1`);
    cy.getDataCy('notification-message').should('contain.text', 'Card with id: 1 was not found')

  });

  
});
