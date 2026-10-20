require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  retries: 0,
  e2e: {
    baseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      config.env.MAILOSAUR_API_KEY = process.env.MAILOSAUR_API_KEY;
      config.env.MAILOSAUR_SERVER_ID = process.env.MAILOSAUR_SERVER_ID;
      return config;
    },
  },
});
