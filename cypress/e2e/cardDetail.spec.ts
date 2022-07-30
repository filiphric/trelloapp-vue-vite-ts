beforeEach(() => {
  cy.request('POST', '/api/reset');
  cy.addBoardApi('new board')
    .addListApi({ name: 'new list' })
    .addCardApi({ name: 'new card' });
});

it('card detail actions', function() {

  const boardId = this.board.id
  const cardId = this.card.id
  const card = this.card

  cy.intercept('PATCH', '/api/cards/*').as('updateCard');
  cy.intercept('DELETE', '/api/cards/*').as('deleteCard');
  cy.visit(`/board/${boardId}?card=${cardId}`);
  
  cy.step('closing and opening card')
  cy.getDataCy('card-detail').should('be.visible');
  cy.getDataCy('card-detail-backdrop').click('topRight');
  cy.getDataCy('card-detail').should('not.exist');
  cy.getDataCy('card').click();
  cy.getDataCy('card-detail').should('be.visible');
  cy.getDataCy('cancel').click()
  cy.getDataCy('card-detail').should('not.exist');
  cy.getDataCy('card').click();

  cy.step('card properties')
  cy.getDataCy('copy-properties').realClick();
  cy.window().its('navigator.clipboard')
    .invoke('readText').should('eq', JSON.stringify(card, null, 2));
  cy.getDataCy('notification-message')
    .should('exist')
    .and('contain.text', 'Card info copied to clipboard');

  cy.step('card rename')
  cy.getDataCy('card-detail-title').click();
  cy.getDataCy('card-detail-title').type('new name{enter}');
  cy.wait('@updateCard').its('request.body.name').should('eq', 'new name');
  cy.getDataCy('card-detail-title').should('have.value', 'new name');
  cy.getDataCy('card-detail-title').type('{esc}');
  cy.getDataCy('card-detail-title').should('have.value', 'new name');
  cy.getDataCy('notification-message')
    .should('exist')
    .and('contain.text', 'Card was renamed');

  cy.step('card deadline hide')
  cy.getDataCy('calendar-dropdown').click();
  cy.getDataCy('card-detail-deadline').should('be.visible');
  cy.getDataCy('calendar-dropdown').click();
  cy.getDataCy('card-detail-deadline').should('not.exist');
  
  cy.step('card deadline hide')
  cy.getDataCy('calendar-button').click();
  cy.getDataCy('card-detail-deadline').should('be.visible');
  cy.getDataCy('header-year').click();
  cy.contains('[data-cy=year]', '2021').click();
  cy.getDataCy('header-month').click();
  cy.contains('[data-cy=month]', 'Aug').click();
  cy.contains('[data-cy=day]', '15').click();
  cy.wait('@updateCard')
    .its('response.body.deadline')
    .should('eq', '2021-08-15');

  cy.step('card description')
  cy.getDataCy('card-description').type('new description{enter}');
  cy.wait('@updateCard').its('request.body').should('have.property', 'description', 'new description');
  
  cy.step('image upload')
  cy.intercept({
    method: 'POST',
    url: '/api/upload?card=*',
  }).as('imageUpload');
  cy.getDataCy('upload-image').selectFile('cypress/fixtures/cypressLogo.png', { action: 'drag-drop' });
  cy.wait('@imageUpload').its('response.body').should('have.property', 'image').and('not.be.empty');
  cy.getDataCy('image-attachment').should('exist');
  cy.getDataCy('notification-message').should('exist').and('contain.text', 'File was sucessfully uploaded');
  cy.getDataCy('image-delete').click();
  cy.wait('@updateCard').its('response.body.image').should('be.null');
  cy.getDataCy('image-attachment').should('not.exist');
  cy.getDataCy('upload-image').should('be.visible');

  cy.step('error when upload does not work')
  cy.intercept({
    method: 'POST',
    url: '/api/upload?card=*'
  }, {
    statusCode: 400
  }).as('imageUpload');
  cy.getDataCy('upload-image').selectFile('cypress/fixtures/cypressLogo.png', { action: 'drag-drop' });
  cy.getDataCy('notification-message').should('exist').and('contain.text', 'There was an error uploading file');

  cy.step('delete a card')
  cy.getDataCy('card-detail-delete').click();
  cy.wait('@deleteCard').its('response.statusCode').should('eq', 200);
  cy.getDataCy('card-detail').should('not.exist');
  cy.getDataCy('notification-message').should('exist').and('contain.text', 'Card was deleted');

});