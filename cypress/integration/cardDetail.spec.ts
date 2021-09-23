import '../support/commands/addBoardApi';
import '../support/commands/addListApi';
import '../support/commands/addCardApi';

describe('card detail', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');
    cy.addBoardApi('new board')
      .addListApi({name: 'new list'})
      .addCardApi({name: 'new card'});
  });

  it('uploads a file', () => {
    cy.intercept('POST', '/api/upload').as('imageUpload');
    cy.intercept('PATCH', '/api/cards/*').as('updateCard');
    cy.clock();
    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=${Cypress.env('cards')[0].id}`);
    cy.get('[data-cy="upload-image"]').attachFile('cypressLogo.png', {subjectType: 'drag-n-drop'});
    cy.wait('@imageUpload')
      .its('response.body')
      .should('have.property', 'path')
      .and('not.be.empty');
    cy.wait('@updateCard')
      .its('response.body.image')
      .should('not.be.empty');
    cy.get('[data-cy="image-attachment"]').should('exist');
    cy.get('[data-cy="notification-message"]')
      .should('exist')
      .and('contain.text', 'File was sucessfully uploaded');
    cy.tick(4000);
    cy.get('[data-cy="notification-message"]').should('not.exist');
    cy.get('[data-cy="image-delete"]').click();
    cy.wait('@updateCard')
      .its('response.body.image')
      .should('be.null');
    cy.get('[data-cy="image-attachment"]').should('not.exist');
    cy.get('[data-cy="upload-image"]').should('be.visible');
  });

  it('shows error message when uploading a file fails', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/upload'
      },
      {
        statusCode: 400
      }
    ).as('imageUpload');
    cy.clock();
    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=${Cypress.env('cards')[0].id}`);
    cy.get('[data-cy="upload-image"]').attachFile('cypressLogo.png', {subjectType: 'drag-n-drop'});
    cy.get('[data-cy="notification-message"]')
      .should('exist')
      .and('contain.text', 'There was an error uploading file');
    cy.tick(4000);
    cy.get('[data-cy="notification-message"]').should('not.exist');
  });

  it('changes card date', () => {
    cy.intercept('PATCH', '/api/cards/*').as('updateCard');
    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=${Cypress.env('cards')[0].id}`);
    // dropdown
    cy.get('[data-cy=calendar-dropdown]').click();
    cy.get('[data-cy=card-detail-deadline]').should('be.visible');
    // dropdown hides
    cy.get('[data-cy=calendar-dropdown]').click();
    cy.get('[data-cy=card-detail-deadline]').should('not.exist');
    // calendar buton on side
    cy.get('[data-cy=calendar-button]').click();
    cy.get('[data-cy=card-detail-deadline]').should('be.visible');
    cy.get('.vc-title').click();
    cy.get('.vc-nav-title').click();
    cy.contains('.vc-nav-item', '2021').click();
    cy.contains('.vc-nav-item', 'Aug').click();
    cy.contains('.vc-day.id-2021-08-15', '15').click();
    cy.wait('@updateCard')
      .its('response.body.deadline')
      .should('eq', '2021-08-15');
  });

  it('copies card properties', () => {
    cy.clock();
    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=${Cypress.env('cards')[0].id}`);
    cy.get('[data-cy="copy-properties"]').realClick();
    cy.task('getClipboard').should('eq', JSON.stringify(Cypress.env('cards')[0], null, 2));
    cy.get('[data-cy="notification-message"]')
      .should('exist')
      .and('contain.text', 'Card info copied to clipboard');
    cy.tick(4000);
    cy.get('[data-cy="notification-message"]').should('not.exist');
  });

  it('renames a card', () => {
    cy.intercept('PATCH', '/api/cards/*').as('updateCard');
    cy.clock();
    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=${Cypress.env('cards')[0].id}`);
    cy.get('[data-cy="card-detail-title"]').click();
    cy.get('[data-cy="card-detail-title"]').type('new name{enter}');
    cy.wait('@updateCard')
      .its('request.body.name')
      .should('eq', 'new name');
    cy.get('[data-cy="card-detail-title"]').should('have.value', 'new name');
    cy.get('[data-cy="card-detail-title"]').type('{esc}');
    cy.get('[data-cy="card-detail-title"]').should('have.value', 'new name');
    cy.get('[data-cy="notification-message"]')
      .should('exist')
      .and('contain.text', 'Card was renamed');
    cy.tick(4000);
    cy.get('[data-cy="notification-message"]').should('not.exist');
  });

  it('deletes a card', () => {
    cy.intercept('DELETE', '/api/cards/*').as('deleteCard');
    cy.clock();
    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=${Cypress.env('cards')[0].id}`);
    cy.get('[data-cy="card-detail-delete"]').click();
    cy.wait('@deleteCard')
      .its('response.statusCode')
      .should('eq', 200);
    cy.get('[data-cy="card-detail"]').should('not.exist');
    cy.get('[data-cy="notification-message"]')
      .should('exist')
      .and('contain.text', 'Card was deleted');
    cy.tick(4000);
    cy.get('[data-cy="notification-message"]').should('not.exist');
  });

  it('opens and closes a card', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.get('[data-cy=card]').click();
    cy.get('[data-cy="card-detail"]').should('be.visible');
    cy.get('[data-cy="card-detail-backdrop"]').click('topRight');
    cy.get('[data-cy="card-detail"]').should('not.exist');
  });
});
