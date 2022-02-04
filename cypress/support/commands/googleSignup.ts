export {}
declare global {
  namespace Cypress {
    interface Chainable {
      googleSignup: typeof googleSignup;
    }
  }
}

/**
 * Performs a Google SSO login
 * @example
 * cy.googleSignup()
 *
 */

export const googleSignup = function(this: any): Cypress.Chainable<any> {

return cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
  }).then(({ body }) => {
    const { id_token } = body
      cy.request('POST', '/api/signup', { jwt: id_token })
        .then( ({ body: { accessToken } }) => {
          cy.setCookie('trello_token', accessToken)
        })
  })
}