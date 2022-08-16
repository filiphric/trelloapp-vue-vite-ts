import Loading from '@/components/Loading.vue'
import { createPinia, storeToRefs } from 'pinia'
import { useStore } from '@/store/store'

const pinia = createPinia()
const store = useStore(pinia)
const { connectionError } = storeToRefs(useStore())

it('shows loading animation', () => {

  connectionError.value = true

  cy.mount(Loading, { store })

  cy.contains('This is taking too long.')
    .should('be.visible')

})