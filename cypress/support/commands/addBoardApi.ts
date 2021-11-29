export {}
declare global {
  namespace Cypress {
    interface Chainable {
      addBoardApi: typeof addBoardApi;
    }
  }
}

/**
 * Creates a new board using the API
 * @param name name of the board
 * @example
 * cy.addBoardApi('new board')
 *
 */

export const addBoardApi = (name: string): Cypress.Chainable<any> => {

  return cy
    .request('POST', '/api/boards', { name })
    .then(({ body }) => {

      Cypress.env('boards').push(body);

    });
    
};