Cypress.Commands.add('loginApi', ({ email, password, token }) => {

  cy
    .request({ 
      body: {
        email, password
      }, 
      headers: {
        authorization: `Bearer ${token}`
      }, 
      method: 'POST',
      url: '/api/login'
    }).then(({ body }) => {
        cy.setCookie('trello_token', body.accessToken)
      });

});