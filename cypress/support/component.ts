import { mount } from 'cypress/vue'
import { getDataCy } from '@commands/getDataCy'
import { createPinia, Store } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '@/router/routes';
import { useStore } from '@/stores/store';
import VueClickAway from 'vue3-click-away';
import '@/index.css';

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1]

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: any,
        options?: OptionsParam & { store?: Store }
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

  // defining default route
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


// solution #2 👇 - does not throw error, but doesn’t show component
// Cypress.Commands.add('mount', (component, options = {}) => {

//   let pinia = createPinia()
//   let router = createRouter({
//     routes,
//     history: createMemoryHistory()
//   })
  
//   options = {
//     global: {
//       plugins: [useStore(pinia), router]
//     },
//     ...options
//   }
  
//   return mount(component, options)
// })

// solution #3 👇 - does not work
// Cypress.Commands.add('mount', (component, options = {}) => {

//   let pinia = createPinia()
//   let router = createRouter({
//     routes,
//     history: createMemoryHistory()
//   })

//   options.global = options.global || {}
//   options.global.plugins = options.global.plugins || []

//   // Use store passed in from options, or initialize a new one
//   const { store = useStore(pinia), ...mountOptions } = options

//   // let store = useStore()
  
//   options?.global?.plugins?.push({
//     install(app) {
//       app.use(store)
//     },
//     ...options
//   })
    
//   return mount(component, mountOptions)
// })

// Cypress.Commands.add('mount', mount)


Cypress.Commands.add('getDataCy', getDataCy);