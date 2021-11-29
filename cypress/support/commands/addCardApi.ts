export {}
declare global {
  namespace Cypress {
    interface Chainable {
      addCardApi: typeof addCardApi;
    }
  }
}

/**
 * Creates a new card using the API. By default, the card is added to the first list of the first board.
 * @param name name of the card
 * @param boardIndex index number from Cypress.env('boards')
 * @param listIndex index number from Cypress.env('lists')
 * @example
 * cy.addCardApi({ name: 'new card', boardIndex: 0, listIndex: 0 })
 */
export const addCardApi = ({ name, boardIndex = 0, listIndex = 0 }: { name: string, boardIndex?: number, listIndex?: number  }): Cypress.Chainable<any> => {

  return cy
    .request('POST', '/api/cards', {
      boardId: Cypress.env('boards')[boardIndex].id,
      listId: Cypress.env('lists')[listIndex].id,
      name,
      order: 0
    })
    .then(({ body }) => {

      Cypress.env('cards').push(body);

    });

}