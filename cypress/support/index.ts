import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';
import 'cypress-real-events/support';
import '@cypress/code-coverage/support';
require('cypress-watch-and-reload/support')

beforeEach(() => {

  Cypress.env('boards', []);
  Cypress.env('lists', []);
  Cypress.env('cards', []);
  Cypress.env('users', []);

});