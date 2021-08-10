import '../support/commands/addBoardApi'
import '../support/commands/addListApi'
import '../support/commands/addCardApi'

beforeEach(() => {

  cy
    .request('POST', '/api/reset');

  cy
    .addBoardApi('new board');

}) 

it('creates a card', () => {

  cy
    .addListApi({name: 'new list'})

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .get('[data-cy=new-card]')
    .click()

  cy
    .get('[data-cy=new-list-input]')
    .type('new card{enter}')

  cy
    .get('[data-cy=card')
    .should('be.visible')

})

it('creates a card through dropdown', () => {

  cy
    .addListApi({name: 'new list'})

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .get('[data-cy=options]')
    .click()

  cy
    .get('[data-cy=card-add]')
    .click()

  cy
    .get('[data-cy=new-list-input]')
    .should('be.visible')


})

it('cancels creating a card', () => {

  cy
    .addListApi({name: 'new list'})

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .get('[data-cy=new-card]')
    .click()

  cy
    .get('[data-cy=new-list-input]')
    .type('new card{esc}')

  cy
    .get('[data-cy=new-list-input]')
    .should('not.exist')

  cy
    .get('[data-cy=new-card]')
    .click()

  cy
    .get('[data-cy=board-detail]')
    .click()

  cy
    .get('[data-cy=new-list-input]')
    .should('not.exist')

  cy
    .get('[data-cy=new-card]')
    .click()

  cy
    .get('[data-cy=new-list-input]')
    .type('{enter}')

  cy
    .get('[data-cy=card]')
    .should('not.exist')

  cy
    .get('[data-cy="cancel"]')
    .click()

  cy
    .get('[data-cy=new-list-input]')
    .should('not.exist')

})

it('shows edit card icon', () => {

  cy
    .addListApi({name: 'new list'})
    .addCardApi({name: 'new card'})

  cy
    .visit(`/board/${Cypress.env('boards')[0].id}`);

  cy
    .get('[data-cy=card]')
    .trigger('mouseover')

  cy
    .get('[data-cy="card-edit"]')
    .should('be.visible')

  cy
    .get('[data-cy=card]')
    .trigger('mouseout')

  cy
    .get('[data-cy="card-edit"]')
    .should('not.exist')

})