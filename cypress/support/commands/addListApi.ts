Cypress.Commands.add('addListApi', ({ name, boardIndex = 0 }) => {

  cy
    .request('POST', '/api/lists', {
      boardId: Cypress.env('boards')[boardIndex].id,
      name,
    }).then(({ body }) => {
      Cypress.env('lists').push(body);
    });

});