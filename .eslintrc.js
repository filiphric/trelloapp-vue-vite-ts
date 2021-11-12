module.exports = {
  env: {
    browser: true,
    es2021 : true,
    node   : true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser     : '@typescript-eslint/parser',
    sourceType : 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'cypress',
    'no-only-tests',
  ],
  rules: {
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'error',
    'cypress/no-pause': 'error',
    'cypress/no-async-tests': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'brace-style': ['error'],
    'no-only-tests/no-only-tests': 'error',
    'quotes': ['error', 'single'],
  }
};
