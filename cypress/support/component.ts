import { mount } from 'cypress/vue'
import VueClickAway from 'vue3-click-away';
import '@/index.css';
import { createPinia } from 'pinia'
import { useStore } from '@/store/store'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { App } from 'vue';

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: any,
        options?: Record<string, any>
      ): Chainable<any>
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {

  const router = createRouter({
    routes,
    history: createMemoryHistory()
  })

  const installRouterPlugin = (app: App) => {
    app.use(router)
  }

  options = {
    global: {
      plugins: [installRouterPlugin, VueClickAway]
    },
    ...options
  }

  options.path && cy.wrap(router.push(options.path))

  const pinia = createPinia()
  options.store || useStore(pinia)

  return mount(component, options)

})