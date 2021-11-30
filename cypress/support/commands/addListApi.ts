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
 * @param boardIndex index number from this.boards
 * @example
 * cy.addListApi({ name: 'new card', boardIndex: 0 })
 */
export const addListApi = function(this: any, { name, boardAlias = 'board', listAlias = 'list' }: { name: string, boardAlias?: string, listAlias?: string}): Cypress.Chainable<any> {

  return cy.request('POST', '/api/lists', {
      boardId: this[boardAlias].id,
      name,
    }).its('body', { log: false }).as(listAlias);
  
}