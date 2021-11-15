import '../support/commands/addBoardApi';
import '../support/commands/addCardApi';
import '../support/commands/addListApi';

describe('creating a card', () => {
  beforeEach(() => {
    cy.request('POST', '/api/reset');
    cy.addBoardApi('new board');
  });
  it('creates a card', () => {
    cy.intercept('POST', '/api/cards').as('createCard');
    cy.addListApi({ name: 'new list' });
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('new-card').click();
    cy.getDataCy('new-card-input').type('new card{enter}');
    cy.wait('@createCard')
      .its('request.body.name')
      .should('eq', 'new card');
    cy.getDataCy('card').should('be.visible');
  });

  it('shows error when card is not created', () => {
    cy.intercept('POST', '/api/cards', { forceNetworkError: true }).as('createCard');
    cy.addListApi({ name: 'new list' });
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('new-card').click();
    cy.getDataCy('new-card-input').type('new card{enter}');
    cy.getDataCy('notification-message').should('be.visible').and('contain.text', 'Card was not created')
  });

  it('creates a card through dropdown', () => {
    cy.intercept('POST', '/api/cards').as('createCard');
    cy.addListApi({ name: 'new list' });
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('list-options').click();
    cy.getDataCy('card-add').click();
    cy.getDataCy('new-card-input')
      .should('be.visible')
      .should('be.focused');
    cy.getDataCy('new-card-input').type('new card{enter}');
    cy.wait('@createCard')
      .its('request.body.name')
      .should('eq', 'new card');
    cy.getDataCy('card').should('be.visible');
  });

  it('cancels creating a card', () => {
    cy.addListApi({ name: 'new list' });
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    // esc key
    cy.getDataCy('new-card').click();
    cy.getDataCy('new-card-input').type('new card{esc}');
    cy.getDataCy('new-card-input').should('not.exist');
    cy.getDataCy('card').should('not.exist');
    // click away
    cy.getDataCy('new-card').click();
    cy.getDataCy('board-detail').click();
    cy.getDataCy('new-card-input').should('not.exist');
    cy.getDataCy('card').should('not.exist');
    // enter no input
    cy.getDataCy('new-card').click();
    cy.getDataCy('new-card-input').type('{enter}');
    cy.getDataCy('card').should('not.exist');
    // cancel button
    cy.getDataCy('cancel').click();
    cy.getDataCy('new-card-input').should('not.exist');
    cy.getDataCy('card').should('not.exist');
  });

  it('shows edit card icon', () => {
    cy.addListApi({ name: 'new list' }).addCardApi({ name: 'new card' });
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('card').realHover();
    cy.getDataCy('card-edit').should('be.visible');
  });

  it('complete card', () => {
    cy.intercept('PATCH', '/api/cards/*').as('patchCard');
    cy.addListApi({ name: 'new list' }).addCardApi({ name: 'new card' });
    cy.visit(`/board/${Cypress.env('boards')[0].id}`);
    cy.getDataCy('card-checkbox').check();
    cy.wait('@patchCard')
      .its('request.body.completed')
      .should('be.true');
    cy.getDataCy('card-checkbox').uncheck();
    cy.wait('@patchCard')
      .its('request.body.completed')
      .should('be.false');
  });

  it('moves a card between lists', () => {
    cy.addListApi({name: 'list 1'})
    cy.addListApi({name: 'list 2'})
    cy.addCardApi({name: 'card 1'})

    cy.visit(`/board/${Cypress.env('boards')[0].id}`);

    cy.getDataCy('card-list').eq(0).as('list1')
    cy.getDataCy('card-list').eq(1).as('list2')
    cy.getDataCy('card').drag('@list2')
  })
});
