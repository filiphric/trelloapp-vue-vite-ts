// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createBoardApi', ({ headers, body }) => {
  cy
    .request({
      method: 'POST',
      url   : '/api/boards',
      headers,
      body,
    });
});

Cypress.Commands.add('getBoards', ({ headers }) => {
  cy
    .request({
      method : 'GET',
      url    : '/api/boards',
      headers: {...{ Accept: 'application/json' }, ...headers},
    });
});

Cypress.Commands.add('getBoard', ({ headers, boardId }) => {
  cy
    .request({
      method : 'GET',
      url    : `/api/boards/${boardId}`,
      headers: {...{ Accept: 'application/json' }, ...headers},
    });
});

Cypress.Commands.add('deleteBoardApi', ({ headers, boardId }) => {
  cy
    .request({
      method : 'DELETE',
      url    : `/api/boards/${boardId}`,
      headers,
    });
});

Cypress.Commands.add('logInApi', ({ email, password }) => {
  // users are cached, so GET request is necessary to refresh the cache
  // if this request is not performed, login won't be successful even when the user exists in the DB
  cy
    .getUsersApi();

  cy
    .request({
      method: 'POST',
      url   : '/api/login',
      body  : {
        email,
        password,
      },
      failOnStatusCode: false,
    });
});

Cypress.Commands.add('updateBoardApi', ({ headers, boardId, body }) => {
  cy
    .request({
      method : 'PATCH',
      url    : `/api/boards/${boardId}`,
      headers,
      body
    });
});

Cypress.Commands.add('getBoardIdFromUrl', { prevSubject: 'optional' }, prevSubject => {
  const returnLastPortion = url => {
    const boardId = url.split('/');
    return boardId[boardId.length - 1];
  };

  if (prevSubject) {
    cy
      .wrap(prevSubject)
      .then(url => returnLastPortion(url));
  } else {
    return cy
      .url()
      .then(url => returnLastPortion(url));
  }
});

Cypress.Commands.add('addFirstBoard', boardName => {
  cy
    .get('[data-cy=first-board')
    .type(`${boardName}{Enter}`);
});

Cypress.Commands.add('createListApi', ({ headers, body }) => {
  cy
    .request({
      method : 'POST',
      url    : '/api/lists',
      headers,
      body,
    });
});

Cypress.Commands.add('createCardApi', ({ headers, body }) => {
  cy
    .request({
      method : 'POST',
      url    : '/api/cards',
      headers,
      body,
    });
});

Cypress.Commands.add('fillInSignupForm', ({ email, password }) => {
  cy
    .get('[data-cy=signup-email]')
    .type(email);

  cy
    .get('[data-cy=signup-password]')
    .type(password);
});

Cypress.Commands.add('fillInLoginForm', ({ email, password }) => {
  cy
    .get('[data-cy=login-email]')
    .type(email);

  cy
    .get('[data-cy=login-password]')
    .type(password);
});

Cypress.Commands.add('getUsersApi', () => {
  cy
    .request({
      method          : 'GET',
      url             : '/api/users',
      headers         : { Accept: 'application/json' },
      failOnStatusCode: false,
    });
});

Cypress.Commands.add('createUserApi', ({ email, password }) => {
  // users are cached, so GET request is necessary to refresh the cache
  // if this request is not performed, login won't be successful even when the user exists in the DB
  cy
    .getUsersApi();
  
  cy
    .request({
      method: 'POST',
      url   : '/api/users',
      body  : {
        email,
        password,
      },
    });
});

Cypress.Commands.add('signUpUserApi', (body) => {
  // users are cached, so GET request is necessary to refresh the cache
  // if this request is not performed, login won't be successful even when the user exists in the DB
  cy
    .getUsersApi();
  
  cy
    .request({
      method: 'POST',
      url   : '/api/signup',
      body,
      failOnStatusCode: false,
    });
});
