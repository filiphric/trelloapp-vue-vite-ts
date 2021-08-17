import '../support/commands/addBoardApi';

describe('navigation bar', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');

    cy.addBoardApi('new board');
  });

  it('can navigate back to home page', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);

    cy.get('[data-cy=home]').click();

    cy.location('pathname').should('eq', '/');
  });
});
