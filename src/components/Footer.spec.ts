import Footer from '@/components/Footer.vue';

it('shows footer', () => {
  cy.mount(Footer);

  cy.getDataCy('footer-link').should('be.visible').and('contain.text', '❤️');
});
