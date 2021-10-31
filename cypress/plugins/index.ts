const clipboardy = require('clipboardy');

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('task', {
    getClipboard: () => {
      const clipboard: string = clipboardy.readSync();
      return clipboard;
    },
  })
  require('@cypress/code-coverage/task')(on, config);
  require('cypress-watch-and-reload/plugins')(config)

  const path = require('path')
  const { startDevServer } = require('@cypress/vite-dev-server')

  on('dev-server:start', (options) => {
    return startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, '..', '..', 'vite.config.ts'),
      },
    })
  })

  return config;
};