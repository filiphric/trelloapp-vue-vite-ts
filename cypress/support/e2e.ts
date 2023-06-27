import '@4tw/cypress-drag-drop';
import '@cypress/code-coverage/support';
import 'cypress-real-events/support';
import 'cypress-plugin-steps';
require('@replayio/cypress/support');

import './common'

import { addBoardApi } from '@commands/addBoardApi'
import { addCardApi } from '@commands/addCardApi'
import { addListApi } from '@commands/addListApi'
import { googleLogin } from '@commands/googleLogin'
import { googleSignup } from '@commands/googleSignup'
import { signupApi } from '@commands/signupApi'

Cypress.Commands.add('addBoardApi', addBoardApi);
Cypress.Commands.add('addCardApi', addCardApi);
Cypress.Commands.add('addListApi', addListApi);
Cypress.Commands.add('googleLogin', googleLogin);
Cypress.Commands.add('googleSignup', googleSignup);
Cypress.Commands.add('signupApi', signupApi);


Cypress.on('uncaught:exception', () => {
  return
})