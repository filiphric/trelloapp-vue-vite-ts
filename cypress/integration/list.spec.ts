import '../support/commands/addBoardApi';
import '../support/commands/addListApi';

describe('lists', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');
    cy.addBoardApi('new board');
  });

  it('creates a list', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('add-list-input').type('new list{enter}');
    cy.getDataCy('list').should('have.length', 1);
  });

  it('shows error when creating a list fails', () => {
    cy.intercept('POST', '/api/lists', { forceNetworkError: true }).as('createList');
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('add-list-input').type('new list{enter}');
    cy.getDataCy('notification-message').should('be.visible').and('contain.text', 'List was not created')
  });

  it('creates a second list', () => {
    cy.addListApi({ name: 'new list' });
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('create-list').click();
    cy.getDataCy('add-list-input').should('be.focused');
  });

  it('cancels creating a list', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('add-list-input').type('{enter}');
    cy.getDataCy('list').should('have.length', 0);
    cy.getDataCy('add-list-input').should('be.focused');
    cy.getDataCy('add-list-input').type('new list{esc}');
    cy.getDataCy('list').should('have.length', 0);
    cy.getDataCy('add-list-input').should('not.exist');
    cy.getDataCy('create-list').click();
    cy.getDataCy('cancel').click();
    cy.getDataCy('list').should('have.length', 0);
    cy.getDataCy('add-list-input').should('not.exist');
  });

  it('clicks away when creating a list', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('add-list-input').click();
    cy.getDataCy('board-detail').click();
  });

  it('renames a list', () => {
    cy.addListApi({ name: 'new list' });
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('list-name').type('renamed list{enter}');
  });

  it('cancels renaming a list', () => {
    cy.addListApi({ name: 'new list' });
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('list-name').type('renamed list{esc}');
  });

  it('uses dropdown to delete a list', () => {
    cy.addListApi({ name: 'new list' });
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('list-options').click();
    cy.getDataCy('dropdown').should('be.visible');
    cy.getDataCy('board-detail').click('bottomRight');
    cy.getDataCy('dropdown').should('not.exist');
    cy.getDataCy('list-options').click();
    cy.getDataCy('delete-list').click();
    cy.getDataCy('list').should('not.exist');
  });
});
