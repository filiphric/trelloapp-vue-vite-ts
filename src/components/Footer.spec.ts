import { mount } from '@cypress/vue';
import Footer from '@/components/Footer.vue';


it('shows footer', () => {
  mount(Footer);

  cy.getDataCy('footer-link').should('be.visible').and('contain.text', '❤️');
});
