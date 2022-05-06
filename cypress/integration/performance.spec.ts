beforeEach(() => {
  
  cy.request('POST', '/api/reset')

  cy.addBoardApi('board')
  cy.addListApi({ name: 'list' })
  cy.addCardApi({ name: 'card'})

});

it('does a performance check', function() {

  // cy.intercept({
  //   url: '/api/cards/*',
  //   middleware: true,
  // }, (req) => {
  //   req.reply(res => {
  //     res.delay = 1000;
  //   })
  // })

  cy.visit(`/board/${this.board.id}`)

  cy.mark('modal')

  cy.getDataCy('loading')
    .should('not.exist')

  cy.getDataCy('card')
    .click()

  cy.getDataCy('card-detail')
    .should('be.visible')

  cy.measure('modal')
    .should('be.lessThan', 1000)
  
});