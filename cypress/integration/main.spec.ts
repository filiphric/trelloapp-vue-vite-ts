import '../support/commands/addBoardApi';

describe('main page', () => {
  it('page opens main', () => {
    cy.visit('/');
  });

  it('has 404 page', () => {
    cy.on('uncaught:exception', () => {
 return false 
})
    cy.visit('/board/1');
    cy.url().should('contain', '/404');
    cy.getDataCy('404').should('be.visible');
  });

  it('shows error when openin non existing card is opened', () => {
    cy.addBoardApi('new board').then(() => {
      cy.visit(`/board/${Cypress.env('boards')[0].id}?card=1`);
    });
  });
});
