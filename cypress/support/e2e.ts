import './commands'

before(() => {
  cy.log('clearing the database')
  cy.request('POST', '/api/reset')

  cy.log('Seeding the database')
  cy.fixture('users').then(myFixture => {
    cy.request({
      method: 'POST',
      url: '/api/signup',
      body: myFixture[0],
    })
  });

let auth :string;
cy.request({
      method: 'POST',
      url: '/api/login',
      body: {
        "email": "Existinguser@test.com",
        "password": "Existinguser123"
      },
    }).then(function (response) {
      auth = response.body.accessToken;
    });

  cy.fixture('boards').then(myFixture => {
    for (let i = 0; i < myFixture.length; i++) {
      cy.request({
        method: 'POST',
        url: '/api/boards',
        headers: { authorization: `Bearer ${auth}` },
        body: myFixture[i],
      })
    }
  });

  cy.fixture('lists').then(myFixture => {
    for (let i = 0; i < myFixture.length; i++) {
      cy.request({
        method: 'POST',
        url: '/api/lists',
        headers: { authorization: `Bearer ${auth}` },
        body: myFixture[i],
      })
    }
  });

  cy.fixture('cards').then(myFixture => {
    for (let i = 0; i < myFixture.length; i++) {
      cy.request({
        method: 'POST',
        url: '/api/cards',
        headers: { authorization: `Bearer ${auth}` },
        body: myFixture[i],
      })
    }
  });

  cy.fixture('boards').then(myFixture => {
    cy.request({
      method: 'PATCH',
      url: '/api/boards/4',
      headers: { authorization: `Bearer ${auth}` },
      body: myFixture[3],
    })
  });

  cy.log('Starting E2E tests')
});

beforeEach(() => {
  cy.visit('/')
})

