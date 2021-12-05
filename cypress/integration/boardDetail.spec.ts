const oldName = 'board';
const newName = 'new board';

beforeEach(() => {
  cy.request('POST', '/api/reset');
  cy.addBoardApi(oldName);
});

it('board actions', function() {
  
  const boardId = this.board.id;
  
  cy.visit(`/board/${boardId}`);

  cy.step('rename cancel')
  cy.getDataCy('board-title').should('have.value', oldName);
  cy.getDataCy('board-title').click();
  cy.getDataCy('board-detail').click();
  cy.getDataCy('board-title').type('{esc}');
  cy.getDataCy('board-title').should('have.value', oldName);

  cy.step('renames of a board')
  cy.intercept('PATCH', '/api/boards/*').as('boardChange');
  cy.getDataCy('board-title')
    .clear()
    .type(`${newName}{enter}`);
  cy.wait('@boardChange')
    .its('request.body.name')
    .should('eq', newName);
  cy.getDataCy('board-title').should('have.value', newName);

  cy.step('star board')
  cy.getDataCy('star').click()
  cy.wait('@boardChange')
    .its('request.body.starred')
    .should('be.true')

  cy.step('dropdown actions')
  cy.getDataCy('board-options').click()
  cy.getDataCy('board-dropdown').should('be.visible')
  cy.getDataCy('cancel').click()
  cy.getDataCy('board-dropdown').should('not.exist')
  cy.getDataCy('board-options').click()
  cy.getDataCy('board-dropdown').should('be.visible')
  cy.root().click()
  cy.getDataCy('board-dropdown').should('not.exist')
  
  cy.step('delete board')
  cy.intercept('DELETE', '/api/boards/*').as('boardDelete');
  cy.getDataCy('board-options').click()
  cy.getDataCy('delete-board').click()  
  cy.wait('@boardDelete')
    .its('response.statusCode')
    .should('eq', 200)
  cy.getDataCy('board-dropdown').should('not.exist')
  cy.location('pathname').should('eq', '/')

});
