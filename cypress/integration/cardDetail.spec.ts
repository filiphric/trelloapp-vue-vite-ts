import '../support/commands/addBoardApi';
import '../support/commands/addCardApi';
import '../support/commands/addListApi';

describe('card detail', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');
    cy.addBoardApi('new board')
      .addListApi({ name: 'new list' })
      .addCardApi({ name: 'new card' });
  });

  it('uploads a file', () => {
    cy.intercept('POST', '/api/upload').as('imageUpload');
    cy.intercept('PATCH', '/api/cards/*').as('updateCard');
    cy.clock();
    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=${Cypress.env('cards')[0].id}`);
    cy.getDataCy('upload-image').attachFile('cypressLogo.png', { subjectType: 'drag-n-drop' });
    cy.wait('@imageUpload')
      .its('response.body')
      .should('have.property', 'path')
      .and('not.be.empty');
    cy.wait('@updateCard')
      .its('response.body.image')
      .should('not.be.empty');
    cy.getDataCy('image-attachment').should('exist');
    cy.getDataCy('notification-message')
      .should('exist')
      .and('contain.text', 'File was sucessfully uploaded');
    cy.tick(4000);
    cy.getDataCy('notification-message').should('not.exist');
    cy.getDataCy('image-delete').click();
    cy.wait('@updateCard')
      .its('response.body.image')
      .should('be.null');
    cy.getDataCy('image-attachment').should('not.exist');
    cy.getDataCy('upload-image').should('be.visible');
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
    cy.getDataCy('upload-image').attachFile('cypressLogo.png', { subjectType: 'drag-n-drop' });
    cy.getDataCy('notification-message')
      .should('exist')
      .and('contain.text', 'There was an error uploading file');
    cy.tick(4000);
    cy.getDataCy('notification-message').should('not.exist');
  });

  it('changes card date', () => {
    cy.intercept('PATCH', '/api/cards/*').as('updateCard');
    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=${Cypress.env('cards')[0].id}`);
    // dropdown
    cy.getDataCy('calendar-dropdown').click();
    cy.getDataCy('card-detail-deadline').should('be.visible');
    // dropdown hides
    cy.getDataCy('calendar-dropdown').click();
    cy.getDataCy('card-detail-deadline').should('not.exist');
    // calendar buton on side
    cy.getDataCy('calendar-button').click();
    cy.getDataCy('card-detail-deadline').should('be.visible');
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
    cy.getDataCy('copy-properties').realClick();
    cy.task('getClipboard').should('eq', JSON.stringify(Cypress.env('cards')[0], null, 2));
    cy.getDataCy('notification-message')
      .should('exist')
      .and('contain.text', 'Card info copied to clipboard');
    cy.tick(4000);
    cy.getDataCy('notification-message').should('not.exist');
  });

  it('renames a card', () => {
    cy.intercept('PATCH', '/api/cards/*').as('updateCard');
    cy.clock();
    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=${Cypress.env('cards')[0].id}`);
    cy.getDataCy('card-detail-title').click();
    cy.getDataCy('card-detail-title').type('new name{enter}');
    cy.wait('@updateCard')
      .its('request.body.name')
      .should('eq', 'new name');
    cy.getDataCy('card-detail-title').should('have.value', 'new name');
    cy.getDataCy('card-detail-title').type('{esc}');
    cy.getDataCy('card-detail-title').should('have.value', 'new name');
    cy.getDataCy('notification-message')
      .should('exist')
      .and('contain.text', 'Card was renamed');
    cy.tick(4000);
    cy.getDataCy('notification-message').should('not.exist');
  });

  it('deletes a card', () => {
    cy.intercept('DELETE', '/api/cards/*').as('deleteCard');
    cy.clock();
    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=${Cypress.env('cards')[0].id}`);
    cy.getDataCy('card-detail-delete').click();
    cy.wait('@deleteCard')
      .its('response.statusCode')
      .should('eq', 200);
    cy.getDataCy('card-detail').should('not.exist');
    cy.getDataCy('notification-message')
      .should('exist')
      .and('contain.text', 'Card was deleted');
    cy.tick(4000);
    cy.getDataCy('notification-message').should('not.exist');
  });

  it('opens and closes a card', () => {
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('card').click();
    cy.getDataCy('card-detail').should('be.visible');
    cy.getDataCy('card-detail-backdrop').click('topRight');
    cy.getDataCy('card-detail').should('not.exist');
  });

  it('shows error message when card is not found', () => {

    cy.visit(`/board/${Cypress.env('boards')[0].id}?card=1`);

    cy.getDataCy('card-detail').should('not.exist');
    cy.getDataCy('notification-message').should('contain.text', 'Card with id: 1 was not found')

    
  });
});
