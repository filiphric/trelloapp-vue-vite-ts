/// <reference types="Cypress" />

describe('Delete board as logged user', { tags: '@ui' }, () => {

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
