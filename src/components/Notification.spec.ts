import Notification from '@/components/Notification.vue';
import { useStore } from '@/store/store';
import { createPinia } from 'pinia';

const pinia = createPinia();
const store = useStore(pinia);
const { showNotification } = useStore();

it('renders a info message', () => {
  const message = 'This is an info message';

  cy.mount(Notification);

  showNotification(message, false);

  cy.getDataCy('notification-message').should('be.visible').should('contain', message);

  cy.getDataCy('info-icon').should('be.visible');
});

it('renders a error message', () => {
  const message = 'This is an error message';

  cy.mount(Notification, { store });

  showNotification(message, true);

  cy.getDataCy('notification-message').should('be.visible').should('contain', message);

  cy.getDataCy('error-icon').should('be.visible');
});
