beforeEach(() => {
  cy.request('POST', '/api/reset');
  cy.addBoardApi('new board');
});

it('card actions', function() {

  const boardId = this.board.id

  cy.intercept('POST', '/api/cards').as('createCard');
  cy.addListApi({name: 'list 1'})
  cy.addListApi({name: 'list 2'})
  cy.visit(`/board/${boardId}`);

  cy.step('card create cancel')
  // esc key
  cy.getDataCy('new-card').eq(0).click();
  cy.getDataCy('new-card-input').type('new card{esc}');
  cy.getDataCy('new-card-input').should('not.exist');
  cy.getDataCy('card').should('not.exist');
  // click away
  cy.getDataCy('new-card').eq(0).click();
  cy.getDataCy('board-detail').click();
  cy.getDataCy('new-card-input').should('not.exist');
  cy.getDataCy('card').should('not.exist');
  // enter no input
  cy.getDataCy('new-card').eq(0).click();
  cy.getDataCy('new-card-input').type('{enter}');
  cy.getDataCy('card').should('not.exist');
  // cancel button
  cy.getDataCy('cancel').click();
  cy.getDataCy('new-card-input').should('not.exist');
  cy.getDataCy('card').should('not.exist');

  cy.step('create card')
  cy.getDataCy('new-card').eq(0).click();
  cy.getDataCy('new-card-input').eq(0).type('card 1{enter}');
  cy.wait('@createCard')
    .its('request.body.name')
    .should('eq', 'card 1');
  cy.getDataCy('card').should('be.visible');

  cy.step('card edit icon')
  cy.getDataCy('card').realHover();
  cy.getDataCy('card-edit').should('be.visible');

  cy.step('card complete')
  cy.intercept('PATCH', '/api/cards/*').as('patchCard');
  cy.getDataCy('card-checkbox').check();
  cy.wait('@patchCard')
    .its('request.body.completed')
    .should('be.true');
  cy.getDataCy('card-checkbox').uncheck();
  cy.wait('@patchCard')
    .its('request.body.completed')
    .should('be.false');

  cy.step('uses dropdown to create card')
  cy.getDataCy('list-options').eq(1).click();
  cy.getDataCy('card-add').click();
  cy.getDataCy('new-card-input')
    .should('be.visible')
    .should('be.focused');
  cy.getDataCy('new-card-input').type('card 2{enter}');
  cy.wait('@createCard')
    .its('request.body.name')
    .should('eq', 'card 2');
  cy.getDataCy('card').should('have.length', 2);
  cy.getDataCy('new-card-input').type('{esc}');

  cy.step('card move')
  cy.getDataCy('card-list').eq(0).as('list1')
  cy.getDataCy('card-list').eq(1).as('list2')
  cy.getDataCy('card').eq(0).drag('@list2')

  cy.step('card create error')
  cy.intercept('POST', '/api/cards', { forceNetworkError: true }).as('createCard');
  cy.getDataCy('new-card').eq(0).click();
  cy.getDataCy('new-card-input').type('new card{enter}');
  cy.getDataCy('notification-message').should('be.visible').and('contain.text', 'Card was not created')
  
});
