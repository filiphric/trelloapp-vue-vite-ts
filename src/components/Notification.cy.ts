import Notification from '@/components/Notification.vue'
import { useStore } from '@/store/store'
import { createPinia, storeToRefs } from 'pinia'

const pinia = createPinia()
const store = useStore(pinia)
const { showNotification } = useStore(pinia)
const { notification } = storeToRefs(useStore())

it('renders an info message', () => {

  const message = 'This is an info message'

  cy.mount(Notification, { store })

  showNotification(message, false)

  cy.get('[data-cy="notification-message"]').should('be.visible').should('contain', message)

  cy.get('[data-cy="info-icon"]').should('be.visible')

  cy.get('[data-cy="notification-message"]').should('not.exist')

})

it('renders an error message', () => {

  const message = 'This is an error message'

  notification.value = {
    show: true,
    error: true,
    message
  }

  cy.mount(Notification, { store })

  cy.get('[data-cy="notification-message"]').should('be.visible').should('contain', message)

  cy.get('[data-cy="error-icon"]').should('be.visible')

})