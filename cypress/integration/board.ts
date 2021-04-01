import '../support/commands/addBoardApi';
import '../support/commands/addListApi';
import '../support/commands/addCardApi';

beforeEach(() => {

  cy
    .request('POST', '/api/reset');

  cy
    .addBoardApi('new board');

});

it('adds a new list', () => {

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .log('options appear')
    .get('[data-cy=add-list-options]')
    .should('be.visible');

  cy
    .log('type the list name')
    .get('[data-cy=add-list-input]')
    .type('new list{enter}');

  cy
    .log('list is visible')
    .get('[data-cy=list]')
    .should('be.visible');

  // update list name
  cy
    .log('change list name')
    .get('[data-cy=list-name]')
    .clear()
    .type('renamed list{enter}');

  cy
    .get('[data-cy=options]')
    .click();

  cy
    .contains('Delete this list')
    .click()

  cy
    .log('list is disappears')
    .get('[data-cy=list]')
    .should('not.exist');

});

it('adds, updates, checks, and deletes a card', () => {

  cy
    .addListApi({ boardIndex: 0, title: 'new list' });

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .log('click on add card button')
    .get('[data-cy="new-card"]')
    .click();

  cy
    .log('card options appear')
    .get('[data-cy="card-options"]')
    .should('be.visible');

  cy
    .get('[data-cy="add-card"]')
    .click();

  cy
    .log('card options appear')
    .get('[data-cy="card-options"]')
    .should('not.be.visible');

  cy
    .log('click on add card button')
    .get('[data-cy="new-card"]')
    .click();

  cy
    .log('card options appear')
    .get('[data-cy="card-options"]')
    .should('be.visible');

  cy
    .log('type the card name')
    .get('[data-cy="card-input"]')
    .type('new card{enter}');

  cy
    .log('card is created')
    .get('[data-cy="card"]')
    .should('be.visible');

  cy
    .get('[data-cy="card-done"]')
    .check();

  cy
    .get('[data-cy="card"]')
    .click();

  cy
    .log('card module appears')
    .get('[data-cy="card-module"]')
    .should('be.visible');

  cy
    .log('change the card name')
    .get('[data-cy="card-module-name"]')
    .clear()
    .type('updated card name{enter}');

  cy
    .log('open dropdown')
    .get('[data-cy="card-module-close"]')
    .click();

  cy
    .log('dropdown appear')
    .get('[data-cy="card-dropdown"]');

  cy
    .contains('Delete card')
    .click();

  cy
    .log('card module diappears')
    .get('[data-cy="card-module"]')
    .should('not.be.visible');

  cy
    .log('card disappears')
    .get('[data-cy="card"]')
    .should('not.exist');

});

it('opens card detail', () => {

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .addListApi({ boardIndex: 0, title: 'new list' })
    .addCardApi({ boardIndex: 0, listIndex: 0, title: 'new card' });

  cy
    .get('[data-cy="card"]')
    .click();

  cy
    .get('[data-cy="card-module"]')
    .should('be.visible');

  cy
    .get('[data-cy="card-description"]')
    .click();

  cy
    .get('[data-cy="card-description-input"]')
    .type('hello world');

  cy
    .get('[data-cy="card-description-save"]')
    .click();

  cy
    .get('[data-cy="card-deadline"]')
    .focus()
    .type(Cypress.moment().format('YYYY-MM-DD'))
    .blur();

  cy
    .get('[type="file"]')
    .attachFile('cypressLogo.png');

  cy
    .get('[data-cy="remove-image"]')
    .click();

  cy
    .log('open dropdown')
    .get('[data-cy="card-module-close"]')
    .click();

  cy
    .log('dropdown appear')
    .get('[data-cy="card-dropdown"]');

  cy
    .contains('Close card')
    .click();

});

it('sorts cards and lists', () => {

  cy
    .addListApi({ boardIndex: 0, title: 'list 1' })
    .addListApi({ boardIndex: 0, title: 'list 2' })
    .addCardApi({ boardIndex: 0, listIndex: 0, title: 'card 1' })
    .addCardApi({ boardIndex: 0, listIndex: 0, title: 'card 2' });

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .get('[data-cy="card"]')
    .eq(0)
    .as('card1');

  cy
    .get('[data-cy="card"]')
    .eq(1)
    .as('card2');

  cy
    .get('@card1')
    .drag('@card2');

  cy
    .get('[data-cy="cards-list"]')
    .eq(0)
    .as('cardList1');

  cy
    .get('[data-cy="cards-list"]')
    .eq(1)
    .as('cardList2');

  cy
    .get('[data-cy="card"]')
    .drag('@cardList2');

  cy
    .get('[data-cy="list"]')
    .eq(0)
    .as('list1');

  cy
    .get('[data-cy="list"]')
    .eq(1)
    .as('list2');

  cy
    .get('@list2')
    .drag('@list1');

});

it('shows an error message when there’s a network error on creating list', () => {

  cy
    .intercept('POST', '/api/lists', {
      forceNetworkError: true
    }).as('createList');

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .log('add a list')
    .get('[data-cy=add-list]')
    .click();

  cy
    .clock();

  cy
    .log('type the list name')
    .get('[data-cy=add-list-input]')
    .type('new list{enter}');

  cy
    .log('error message appears')
    .get('#errorMessage')
    .should('be.visible');

  cy
    .tick(4000);

  cy
    .log('error message disappears')
    .get('#errorMessage')
    .should('not.be.visible');

});

it('shows an error message when there’s a network error on creating card', () => {

  cy
    .intercept('POST', '/api/cards', {
      forceNetworkError: true
    }).as('createList');

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .addListApi({ boardIndex: 0, name: 'new list' });

  cy
    .log('add a list')
    .get('[data-cy=new-card]')
    .click();

  cy
    .clock();

  cy
    .log('type the list name')
    .get('[data-cy=new-list-input]')
    .type('new list{enter}');

  cy
    .log('error message appears')
    .get('#errorMessage')
    .should('be.visible');

  cy
    .tick(4000);

  cy
    .log('error message disappears')
    .get('#errorMessage')
    .should('not.be.visible');

});

it.only('update board name and delete board', () => {

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .get('[data-cy="board-title"]')
    .should('have.value', 'new board')
    .clear()
    .type('updated board name{enter}')
    .should('have.value', 'updated board name');

  cy
    .get('[data-cy="board-options"]')
    .click();

  cy
    .contains('Delete board')
    .click();

});