
import Navbar from '@/components/Navbar.vue';

import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

beforeEach(() => {
  cy.mount(Navbar, {
    global: {
      plugins: [router],
    },
  });
});

it('shows a navbar on home page', () => {
  cy.wrap(router.push('/'))
  cy.location('pathname').should('eq', '/');
  cy.getDataCy('home').should('not.be.visible');
});

it('shows a navbar on board detail', () => {
  cy.wrap(router.push('/board/1'));
  cy.location('pathname').should('eq', '/board/1');
  cy.getDataCy('home').should('be.visible');
});
