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
 * @param boardIndex index number from this.boards
 * @param listIndex index number from this.lists
 * @example
 * cy.addCardApi({ name: 'new card', boardIndex: 0, listIndex: 0 })
 */
export const addCardApi = function(this: any, { name, boardAlias = 'board', listAlias = 'list', cardAlias = 'card' }: { name: string, boardAlias?: string, listAlias?: string, cardAlias?: string  }): Cypress.Chainable<any> {

  return cy
    .request('POST', '/api/cards', {
      boardId: this[boardAlias].id,
      listId: this[listAlias].id,
      name,
      order: 0
    })
    .its('body', { log: false }).as(cardAlias);

}