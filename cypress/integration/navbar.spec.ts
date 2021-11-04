import '../support/commands/addBoardApi';

describe('navigation bar', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');
    cy.addBoardApi('new board');
  });

  it('can navigate back to home page via home button', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('home').click();
    cy.location('pathname').should('eq', '/');
  });

  it('can navigate back to home page via logo', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('trello-logo').click();
    cy.location('pathname').should('eq', '/');
  });
});
