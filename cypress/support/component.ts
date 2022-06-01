import { mount } from 'cypress/vue'
import { getDataCy } from '@commands/getDataCy'
import { createPinia } from 'pinia'
import '@/index.css';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}


Cypress.Commands.add('mount', (component, options = {}) => {
 
  let pinia = createPinia()
  
  // options?.global?.plugins?.push(pinia)
  options?.global?.plugins?.push({
    install(app) {
      app.use(pinia)
    }
  })
  
  return mount(component, options)
})

Cypress.Commands.add('getDataCy', getDataCy);