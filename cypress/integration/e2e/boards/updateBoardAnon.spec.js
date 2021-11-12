/// <reference types="Cypress" />

describe('Update board as anon user', { tags: '@ui' }, () => {

  before(() => {
    cy
      .task('seed:db', 'oneBoardAnonUser')
      .then(dbData => {
        cy
          .visit(`/board/${dbData.boards[0].id}`);
      });
  });

  it('Update board name', () => {

    cy
      .intercept('PATCH', /api\/boards\/[0-9]+/)
      .as('updateBoard');

    const newBoardName = 'new name';
    cy
      .get('[data-cy=board-title]')
      .click()
      .type(`${newBoardName}{Enter}`);

    cy
      .get('@updateBoard')
      .then(data => {
        expect(data.request.body).to.haveOwnProperty('name', newBoardName);
        expect(data.response.body).to.haveOwnProperty('name', newBoardName);
      });

    cy
      .get('[data-cy=board-title]')
      .invoke('val')
      .should('eq', newBoardName);
  });

  it('Star board', () => {

    cy
      .intercept('PATCH', /api\/boards\/[0-9]+/)
      .as('updateBoard');

    cy
      .get('[data-cy=board-star]')
      .click();

    cy
      .get('@updateBoard')
      .then(data => {
        expect(data.request.body).to.haveOwnProperty('starred', true);
        expect(data.response.body).to.haveOwnProperty('starred', true);
      });
  });

  it('Unstar board', () => {

    cy
      .getBoardIdFromUrl()
      .then(boardId => {
        cy
          .updateBoardApi({
            boardId,
            body: {
              starred: true,
            },
          });
      });
    
    cy
      .reload();

    cy
      .intercept('PATCH', /api\/boards\/[0-9]+/)
      .as('updateBoard');

    cy
      .get('[data-cy=board-star]')
      .click();

    cy
      .get('@updateBoard')
      .then(data => {
        expect(data.request.body).to.haveOwnProperty('starred', false);
        expect(data.response.body).to.haveOwnProperty('starred', false);
      });
  });
});
