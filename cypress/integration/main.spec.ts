
it('page opens main', () => {

  cy
    .visit('/')

})

it('has 404 page', () => {

  cy
    .visit('/board/1')

  cy
    .location('pathname')
    .should('eq', '/404')

  cy
    .get('[data-cy="404"')
    .should('be.visible')

})