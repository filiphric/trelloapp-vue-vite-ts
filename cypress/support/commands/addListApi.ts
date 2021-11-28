export {}
declare global {
  namespace Cypress {
    interface Chainable {
      addListApi: typeof addListApi;
    }
  }
}

/**
 * Creates a new list using the API. By default, the card is added to the first board.
 * @param name name of the card
 * @param boardIndex index number from Cypress.env('boards')
 * @example
 * cy.addListApi({ name: 'new card', boardIndex: 0 })
 */
export const addListApi = ({ name, boardIndex = 0 }: { name: string, boardIndex?: number}): Cypress.Chainable<any> => {

  return cy
    .request('POST', '/api/lists', {
      boardId: Cypress.env('boards')[boardIndex].id,
      name,
    }).then(({ body }) => {
      Cypress.env('lists').push(body);
    });

}