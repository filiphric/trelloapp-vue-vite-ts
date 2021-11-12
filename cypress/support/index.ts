/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Creates a new board via API.
     * 
     * @param obj: object with headers and body properties
     */  
    createBoardApi(obj: object): Chainable

    /**
     * Retrieves all boards via API.
     * 
     * @param headers: object with headers property
     */  
    getBoards(headers: object): Chainable

    /**
     * Retrieves (via API) a particular board based on board id.
     * 
     * @param obj: object with headers and boardId properties
     */  
    getBoard(obj: object): Chainable

    /**
     * Deletes a particular board via API.
     * 
     * @param obj: object with headers and boardId properties
     */  
    deleteBoardApi(obj: object): Chainable

    /**
     * Log in user via API.
     * 
     * @param obj: object with email and password properties
     */  
    logInApi(obj: object): Chainable

    /**
     * Updates a particular board via API.
     * 
     * @param obj: object with headers, boardId, and body properties
     */  
    updateBoardApi(obj: object): Chainable

    /**
     * Returns a board id form URL. Can be chained off of another command.
     * @example
     *     cy
     *       .url()
     *       .should('match', /board\/[0-9]+/)
     *       .getBoardIdFromUrl()
     *       .then(url => ... );
     * 
     *     cy
     *       .getBoardIdFromUrl()
     *       .then(url => ... );
     */  
    getBoardIdFromUrl(): Chainable

    /**
     * Adds a new board from empty home page.
     * 
     * @param boardName: new board name
     */  
    addFirstBoard(boardName: string): Chainable

    /**
     * Creates a new list under a particular board via API.
     * 
     * @param obj: objects with headers and body properties
     */  
    createListApi(obj: object): Chainable

    /**
     * Creates a new card via API.
     * 
     * @param obj: objects with headers and body properties
     */  
    createCardApi(obj: object): Chainable

    /**
     * Fills in signup form.
     * 
     * @param obj: objects with email and password properties
     */  
    fillInSignupForm(obj: object): Chainable

    /**
     * Fills in login form.
     * 
     * @param obj: objects with email and password properties
     */  
    fillInLoginForm(obj: object): Chainable
    
    /**
     * Gets all users via API.
     */  
    getUsersApi(): Chainable

    /**
     * Creates a new user via API.
     * 
     * @param obj: objects with email and password properties
     */  
    createUserApi(obj: object): Chainable

    /**
     * Creates a new user via API.
     * 
     * @param obj: body to be sent to the endpoint
     */  
    signUpUserApi(body: object): Chainable
  }
}
