module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'google',
    'prettier'
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
    'react',
    '@typescript-eslint',
    'prettier'
  ],
  'rules': {
    "react/react-in-jsx-scope": "off",
    "require-jsdoc": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "prettier/prettier": "error"
  },
};
