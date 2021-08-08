import '../support/commands/addBoardApi'

it('stars board item', () => {

  cy
    .request('POST', '/api/reset')


  cy
    .addBoardApi('new board');

  cy
    .visit('/')

  cy
    .get('[data-cy="board-item"]')
    .realHover()

  cy
    .get('[data-cy="star"]')
    .click()
})