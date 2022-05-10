import { mount } from '@cypress/vue';
import SaveButton from '@/components/SaveButton.vue';

it('renders a message', () => {
  const buttontext = 'Add list';

  mount(SaveButton, {
    props: {
      buttontext,
    },
  });

  cy.get('button').should('have.text', buttontext);
});
