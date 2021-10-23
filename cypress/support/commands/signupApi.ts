Cypress.Commands.add('signupApi', ({ email, password, login = true }) => {

  cy
    .request('POST', '/api/signup', {
      email, password
    }).then(({ body }) => {
      if (login) cy.setCookie('trello_token', body.accessToken)
      Cypress.env('users').push(body);
    });

});