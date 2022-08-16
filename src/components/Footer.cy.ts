import Footer from './Footer.vue'

it('display footer', () => {

  cy.mount(Footer)

  cy.get('[data-cy=footer-link]')
    .invoke('prop', 'href')
    .then(cy.request)
    .its('status')
    .should('eq', 200)

})
