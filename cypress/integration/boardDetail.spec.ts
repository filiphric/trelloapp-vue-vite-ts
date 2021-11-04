import '../support/commands/addBoardApi';
import '../support/commands/addListApi';

const oldName = 'board';
const newName = 'new board';

describe('board detail', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');
    cy.addBoardApi(oldName);
  });

  it('cancels renaming of a board', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('board-title').should('have.value', oldName);
    cy.getDataCy('board-title').click();
    cy.getDataCy('board-detail').click();
    cy.getDataCy('board-title').type('{esc}');
    cy.getDataCy('board-title').should('have.value', oldName);
  });

  it('renames of a board', () => {
    cy.intercept('PATCH', '/api/boards/*').as('boardRename');
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('board-title')
      .clear()
      .type(`${newName}{enter}`);
    cy.wait('@boardRename')
      .its('request.body.name')
      .should('eq', newName);
    cy.getDataCy('board-title').should('have.value', newName);
  });

  it('deletes a board', () => {
    cy.intercept('DELETE', '/api/boards/*').as('boardDelete');
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('board-options')
      .click()

    cy.getDataCy('board-dropdown')
      .should('be.visible')

    cy.getDataCy('delete-board')
      .click()

    cy.wait('@boardDelete')
      .its('response.statusCode')
      .should('eq', 200)

  });
});
