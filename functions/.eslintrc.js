/* eslint-env node */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    commonjs: true,
    browser: false
  },
  parserOptions: {
    "ecmaVersion": 2022,
    "sourceType": "commonjs"
  },
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
    "no-undef": "error",
    "no-unused-vars": ["error", { 
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }]
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {
    "module": "readonly",
    "require": "readonly",
    "exports": "readonly",
    "process": "readonly",
    "functions": "readonly",
    "__dirname": "readonly",
    "Buffer": "readonly",
    "console": "readonly",
    "setTimeout": "readonly",
    "clearTimeout": "readonly",
    "setInterval": "readonly",
    "clearInterval": "readonly"
  },
};
