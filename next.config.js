const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

global.navigator = () => null;

if (typeof require !== 'undefined') {
  require.extensions['.sass'] = () => {};
  require.extensions['.css'] = file => {};
}

module.exports = withCSS(withSass({}));
