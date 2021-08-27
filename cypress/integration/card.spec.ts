import '../support/commands/addBoardApi';
import '../support/commands/addListApi';
import '../support/commands/addCardApi';

describe('creating a card', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');
    cy.addBoardApi('new board');
  });
  it('creates a card', () => {
    cy.intercept('POST', '/api/cards').as('createCard');
    cy.addListApi({name: 'new list'});
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=new-card]').click();
    cy.get('[data-cy=new-list-input]').type('new card{enter}');
    cy.wait('@createCard')
      .its('request.body.name')
      .should('eq', 'new card');
    cy.get('[data-cy=card').should('be.visible');
  });

  it('creates a card through dropdown', () => {
    cy.intercept('POST', '/api/cards').as('createCard');
    cy.addListApi({name: 'new list'});
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=list-options]').click();
    cy.get('[data-cy=card-add]').click();
    cy.get('[data-cy=new-list-input]')
      .should('be.visible')
      .should('be.focused');
    cy.get('[data-cy=new-list-input]').type('new card{enter}');
    cy.wait('@createCard')
      .its('request.body.name')
      .should('eq', 'new card');
    cy.get('[data-cy=card]').should('be.visible');
  });

  it('cancels creating a card', () => {
    cy.addListApi({name: 'new list'});
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    // esc key
    cy.get('[data-cy=new-card]').click();
    cy.get('[data-cy=new-list-input]').type('new card{esc}');
    cy.get('[data-cy=new-list-input]').should('not.exist');
    cy.get('[data-cy=card]').should('not.exist');
    // click away
    cy.get('[data-cy=new-card]').click();
    cy.get('[data-cy=board-detail]').click();
    cy.get('[data-cy=new-list-input]').should('not.exist');
    cy.get('[data-cy=card').should('not.exist');
    // enter no input
    cy.get('[data-cy=new-card]').click();
    cy.get('[data-cy=new-list-input]').type('{enter}');
    cy.get('[data-cy=card').should('not.exist');
    // cancel button
    cy.get('[data-cy="cancel"]').click();
    cy.get('[data-cy=new-list-input]').should('not.exist');
    cy.get('[data-cy=card').should('not.exist');
  });

  it('shows edit card icon', () => {
    cy.addListApi({name: 'new list'}).addCardApi({name: 'new card'});
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=card]').realHover();
    cy.get('[data-cy="card-edit"]').should('be.visible');
  });

  it('complete card', () => {
    cy.intercept('PATCH', '/api/cards/*').as('patchCard');
    cy.addListApi({name: 'new list'}).addCardApi({name: 'new card'});
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy="card-checkbox"]').check();
    cy.wait('@patchCard')
      .its('request.body.completed')
      .should('be.true');
  });
});
