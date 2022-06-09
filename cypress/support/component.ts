import { mount } from 'cypress/vue'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '@/router/routes';
import { useStore } from '@/store/store';
import VueClickAway from 'vue3-click-away';
import './common'
import '@/index.css';

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1]

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: any,
        options?: OptionsParam & { store?: any }
      ): Chainable<any>
    }
  }
}

// solution #1 👇 - does not throw error, but doesn’t show component
Cypress.Commands.add('mount', (component, options = {}) => {

  let pinia = createPinia()
  let router = createRouter({
    routes,
    history: createMemoryHistory()
  })

  // define default route
  router.push('/')

  let store = options.store || useStore(pinia)
  
  options = {
    global: {
      plugins: [store, router, VueClickAway]
    },
    ...options
  }
  
  return mount(component, options)
})

