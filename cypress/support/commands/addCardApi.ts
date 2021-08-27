Cypress.Commands.add('addCardApi', ({ name, boardIndex = 0, listIndex = 0 }) => {

  cy
    .request('POST', '/api/cards', {
      name,
      boardId: Cypress.env('boards')[boardIndex].id,
      listId: Cypress.env('lists')[listIndex].id,
      order: 0
    })
    .then(({ body }) => {

      Cypress.env('cards').push(body);

    });

});