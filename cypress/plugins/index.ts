const clipboardy = require('clipboardy');

module.exports = (on, config) => {
  on('task', {
    getClipboard: () => {
      const clipboard: string = clipboardy.readSync();
      return clipboard;
    },
  })
  require('@cypress/code-coverage/task')(on, config);
  require('cypress-watch-and-reload/plugins')(config)

  return config;
};