import { defineConfig } from 'cypress'
import constants from './constants'
const { APP } = constants

export default defineConfig({
  env: {
    coverage: true,
  },
  retries: {
    openMode: 0,
    runMode: 1,
  },
  videoUploadOnPasses: false,
  viewportHeight: 550,
  viewportWidth: 700,
  projectId: 'qmz9cz',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    baseUrl: `http://localhost:${APP}`,
    specPattern: 'cypress/e2e/**/*.spec.ts',
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) { },
    env: {
      coverage: false,
    },
    specPattern: 'src/**/*.spec.ts',
  },
})
