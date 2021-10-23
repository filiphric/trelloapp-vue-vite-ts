Cypress.Commands.add('loginApi', ({ email, password, token }) => {

  cy
    .request({ 
      method: 'POST', 
      url: '/api/login', 
      headers: {
        authorization: `Bearer ${token}`
      },
      body: {
        email, password
      }
    }).then(({ body }) => {
        cy.setCookie('trello_token', body.accessToken)
      });

});