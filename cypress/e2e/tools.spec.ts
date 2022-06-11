describe('Tools', () => {

  const body = {
    email: 'filip@example.com', password: 'Asdf.1234#' 
  }

  beforeEach(() => {
    
    cy.request('POST', '/api/reset')
    cy.signupApi(body)
    cy.addBoardApi('new board')
    cy.addListApi({name: 'new list'})
    cy.addCardApi({name: 'new card'})
  
  });

  it('show tools', function() {

    const boardId = this.board.id
    const { accessToken } = this.user

    cy.intercept('DELETE', '/api/boards').as('boards')
    cy.intercept('DELETE', '/api/lists').as('lists')
    cy.intercept('DELETE', '/api/cards').as('cards')
    cy.intercept('DELETE', '/api/users').as('users')

    cy.visit(`/board/${boardId}`)

    cy.getDataCy('card').should('be.visible')
    cy.getDataCy('list').should('be.visible')
  
    cy.get('body').click().realPress('F2')
  
    cy.getDataCy('api-tools')
      .should('be.visible')

    // deletes a user
    cy.contains('Users').click()

    cy.wait('@users')

    cy
      .request({ 
        body, 
        failOnStatusCode: false, 
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        method: 'POST',
        url: '/api/login'
      }).its('body').should('eq', 'Cannot find user')

    // deletes cards
    cy.contains('Cards').click()
    cy.getDataCy('card').should('not.exist')

    cy.wait('@cards')
    
    // deletes lists
    cy.contains('Lists').click()
    cy.getDataCy('list').should('not.exist')

    cy.wait('@lists')

    // deletes boards
    cy.contains('Boards').click()
    cy.location('pathname').should('eq', '/')

    cy.wait('@boards')

    cy.getDataCy('first-board').should('be.visible')
    
  });

  it('resets all', function() {

    const boardId = this.board.id
    const { accessToken } = this.user

    cy.intercept('POST', '/api/reset').as('reset')

    cy.visit(`/board/${boardId}`)
  
    cy.window().invoke('store').invoke('toggleTools', true)
  
    cy.getDataCy('api-tools')
      .should('be.visible')

    // deletes a user
    cy.contains('All').click()

    cy.wait('@reset')

    cy.location('pathname').should('eq', '/')

    cy.getDataCy('first-board').should('be.visible')

    cy
      .request({ 
        body, 
        failOnStatusCode: false, 
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        method: 'POST',
        url: '/api/login'
      }).its('body').should('eq', 'Cannot find user')

  
    cy
      .request({ 
        headers: {
          accept: 'application/json'
        }, 
        method: 'GET', 
        url: '/api/lists'
      }).its('body').should('be.empty')

    cy
      .request({ 
        headers: {
          accept: 'application/json'
        }, 
        method: 'GET', 
        url: '/api/cards'
      }).its('body').should('be.empty')

  })
  
});

