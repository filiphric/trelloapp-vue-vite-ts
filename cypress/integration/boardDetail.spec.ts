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
    cy.get('[data-cy=board-title]').should('have.value', oldName);
    cy.get('[data-cy=board-title]').click();
    cy.get('[data-cy="board-detail"]').click();
    cy.get('[data-cy=board-title]').type('{esc}');
    cy.get('[data-cy=board-title]').should('have.value', oldName);
  });

  it('renames of a board', () => {
    cy.intercept('PATCH', '/api/boards/*').as('boardRename');
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=board-title]')
      .clear()
      .type(`${newName}{enter}`);
    cy.wait('@boardRename')
      .its('request.body.name')
      .should('eq', newName);
    cy.get('[data-cy=board-title]').should('have.value', newName);
  });
});
