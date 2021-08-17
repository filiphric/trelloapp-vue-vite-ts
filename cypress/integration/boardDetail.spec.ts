import '../support/commands/addBoardApi';
import '../support/commands/addListApi';

describe('board detail', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');

    cy.addBoardApi('new board');
  });

  it('cancels renaming of a board', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);

    cy.get('[data-cy=board-title]').click();

    cy.get('[data-cy="board-detail"]').click();

    cy.get('[data-cy=board-title]').type('{esc}');
  });

  it('renames of a board', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);

    cy.get('[data-cy=board-title]')
      .clear()
      .type('new name of the board{enter}');
  });
});
