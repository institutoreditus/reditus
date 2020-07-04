const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

global.navigator = () => null;

if (typeof require !== 'undefined') {
  require.extensions['.scss'] = () => {};
  require.extensions['.css'] = file => {};
}

module.exports = withCSS(withSass(withImages({})));
