import '@4tw/cypress-drag-drop';
import '@cypress/code-coverage/support';
import 'cypress-file-upload';
import 'cypress-real-events/support';

import { addBoardApi } from '@commands/addBoardApi'
import { addListApi } from '@commands/addListApi'
import { addCardApi } from '@commands/addCardApi'
import { getDataCy } from '@commands/getDataCy'
import { signupApi } from '@commands/signupApi'
import { step } from '@commands/step'

Cypress.Commands.add('addBoardApi', addBoardApi);
Cypress.Commands.add('addListApi', addListApi);
Cypress.Commands.add('addCardApi', addCardApi);
Cypress.Commands.add('getDataCy', getDataCy);
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
  err.message += `${'\n\n' + 'Test steps were:\n\n'}${window.testFlow.join('\n')}`;
  throw err;
});
