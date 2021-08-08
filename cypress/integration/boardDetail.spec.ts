import '../support/commands/addBoardApi'
import '../support/commands/addListApi'

beforeEach(() => {

  cy
    .request('POST', '/api/reset');

  cy
    .addBoardApi('new board');

}) 

it('cancels renaming of a board', () => {

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .get('[data-cy=board-title]')
    .click()

  cy
    .get('[data-cy="board-detail"]')
    .click()

  cy
    .get('[data-cy=board-title]')
    .type('{esc}')

})

it('renames of a board', () => {

  cy
  .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .get('[data-cy=board-title]')
    .clear()
    .type('new name of the board{enter}')

})

it('creates a list', () => {

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .get('[data-cy=add-list-input]')
    .type('new list{enter}')

  cy
    .get('[data-cy="list"]')
    .should('have.length', 1)

})

it('renames and deletes a list', () => {

  cy
    .addListApi({name: 'new list'})

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .get('[data-cy=list-name]')
    .type('renamed list{enter}')

  cy
    .get('[data-cy=options]')
    .click()

  cy
    .get('[data-cy=dropdown]')
    .should('be.visible');

  cy
    .get('[data-cy="delete-list"]')
    .click()

  cy
    .get('[data-cy="list"]')
    .should('not.exist')
  
})