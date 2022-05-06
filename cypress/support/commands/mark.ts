declare namespace Cypress {
  interface Chainable<Subject = any> {
      /**
       * Add a measurment marker. Used with cy.measure() command
       * @example cy.mark('modalWindow')
       */
       mark: typeof mark
  }
}

const mark = (markName: string): Cypress.Chainable<any> => {

  const logFalse = { log: false }

  Cypress.log({
    name: 'mark',
    message: markName,
    consoleProps() {
      return {
        command: 'mark',
        'mark name': markName
      }
    }
  })

  return cy.window(logFalse)
    .its('performance', logFalse)
    .invoke(logFalse, 'mark', markName)
}

Cypress.Commands.addAll({ mark })