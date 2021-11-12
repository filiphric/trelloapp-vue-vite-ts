/// <reference types="Cypress" />

import useful from 'useful-library';

describe('Create board as anon user', { tags: '@ui' }, () => {

  beforeEach(() => {
    cy
      .visit('/');
  });

  it('Create board from empty homepage', () => {
    cy
      .task('seed:db', 'empty');

    cy
      .reload();
    
    const newBoardName = useful.randomString();

    cy
      .addFirstBoard(newBoardName);

    cy
      .url()
      .should('match', /board\/[0-9]+/);

    cy
      .get('[data-cy=board-title]')
      .invoke('val')
      .should('eq', newBoardName);
  });

  it('Create board from homepage', () => {
    cy
      .task('seed:db', 'oneBoardAnonUser');

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
      .should('match', /board\/[0-9]+/);

    cy
      .get('[data-cy=board-title]')
      .invoke('val')
      .should('eq', newBoardName);
  });
});
