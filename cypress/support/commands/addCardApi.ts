Cypress.Commands.add('addCardApi', ({ title, boardIndex = 0, listIndex = 0 }) => {

  cy
    .request('POST', '/api/cards', {
      title,
      boardId: Cypress.env('boards')[boardIndex].id,
      listId: Cypress.env('lists')[listIndex].id
    })
    .then(({ body }) => {

      Cypress.env('cards').push(body);

    });

});