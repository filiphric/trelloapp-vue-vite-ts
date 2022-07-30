beforeEach(() => {
  cy.request('POST', '/api/reset');
  cy.addBoardApi('new board').its('id').as('boardId')
    .addListApi({ name: 'new list' })
    .addCardApi({ name: 'new card' }).its('id').as('cardId');
});

it('performs a card search', function() {

  cy.visit('/')

  cy.window().invoke('store').invoke('toggleSearch', true)

  cy.getDataCy('search-input').type('new card')
  cy.getDataCy('result-item').contains('new card').click()

  cy.location('href').should('include', `/board/${this.boardId}?card=${this.cardId}`)

  cy.window().invoke('store').invoke('toggleSearch', true)
  cy.getDataCy('search-input').type('n')
  cy.getDataCy('result-item').should('be.visible')
  cy.getDataCy('search-input').type('{backspace}')
  
});