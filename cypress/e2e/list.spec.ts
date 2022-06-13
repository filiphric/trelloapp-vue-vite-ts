beforeEach(() => {
  cy.request('POST', '/api/reset');
  cy.addBoardApi('new board');
});

it('list actions', function() {

  const list1 = 'list1'
  const list2 = 'list2'
  const boardId = this.board.id

  cy.intercept({
    method: 'POST', 
    url:'/api/lists',
    times: 1
  }, { 
    statusCode: 500
  }).as('createList');

  cy.visit(`/board/${boardId}`);

  cy.step('show error message')
  cy.getDataCy('add-list-input').type('new list{enter}');
  cy.getDataCy('notification-message').should('be.visible').and('contain.text', 'List was not created')
  
  cy.step('does not accept empty list names')
  cy.getDataCy('add-list-input').type('{enter}');
  cy.getDataCy('list').should('not.exist');
  cy.getDataCy('add-list-input').should('be.focused');

  cy.step('cancels list creation')
  cy.getDataCy('add-list-input').type(`${list1}{esc}`);
  cy.getDataCy('list').should('not.exist');
  cy.getDataCy('add-list-input').should('not.exist');

  cy.step('cancel button')
  cy.getDataCy('create-list').click();
  cy.getDataCy('cancel').click();
  cy.getDataCy('list').should('not.exist');
  cy.getDataCy('add-list-input').should('not.exist');

  cy.step('click away')
  cy.getDataCy('create-list').click();
  cy.getDataCy('add-list-input').click();
  cy.getDataCy('board-detail').click();

  cy.step('create a list')
  cy.getDataCy('create-list').click();
  cy.getDataCy('add-list-input').should('be.focused').type(`${list1}{enter}`);
  cy.contains('Add list').click();
  cy.getDataCy('list').should('have.length', 1);

  cy.step('rename list')
  cy.getDataCy('list-name').type('renamed list{enter}');
  cy.getDataCy('list-name').should('have.value', 'renamed list');

  cy.step('open and close dropdown ')
  cy.getDataCy('list-options').click();
  cy.getDataCy('list-dropdown').should('be.visible');
  cy.getDataCy('cancel').click();
  cy.getDataCy('list-options').click();
  cy.getDataCy('board-detail').click('bottomRight');
  cy.getDataCy('list-dropdown').should('not.exist');

  cy.step('delete list')
  cy.getDataCy('list-options').click();
  cy.getDataCy('delete-list').click();
  cy.getDataCy('list').should('not.exist');

  cy.step('create first list')
  cy.getDataCy('create-list').click();
  cy.getDataCy('add-list-input').type(`${list1}{enter}`);
  cy.getDataCy('list').should('have.length', 1);

  cy.step('create second list')
  cy.getDataCy('add-list-input').type(`${list2}{enter}`);
  cy.getDataCy('list').should('have.length', 2);

  cy.step('reorder lists')
  cy.getDataCy('list-name').eq(0).as('list1').should('have.value', list1);
  cy.getDataCy('list-name').eq(1).as('list2').should('have.value', list2);
  cy.getDataCy('list').eq(0).drag('[data-cy=list-placeholder]:nth-child(2)', { force: true });
  cy.get('@list2').should('have.value', list1);
  cy.get('@list1').should('have.value', list2);

});
