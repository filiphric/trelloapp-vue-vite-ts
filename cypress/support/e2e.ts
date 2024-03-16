import './commands'
import '@4tw/cypress-drag-drop'
import '@cypress/grep'

before(() => {
//  cy.log('clearing the database')
//  cy.request('POST', '/api/reset')
//
//  cy.log('Seeding the database')
//    cy.request('POST', '/api/reset')
//    cy.fixture('users').then((fixture) => {
//        cy.request('POST', '/api/signup', fixture[0]).then(function (response) {
//            const auth = response.body.accessToken;
//            cy.seedData('boards', undefined, auth);
//            cy.seedData('lists');
//            cy.seedData('cards');
//        });
//    });
//  cy.log('Starting E2E tests')
});

beforeEach(() => {
  // clear the database
  cy.request('POST', '/api/reset')
  cy.visit('')



//  cy.log('Setting up the test')
//    cy.request('POST', '/api/reset')
//    cy.fixture('users').then((fixture) => {
//        cy.request('POST', '/api/signup', fixture[0]).then(function (response) {
//            const auth = response.body.accessToken;
//            cy.seedData('boards', 0, auth);
//            cy.seedData('lists');
//            cy.seedData('cards');
//        });
//    });
})

