const path = require('path')
const svgLoader = require('vite-svg-loader');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"

  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "storybook-builder-vite"
  },
  typescript: {
    check: false
  },
  async viteFinal(config) {
    config.resolve.alias['@'] = path.resolve('./src')
    config.build = {
      sourcemap: true
    }
    config.plugins = [
      ...config.plugins, 
      svgLoader(),
  ]
  return config;
},
}