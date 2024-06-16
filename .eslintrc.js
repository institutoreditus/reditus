module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
    'node': true,
    "jest/globals": true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'google',
    'prettier',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'plugins': [
    'jest',
    'react',
    '@typescript-eslint',
    'prettier',
  ],
  'rules': {
    "react/react-in-jsx-scope": "off",
    "require-jsdoc": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "prettier/prettier": "error",
    "jest/no-export": "off",
    "camelcase": "off",
  },
};
