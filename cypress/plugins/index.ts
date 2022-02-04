import * as clipboardy from 'clipboardy';
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
import * as path from 'path';
import 'dotenv/config' 

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('task', {
    getClipboard: () => {
      const clipboard: string = clipboardy.readSync();
      return clipboard;
    },
  })
  
  on('file:preprocessor',
    createBundler({
      tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
    }),
  );

  require('@cypress/code-coverage/task')(on, config);

  const { startDevServer } = require('@cypress/vite-dev-server')

  on('dev-server:start', (options) => {
    return startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, '..', '..', 'vite.config.ts'),
      },
    })
  })

  config.env.googleEnabled = process.env.VUE_APP_GOOGLE_ENABLED
  config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN
  config.env.googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID
  config.env.googleClientSecret = process.env.VUE_APP_GOOGLE_CLIENT_SECRET

  return config;
};