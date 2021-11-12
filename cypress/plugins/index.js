/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('task', {
    'seed:db': (dbFile) => {
      if (!dbFile) return;

      const data = fs.readFileSync(`cypress/fixtures/databases/${dbFile}.json`);
      fs.rmSync('backend/data/database.json');
      fs.writeFileSync('backend/data/database.json', data);

      return JSON.parse(data);
    },
  });

  return config;
}
