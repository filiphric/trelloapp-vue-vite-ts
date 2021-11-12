/// <reference types="Cypress" />

import useful from 'useful-library';

const ANON_USER = 0;

describe('Create board as logged user', { tags: '@ui' }, () => {

  before(() => {
    cy
      .task('seed:db', 'emptyOneUser');
  });

  beforeEach(() => {
    cy
      .visit('/');

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
    
      Cypress.Cookies.preserveOnce('trello_token');
  });

  it('Create board from empty homepage', () => {
    cy
      .reload();
    
    const newBoardName = useful.randomString();

    cy
      .addFirstBoard(newBoardName);

      cy
        .url()
        .should('match', /board\/[0-9]+/)
        .getBoardIdFromUrl()
        .then(boardId => {
          cy
            .getCookie('trello_token')
            .then(cookie => {
              cy
                .getBoard({
                  headers: {
                    Authorization: `Bearer ${cookie.value}`,
                  },
                  boardId
                })
                .then(res => {
                  expect(String(res.body.id)).to.eq(boardId);
                  expect(res.body.user).not.to.eq(ANON_USER);
                });
            });
      });

    cy
      .get('[data-cy=board-title]')
      .invoke('val')
      .should('eq', newBoardName);
  });

  it('Create board from homepage', () => {
    cy
      .task('seed:db', 'oneBoardLoggedUser');

    cy
      .reload();
    
    const newBoardName = useful.randomString();

    cy
      .get('[data-cy=create-board]')
      .click();

    cy
      .get('[data-cy=new-board-input]')
      .type(`${newBoardName}{Enter}`);

    cy
      .url()
      .should('match', /board\/[0-9]+/)
      .getBoardIdFromUrl()
      .then(boardId => {
        cy
          .getCookie('trello_token')
          .then(cookie => {
            cy
              .getBoard({
                headers: {
                  Authorization: `Bearer ${cookie.value}`,
                },
                boardId
              })
              .then(res => {
                expect(String(res.body.id)).to.eq(boardId);
                expect(res.body.user).not.to.eq(ANON_USER);
              });
          });
      });

    cy
      .get('[data-cy=board-title]')
      .invoke('val')
      .should('eq', newBoardName);
  });
});
