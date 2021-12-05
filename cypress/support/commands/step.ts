export {}
declare global {
  namespace Cypress {
    interface Chainable {
      step: typeof step;
    }
  }
}

/**
 * Creates a test step
 */
export const step = (msg: string, options?: { section: boolean }) => {

  let logMessage = `${window.logCalls}. ${msg}`;

  if (options?.section) {
    window.logCalls = 0;
    logMessage = `\n--- ${msg} ---\n`;
  }

  Cypress.log({
    displayName: logMessage.toUpperCase(),
    message: '\n',
  });

  window.testFlow.push(logMessage);
  window.logCalls++;
};
