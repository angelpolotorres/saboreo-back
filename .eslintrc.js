// Guia. Los 3 estados que puedes usar con las reglas
const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
};

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: { 'prettier/prettier': 'warn' },
};
