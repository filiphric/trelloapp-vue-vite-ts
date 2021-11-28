import * as clipboardy from 'clipboardy';
import { cypressEsbuildPreprocessor } from 'cypress-esbuild-preprocessor';
import * as path from 'path';

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('task', {
    getClipboard: () => {
      const clipboard: string = clipboardy.readSync();
      return clipboard;
    },
  })
  
  on('file:preprocessor',
    cypressEsbuildPreprocessor({
        esbuildOptions: {
            tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
        },
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

  return config;
};