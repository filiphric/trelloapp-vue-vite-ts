import '@4tw/cypress-drag-drop';
import '@cypress/code-coverage/support';
import 'cypress-file-upload';
import 'cypress-real-events/support';

import { addBoardApi } from '@commands/addBoardApi'
import { addListApi } from '@commands/addListApi'
import { addCardApi } from '@commands/addCardApi'
import { getDataCy } from '@commands/getDataCy'
import { signupApi } from '@commands/signupApi'

Cypress.Commands.add('addBoardApi', addBoardApi);
Cypress.Commands.add('addListApi', addListApi);
Cypress.Commands.add('addCardApi', addCardApi);
Cypress.Commands.add('getDataCy', getDataCy);
Cypress.Commands.add('signupApi', signupApi);

beforeEach(() => {

  Cypress.env('boards', []);
  Cypress.env('lists', []);
  Cypress.env('cards', []);
  Cypress.env('users', []);

});
