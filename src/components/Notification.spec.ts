import { mount } from '@cypress/vue';
import Notification from '@/components/Notification.vue';

import { setActivePinia, createPinia } from 'pinia';
import { store } from '@/stores/store';

const { showNotification } = store();

beforeEach(() => {
  setActivePinia(createPinia());
});

it('renders a info message', () => {
  const message = 'This is an info message';

  showNotification(message, false);

  mount(Notification);

  cy.getDataCy('notification-message').should('be.visible').should('contain', message);

  cy.getDataCy('info-icon').should('be.visible');
});

it('renders a error message', () => {
  const message = 'This is an error message';

  showNotification(message, true);

  mount(Notification);

  cy.getDataCy('notification-message').should('be.visible').should('contain', message);

  cy.getDataCy('error-icon').should('be.visible');
});
