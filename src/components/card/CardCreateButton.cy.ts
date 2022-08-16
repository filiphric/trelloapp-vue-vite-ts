import CardCreateButton from '@/components/card/CardCreateButton.vue'

it('Toggles input visibility with create card button', () => {

  cy.mount(CardCreateButton, {
    props: {
      onToggleInput: cy.spy().as('toggleInputSpy')
    }
  })

  cy.get('[data-cy="new-card"]').click()

  cy.get('@toggleInputSpy')
    .should('have.been.called')
    .and('have.been.calledWith', true)

});