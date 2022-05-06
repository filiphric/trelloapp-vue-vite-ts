declare namespace Cypress {
  interface Chainable<Subject = any> {
      /**
       * Add a measurment marker. Used with cy.measure() command
       * @example cy.measure('modalWindow')
       */
       measure: typeof measure
  }
}

const measure = (markName: string): Cypress.Chainable<number> => {

  const logFalse = { log: false }

  let measuredDuration: number
  let log = Cypress.log({
    name: 'measure',
    message: markName,
    autoEnd: false,
    consoleProps() {
      return {
        command: 'measure',
        'mark name': markName,
        yielded: measuredDuration
      }
    }
  })

  return cy.window(logFalse)
    .its('performance', logFalse)
    .invoke(logFalse, 'measure', markName)
    .then( ({ duration }) => {
      measuredDuration = duration
      log.end()
      return duration
    })
}

Cypress.Commands.addAll({ measure })