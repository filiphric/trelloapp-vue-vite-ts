import '../support/commands/addBoardApi';

describe('board item', () => {
  it('shows a star', () => {
    cy.request('POST', '/api/reset')
    cy.addBoardApi('new board');
    cy.visit('/');
    cy.getDataCy('board-item').trigger('mouseover');
    cy.getDataCy('star').should('be.visible');
    cy.getDataCy('board-item').trigger('mouseout');
    cy.getDataCy('star').should('not.be.visible');
  })
  it('stars board item', () => {
    cy.intercept('PATCH', '/api/boards/*').as('starBoard');
    cy.request('POST', '/api/reset');
    cy.addBoardApi('new board');
    cy.visit('/');
    cy.getDataCy('board-item').should('be.visible');
    cy.getDataCy('starred-boards').should('not.exist');
    cy.getDataCy('board-item').realHover();
    cy.getDataCy('star').click();
    cy.wait('@starBoard')
      .its('request.body.starred')
      .should('be.true');
    cy.getDataCy('starred-boards').should('be.visible');
  });
});
