import Navbar from '@/components/Navbar.vue';

beforeEach(() => {
  cy.mount(Navbar);
});

it('shows a navbar on home page', () => {
  // cy.wrap(Cypress.router.push('/'))
  // cy.location('pathname').should('eq', '/');
  cy.getDataCy('home').should('not.be.visible');
});

it('shows a navbar on board detail', () => {
  // cy.wrap(Cypress.router.push('/board/1'));
  // cy.location('pathname').should('eq', '/board/1');
  cy.getDataCy('home').should('be.visible');
});
