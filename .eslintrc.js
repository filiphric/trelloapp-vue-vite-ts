module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwind/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  ignorePatterns: ['dist', 'coverage', 'node_modules'],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'no-only-tests', 'tailwindcss'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'brace-style': ['error', 'stroustrup'],
    'no-only-tests/no-only-tests': 'error',
    'quotes': ['error', 'single'],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/no-contradicting-classname': 'error',
  },
  overrides: []
};
