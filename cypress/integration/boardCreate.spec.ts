describe('creating board', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');
  });

  it('creates first board', () => {
    cy.intercept('POST', '/api/boards').as('createBoard');
    cy.visit('/');
    cy.getDataCy('first-board').type('new board{enter}');
    cy.wait('@createBoard').then(({ response }) => {
      cy.location('href')
        .should('eq', `${Cypress.config('baseUrl')}/board/${response!.body.id}`);
    });
    cy.getDataCy('board-detail').should('be.visible');
    cy.getDataCy('loading').should('not.exist');
  });

  it('creates a board', () => {
    cy.addBoardApi('first')
    cy.intercept('POST', '/api/boards').as('createBoard');
    cy.visit('/');
    cy.getDataCy('create-board').click();
    cy.getDataCy('new-board-input').type('new board{enter}');
    cy.wait('@createBoard').then(({ response }) => {
      cy.location('href')
        .should('eq', `${Cypress.config('baseUrl')}/board/${response!.body.id}`);
    });
    cy.getDataCy('board-detail').should('be.visible');
    cy.getDataCy('loading').should('not.exist');
  });

  it('creates a board via create button', () => {
    cy.addBoardApi('first')
    cy.intercept('POST', '/api/boards').as('createBoard');
    cy.visit('/');
    cy.getDataCy('create-board').click();
    cy.getDataCy('new-board-input').should('be.focused');
    cy.getDataCy('new-board-input').type('new board');
    cy.getDataCy('new-board-create').click();
    cy.wait('@createBoard').then(({ response }) => {
      cy.location('href').should('eq', `${Cypress.config('baseUrl')}/board/${response!.body.id}`);
    });
    cy.getDataCy('board-detail').should('be.visible');
    cy.getDataCy('loading').should('not.exist');
  });

  it('closes create board dialog', () => {
    cy.addBoardApi('first')
    cy.visit('/');
    cy.getDataCy('create-board').click();
    cy.getDataCy('board-list').click('bottomRight');
    cy.getDataCy('new-board-input').should('not.be.visible');
    cy.getDataCy('create-board').click();
    cy.getDataCy('new-board-input').type('{enter}');
    cy.getDataCy('create-board').click();
    cy.getDataCy('cancel').click();
    cy.location('href').should('eq', `${Cypress.config('baseUrl')}/`);
    cy.getDataCy('board-item').should('have.length', 1);
    cy.getDataCy('create-board').should('be.visible');
  });

  it('shows error when not able to create a board', () => {
    cy.addBoardApi('first')
    cy.intercept(
      {
        method: 'POST',
        url: '/api/boards'
      },
      {
        statusCode: 500
      }
    ).as('createBoard');
    cy.clock();
    cy.visit('/');
    cy.getDataCy('create-board').click();
    cy.getDataCy('new-board-input').type('new{enter}');
    cy.getDataCy('notification-message').should('be.visible');
    cy.tick(4000);
    cy.getDataCy('notification-message').should('not.exist');
    cy.location('href').should('eq', `${Cypress.config('baseUrl')}/`);
    cy.getDataCy('board-item').should('have.length', 1);
    cy.getDataCy('new-board-input').should('be.visible');
  });
});
