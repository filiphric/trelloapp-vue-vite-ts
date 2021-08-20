import '../support/commands/addBoardApi';

describe('board item', () => {
  it('stars board item', () => {
    cy.intercept('PATCH', '/api/boards/*').as('starBoard')
    cy.request('POST', '/api/reset');
    cy.addBoardApi('new board');
    cy.visit('/');
    cy.get('[data-cy="board-item"]').should('be.visible')
    cy.get('[data-cy="starred-boards"]').should('not.exist')
    cy.get('[data-cy="board-item"]').realHover();
    cy.get('[data-cy="star"]').click();
    cy.wait('@starBoard').its('request.body.starred').should('be.true')
    cy.get('[data-cy="starred-boards"]').should('be.visible')
  });
});
