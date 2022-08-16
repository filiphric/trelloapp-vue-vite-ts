import Dropdown from '@/components/common/Dropdown.vue';
import DropdownItem from '@/components/common/DropdownItem.vue'
import { h } from 'vue'

const dropdownActionItem = () => h(DropdownItem, { itemText: 'Add a new list' })
const dropdownWarningItem = () => h(DropdownItem, { itemText: 'Delete list', warning: true })

it('shows dropdown', () => {
  cy.mount(Dropdown, {
    props: {
      header: 'Dropdown items'
    },
    slots: {
      default: [dropdownActionItem, dropdownWarningItem]
    }
  });

  cy.contains('Add a new list')
    .should('be.visible')

  cy.contains('Delete list')
    .should('be.visible')
    .and('have.class', 'warning')

  cy.get('[data-cy=dropdown-item]')
    .should('have.length', 2)

});