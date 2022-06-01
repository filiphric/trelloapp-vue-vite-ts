
import Notification from '@/components/Notification.vue';

// import { store } from '@/stores/store';

// const { showNotification } = store();

it('renders a info message', () => {
  const message = 'This is an info message';

  // showNotification(message, false);

  cy.mount(Notification);

  cy.getDataCy('notification-message').should('be.visible').should('contain', message);

  cy.getDataCy('info-icon').should('be.visible');
});

it('renders a error message', () => {
  const message = 'This is an error message';

  // showNotification(message, true);

  cy.mount(Notification);

  cy.getDataCy('notification-message').should('be.visible').should('contain', message);

  cy.getDataCy('error-icon').should('be.visible');
});
