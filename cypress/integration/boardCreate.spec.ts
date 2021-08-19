describe('creating board', () => {

  beforeEach( () => {
    cy.request('POST', '/api/reset')
  })
  it('creates a board', () => {
    cy.visit('/');
    cy.get('[data-cy="create-board"]').click();
    cy.get('[data-cy="new-board-input"]').type('new board{enter}');
  });

  it('creates a board via create button', () => {
    cy.visit('/');
    cy.get('[data-cy="create-board"]').click();
    cy.get('[data-cy="new-board-input"]').type('new board');
    cy.get('[data-cy="new-board-create"]').click();
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
  });

  it('shows error when not able to create a board', () => {
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
    cy.get('[data-cy="create-board"]').click();
    cy.get('[data-cy="new-board-input"]').type('new{enter}');
    cy.get('[data-cy="error-message"]').should('be.visible');
    cy.tick(4000);
    cy.get('[data-cy="error-message"]').should('not.exist');
  });
});
