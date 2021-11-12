/// <reference types="Cypress" />

describe('Delete board as anon user', { tags: '@ui' }, () => {

  before(() => {
    cy
      .task('seed:db', 'oneBoardAnonUser')
      .then(dbData => {
        cy
          .visit(`/board/${dbData.boards[0].id}`);
      });
  });

  it('Delete board', () => {

    cy
      .get('[data-cy=board-options]')
      .click();

    cy
      .get('[data-cy=delete-board]')
      .click();

    cy
      .contains('Board was deleted')
      .should('be.visible');
  });
});
