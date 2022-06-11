import '@4tw/cypress-drag-drop';
import '@cypress/code-coverage/support';
import 'cypress-real-events/support';

import './common'

import { addBoardApi } from '@commands/addBoardApi'
import { addCardApi } from '@commands/addCardApi'
import { addListApi } from '@commands/addListApi'
import { googleLogin } from '@commands/googleLogin'
import { googleSignup } from '@commands/googleSignup'
import { signupApi } from '@commands/signupApi'
import { step } from '@commands/step'

Cypress.Commands.add('addBoardApi', addBoardApi);
Cypress.Commands.add('addCardApi', addCardApi);
Cypress.Commands.add('addListApi', addListApi);
Cypress.Commands.add('googleLogin', googleLogin);
Cypress.Commands.add('googleSignup', googleSignup);
Cypress.Commands.add('signupApi', signupApi);
Cypress.Commands.add('step', step);

declare global {
  interface Window {
    logCalls: number;
    testFlow: string[];
  }
}

beforeEach(function () {
  window.logCalls = 1;
  window.testFlow = [];
});

Cypress.on('fail', (err) => {
  if (window.testFlow.length) {
    err.message += `${'\n\n' + 'Test steps were:\n\n'}${window.testFlow.join('\n')}`;
  }
  throw err;
});

