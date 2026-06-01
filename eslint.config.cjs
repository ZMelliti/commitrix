module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'no-unused-vars': ['warn'],
    'no-console': 'off'
  },
  ignores: ['node_modules/', 'coverage/']
};

