import Tools from './Tools.vue';

it('renders a message', () => {
  cy.intercept('/api/*').as('api');

  cy.mount(Tools);

  cy.contains('All').click();
  cy.wait('@api').its('request.url').should('contain', '/api/reset');

  cy.contains('Boards').click();
  cy.wait('@api').its('request.url').should('contain', '/api/boards');

  cy.contains('Lists').click();
  cy.wait('@api').its('request.url').should('contain', '/api/lists');

  cy.contains('Cards').click();
  cy.wait('@api').its('request.url').should('contain', '/api/cards');

  cy.contains('Users').click();
  cy.wait('@api').its('request.url').should('contain', '/api/users');
});
