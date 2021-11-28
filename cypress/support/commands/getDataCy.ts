import { Selectors } from '../@types/selectors';

declare global {
  namespace Cypress {
    interface Chainable {
      getDataCy: typeof getDataCy
    }
  }
}

/**
 * Gets element using data-cy selector
 * @param input data-cy attribute value
 * @example
 * // this command
 * cy.getDataCy('header')
 * // will select this element
 * <div data-cy="header">
 * </div>
 *
 */
export const getDataCy = function(
  input: Selectors
) {
  
  Cypress.log({
    consoleProps() {
      return {
        selector: input,
      };
    },
    displayName: 'getDataCy',
    name: 'Get by [data-cy] attribute',
  });
  
  return cy.get(`[data-cy='${input}']`);
  
};