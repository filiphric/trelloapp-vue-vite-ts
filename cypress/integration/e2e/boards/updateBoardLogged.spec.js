/// <reference types="Cypress" />

describe('Update board as logged user', { tags: '@ui' }, () => {

  before(() => {
    cy
      .task('seed:db', 'oneBoardLoggedUser')
      .then(dbData => {
        cy
          .fixture('credentials')
          .then(user => {
            cy
              .logInApi(user)
              .then(res => {
                cy
                  .setCookie('trello_token', res.body.accessToken);
              });
          }); 

        cy
          .visit(`/board/${dbData.boards[0].id}`);
      });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('trello_token');
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
          .getCookie('trello_token')
          .then(cookie => {
            cy
              .updateBoardApi({
                boardId,
                body: {
                  starred: true,
                },
                headers: {
                  Authorization: `Bearer ${cookie.value}`,
                },
              });
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
