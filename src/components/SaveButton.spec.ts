import SaveButton from '@/components/SaveButton.vue';

it('renders a message', () => {
  const buttontext = 'Add list';

  cy.mount(SaveButton, {
    props: {
      buttontext,
    },
  });

  cy.get('button').should('have.text', buttontext);
});
