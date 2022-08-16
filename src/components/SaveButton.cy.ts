import SaveButton from './SaveButton.vue'

it('SaveButton component', () => {

  const buttontext = 'Hello world'

  cy.mount(SaveButton, {
    props: {
      buttontext
    }
  })

  cy.get('button').should('have.text', buttontext)

})