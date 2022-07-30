
it('board actions', () => {
  cy.request('POST', '/api/reset');
  cy.intercept({
    method: 'POST', 
    url: '/api/boards',
    times: 3
  }).as('createBoard');
  cy.visit('/');

  cy.step('create first board')
  cy.getDataCy('first-board').type('new board{enter}');
  cy.wait('@createBoard').then(({ response }) => {
    cy.location('pathname')
      .should('eq', `/board/${response!.body.id}`);
  });
  cy.getDataCy('board-detail').should('be.visible');
  cy.getDataCy('loading').should('not.exist');
  cy.getDataCy('home').click();

  cy.step('star board')
  cy.intercept('PATCH', '/api/boards/*').as('starBoard');
  cy.getDataCy('board-item').should('be.visible');
  cy.getDataCy('starred-boards').should('not.exist');
  cy.getDataCy('board-item').trigger('mouseover');
  cy.getDataCy('star').click();
  cy.wait('@starBoard')
    .its('request.body.starred')
    .should('be.true');
  cy.getDataCy('starred-boards').should('be.visible');

  cy.step('board create field')
  cy.getDataCy('create-board').click();
  cy.getDataCy('board-list').click('bottomRight');
  cy.getDataCy('new-board-input').should('not.be.visible');
  cy.getDataCy('create-board').click();
  cy.getDataCy('new-board-input').type('{enter}');
  cy.getDataCy('create-board').click();
  cy.getDataCy('cancel').click();
  cy.location('pathname').should('eq', '/');
  cy.getDataCy('board-item').should('have.length', 1);
  cy.getDataCy('create-board').should('be.visible');

  cy.step('create second board with enter key')
  cy.getDataCy('create-board').click();
  cy.getDataCy('new-board-input').should('be.focused');
  cy.getDataCy('new-board-input').type('new board{enter}');
  cy.wait('@createBoard').then(({ response }) => {
    cy.location('pathname')
      .should('eq', `/board/${response!.body.id}`);
  });
  cy.getDataCy('board-detail').should('be.visible');
  cy.getDataCy('loading').should('not.exist');

  cy.getDataCy('trello-logo').click();

  cy.step('create third board with click')
  cy.getDataCy('create-board').click();
  cy.getDataCy('new-board-input').type('new board');
  cy.getDataCy('new-board-create').click();
  cy.wait('@createBoard').then(({ response }) => {
    cy.location('pathname').should('eq', `/board/${response!.body.id}`);
  });
  cy.getDataCy('board-detail').should('be.visible');
  cy.getDataCy('loading').should('not.exist');

  cy.go('back')
  
  cy.step('show error message on network error')
  cy.intercept({
      method: 'POST',
      url: '/api/boards',
      times: 1
    }, {
      statusCode: 500
    }).as('createBoard');
  cy.clock();
  cy.getDataCy('create-board').click();
  cy.getDataCy('new-board-input').type('new{enter}');
  cy.getDataCy('notification-message').should('be.visible');
  cy.tick(4000);
  cy.getDataCy('notification-message').should('not.exist');
  cy.location('pathname').should('eq', '/');
  cy.getDataCy('board-item').should('have.length', 3);
  cy.getDataCy('new-board-input').should('be.visible');


  cy.step('shows network error when board are not loaded')
  cy.intercept({
    url:'/api/boards',
    times: 1
  }, {
    statusCode: 404
  })
  cy.reload()
  cy.getDataCy('board-list-error-message')
    .should('contain.text', 'There was an error loading your boards')

  cy.contains('Try again').click()

  cy.location('pathname').should('eq', '/')
  cy.getDataCy('board-item').should('be.visible')
});