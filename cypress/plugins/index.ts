import 'dotenv/config'

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {


  require('@cypress/code-coverage/task')(on, config);

  config.env.googleEnabled = process.env.VUE_APP_GOOGLE_ENABLED
  config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN
  config.env.googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID
  config.env.googleClientSecret = process.env.VUE_APP_GOOGLE_CLIENT_SECRET

  return config;
};