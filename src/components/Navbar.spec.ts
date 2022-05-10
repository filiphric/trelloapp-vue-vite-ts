import { mount } from '@cypress/vue';
import Navbar from '@/components/Navbar.vue';

import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '../router/routes';

const piniaStore = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const navigate = (path: string) => {
  cy.then(() => {
    router.push(path);
  });
};

beforeEach(() => {
  mount(Navbar, {
    global: {
      plugins: [router, piniaStore],
    },
  });
});

it('shows a navbar on home page', () => {
  navigate('/');
  cy.location('pathname').should('eq', '/');
  cy.getDataCy('home').should('not.be.visible');
});

it('shows a navbar on board detail', () => {
  navigate('/board/1');
  cy.location('pathname').should('eq', '/board/1');
  cy.getDataCy('home').should('be.visible');
});
