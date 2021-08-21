import '../support/commands/addBoardApi';
import '../support/commands/addListApi';

describe('lists', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');
    cy.addBoardApi('new board');
  });

  it('creates a list', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=add-list-input]').type('new list{enter}');
    cy.get('[data-cy="list"]').should('have.length', 1);
  });

  it('creates a second list', () => {
    cy.addListApi({name: 'new list'});
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=create-list]').click();
    cy.get('[data-cy=add-list-input]').should('be.focused');
  });

  it('cancels creating a list', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=add-list-input]').type('{enter}');
    cy.get('[data-cy="list"]').should('have.length', 0);
    cy.get('[data-cy=add-list-input]').should('be.focused');
    cy.get('[data-cy=add-list-input]').type('new list{esc}');
    cy.get('[data-cy="list"]').should('have.length', 0);
    cy.get('[data-cy=add-list-input]').should('not.exist');
    cy.get('[data-cy=create-list]').click();
    cy.get('[data-cy="cancel"]').click();
    cy.get('[data-cy="list"]').should('have.length', 0);
    cy.get('[data-cy=add-list-input]').should('not.exist');
  });

  it('clicks away when creating a list', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=add-list-input]').click();
    cy.get('[data-cy=board-detail]').click();
  });

  it('renames a list', () => {
    cy.addListApi({name: 'new list'});
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=list-name]').type('renamed list{enter}');
  });

  it('cancels renaming a list', () => {
    cy.addListApi({name: 'new list'});
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=list-name]').type('renamed list{esc}');
  });

  it('uses dropdown to delete a list', () => {
    cy.addListApi({name: 'new list'});
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=options]').click();
    cy.get('[data-cy=dropdown]').should('be.visible');
    cy.get('[data-cy=board-detail]').click();
    cy.get('[data-cy=dropdown]').should('not.exist');
    cy.get('[data-cy=options]').click();
    cy.get('[data-cy="delete-list"]').click();
    cy.get('[data-cy="list"]').should('not.exist');
  });
});
