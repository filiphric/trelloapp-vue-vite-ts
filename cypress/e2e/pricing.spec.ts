it('shows pricing', () => {

  cy.intercept({
    method: 'GET', 
    url: '/api/location',
    times: 1
  }, {
    location: 'us',
    currency: 'USD',
    discountEligible: false
  }).as('locationUS')

  cy.visit('/pricing')
  cy.wait('@locationUS')

  cy.getDataCy('plan-item').eq(1).should('have.class', 'border-blue6')
  cy.getDataCy('plan-item').eq(0).click().should('have.class', 'border-blue6')
  cy.getDataCy('plan-item').eq(1).should('not.have.class', 'border-blue6')

  // USD
  cy.getDataCy('plan-price').should('contain', '$')

  // GBP
  cy.intercept({
    method: 'GET', 
    url: '/api/location',
    times: 1
  }, {
    location: 'uk',
    currency: 'GBP',
    discountEligible: false
  }).as('locationUK')

  
  cy.reload()
  cy.wait('@locationUK')

  cy.getDataCy('plan-price').should('contain', '£')

  // EUR
  cy.intercept({
    method: 'GET', 
    url: '/api/location',
    times: 1
  }, {
    location: 'sk',
    currency: 'EUR',
    discountEligible: true,
    discountAmount: 20
  }).as('locationEU')

  
  cy.reload()
  cy.wait('@locationEU')

  cy.getDataCy('plan-price').should('contain', '€')
  cy.getDataCy('discount').should('be.visible').and('contain', '20%')

});

it('shows map', () => {

  cy.visit('/pricing', {
    onBeforeLoad (win) {
      // e.g., force Barcelona geolocation
      const latitude = 41.38879;
      const longitude = 2.15899;
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
        return cb({ coords: { latitude, longitude } });
      });
    }
  })

  cy.getDataCy('find-location')
    .click()

  cy.get('#map')
    .should('be.visible')

})