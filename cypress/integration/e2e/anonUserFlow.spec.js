/// <reference types="Cypress" />

import moment from 'moment';
import useful from 'useful-library';

describe('Anon user flow', { tags: '@ui' }, () => {

  beforeEach(() => {
    cy
      .task('seed:db', 'empty');
    cy
      .visit('/');
  });

  it('Create board with two lists', () => {

    cy
      .addFirstBoard(useful.randomString());

    cy
      .intercept('POST', /api\/lists/)
      .as('listRoute');

    const list1 = useful.randomString();
    cy
      .get('[data-cy=add-list-input]')
      .type(`${list1}{Enter}`);

    cy
      .wait('@listRoute')
      .then(data => {
        cy.log(data)
        cy
          .getBoardIdFromUrl()
          .then(boardId => {
            expect(String(data.request.body.boardId)).to.eq(boardId);
            expect(String(data.response.body.boardId)).to.eq(boardId);
            expect(data.request.body.name).to.eq(list1);
            expect(data.response.body.name).to.eq(list1);
          });
      });

    cy
      .get('[data-cy=list-name]')
      .eq(0)
      .invoke('val')
      .should('eq', list1);

    const list2 = useful.randomString();
    cy
      .get('[data-cy=add-list-input]')
      .type(`${list2}{Enter}`);

    cy
      .wait('@listRoute')
      .then(data => {
        cy.log(data)
        cy
          .getBoardIdFromUrl()
          .then(boardId => {
            expect(String(data.request.body.boardId)).to.eq(boardId);
            expect(String(data.response.body.boardId)).to.eq(boardId);
            expect(data.request.body.name).to.eq(list2);
            expect(data.response.body.name).to.eq(list2);
          });
      });

    cy
      .get('[data-cy=list-name]')
      .eq(1)
      .invoke('val')
      .should('eq', list2);
  });

  it('Create board with list and one card', () => {
    cy
      .createBoardApi({
        body: {
          name: useful.randomString(),
        },
      })
      .then(board => {
        cy
          .visit(`/board/${board.body.id}`);

        cy
          .createListApi({
            body: {
              boardId: board.body.id,
              name   : useful.randomString(),
            },
          })
          .then(list => {
            cy
              .reload();

            cy
              .get('[data-cy=new-card]')
              .click();
        
            cy
              .intercept('POST', /api\/cards/)
              .as('cardRoute');
        
            const cardName = useful.randomString();
            cy
              .get('[data-cy=new-card-input]')
              .type(`${cardName}{Enter}`);
        
            cy
              .wait('@cardRoute')
              .then(data => {
                expect(data.request.body.boardId).to.eq(board.body.id);
                expect(data.request.body.listId).to.eq(list.body.id);
                expect(data.response.body.boardId).to.eq(board.body.id);
                expect(data.response.body.listId).to.eq(list.body.id);

                expect(data.request.body.name).to.eq(cardName);
                expect(data.response.body.name).to.eq(cardName);

                expect(data.response.body.created).to.eq(useful.yyyyMmDd().replace(/\//g, '-'));
                expect(data.response.body.order).to.eq(0);
              });

            cy
              .get('[data-cy=card-date]')
              .should('have.text', moment().add(3, 'day').format('MMM DD YYYY'));
          });
      });
  });

  it('Reorder cards on a list', () => {
    cy
      .task('seed:db', 'anonUserDragDrop')
      .then(dbData => {
        cy
          .visit(`/board/${dbData.boards[0].id}`);
        cy
          .reload();

        cy
          .get('[data-cy=card]')
          .eq(0)
          .as('first');
        
        cy
          .get('[data-cy=card]')
          .eq(1)
          .as('second');
        
        cy
          .get('@first')
          .drag('@second');

        cy
          .get('@first')
          .find('[data-cy=card-title]')
          .should('have.text', dbData.cards[1].name);

        cy
          .get('@second')
          .find('[data-cy=card-title]')
          .should('have.text', dbData.cards[0].name);
      });
  });

  it('Go to login page', () => {
    cy
      .get('[data-cy=login-menu]')
      .click();

    cy
      .url()
      .should('match', /login$/);    
  });

  it('Go to signup page', () => {
    cy
      .visit('/login');

    cy
      .get('[href="/signup"]')
      .click();

    cy
      .url()
      .should('match', /signup$/);    
  });

  ['signup', 'login'].forEach(page => {
    it(`Go home page from ${page} page`, () => {
      cy
        .visit(`/${page}`);
  
      cy.get('[data-cy=home]')
        .click();
  
      cy
        .url()
        .should('match', /\/$/);    
    });
  });

  it('Sign up', () => {
    cy
      .visit('/signup');

    cy
      .fixture('credentials')
      .then(user => {

        cy
          .intercept('POST', /api\/signup/)
          .as('signupRoute');

        cy
          .fillInSignupForm(user);

        cy
          .get('[data-cy=signup-submit]')
          .click();

        cy
          .wait('@signupRoute')
          .then(data => {
            expect(data.request.body.email).to.eq(user.email);
            expect(data.request.body.password).to.eq(user.password);

            expect(data.response.body).to.haveOwnProperty('accessToken');
          });

        cy
          .contains('User was successfully created')
          .should('be.visible');

        cy
          .contains('Log out')
          .should('be.visible');

        cy
          .url()
          .should('match', /\/$/);
      });
  });

  it('Log in', () => {
    cy
      .fixture('credentials')
      .then(user => {
        cy
          .createUserApi(user);

        cy
          .visit('/login');      

        cy
          .intercept('POST', /api\/login/)
          .as('loginRoute');

        cy
          .fillInLoginForm(user);

        cy
          .get('[data-cy=login-submit]')
          .click();

        cy
          .wait('@loginRoute')
          .then(data => {
            expect(data.request.body.email).to.eq(user.email);
            expect(data.request.body.password).to.eq(user.password);

            expect(data.response.body).to.haveOwnProperty('accessToken');
          });

        cy
          .contains('User is logged in')
          .should('be.visible');

        cy
          .contains('Log out')
          .should('be.visible');

        cy
          .url()
          .should('match', /\/$/);
      });
  });
});
