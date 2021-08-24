describe('creating board', () => {

  beforeEach( () => {
    cy.request('POST', '/api/reset')
  })
  it('creates a board', () => {
    cy.intercept('POST', '/api/boards').as('createBoard')
    cy.visit('/');
    cy.get('[data-cy="create-board"]').click();
    cy.get('[data-cy="new-board-input"]').type('new board{enter}');
    cy.wait('@createBoard').then(({ response }) => {
      cy.location('href').should('eq', `${Cypress.config('baseUrl')}/board/${response!.body.id}`)
    })
    cy.get('[data-cy=board-detail]').should('be.visible')
    cy.get('[data-cy=loading]').should('not.exist')
  });

  it('creates a board via create button', () => {
    cy.intercept('POST', '/api/boards').as('createBoard')
    cy.visit('/');
    cy.get('[data-cy="create-board"]').click();
    cy.get('[data-cy="new-board-input"]').should('be.focused');
    cy.get('[data-cy="new-board-input"]').type('new board');
    cy.get('[data-cy="new-board-create"]').click();
    cy.wait('@createBoard').then(({ response }) => {
      cy.location('href').should('eq', `${Cypress.config('baseUrl')}/board/${response!.body.id}`)
    })
    cy.get('[data-cy=board-detail]').should('be.visible')
    cy.get('[data-cy=loading]').should('not.exist')
  });

  it('closes create board dialog', () => {
    cy.visit('/');
    cy.get('[data-cy="create-board"]').click();
    cy.get('[data-cy="board-list"]').click('bottomRight');
    cy.get('[data-cy="new-board-input"]').should('not.exist');
    cy.get('[data-cy="create-board"]').click();
    cy.get('[data-cy="new-board-input"]').type('{enter}');
    cy.get('[data-cy="create-board"]').click();
    cy.get('[data-cy=cancel]').click();
    cy.location('href').should('eq', `${Cypress.config('baseUrl')}/`)
    cy.get('[data-cy="board-item"]').should('not.exist')
    cy.get('[data-cy="create-board"]').should('be.visible');
  });

  it('shows error when not able to create a board', () => {
    cy.intercept({
        method: 'POST',
        url: '/api/boards'
      }, {
        statusCode: 500
      }).as('createBoard');
    cy.clock();
    cy.visit('/');
    cy.get('[data-cy="create-board"]').click();
    cy.get('[data-cy="new-board-input"]').type('new{enter}');
    cy.get('[data-cy="notification-message"]').should('be.visible');
    cy.tick(4000);
    cy.get('[data-cy="notification-message"]').should('not.exist');
    cy.location('href').should('eq', `${Cypress.config('baseUrl')}/`)
    cy.get('[data-cy="board-item"]').should('not.exist')
    cy.get('[data-cy="new-board-input"]').should('be.visible');
  });
});
