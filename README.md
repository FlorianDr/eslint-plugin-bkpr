# eslint-plugin-bkpr
A set of custom ESLint rules used at [Beekeeper](https://beekeeper.io).

## Rules 
**no-unused-translation**: Will check if translate function is called with unknown translation key
## Get Started
First, we need to add eslint plugin to the project dev dependencies. Make sure to met peerDependencies.
```sh
npm install --save-dev eslint-plugin-bkpr
```
Let's say, we want every call with ``i18n.t(...)`` to be checked, we will need to add an ``.eslintrc.js`` file:
```js
const translations = require('./translations.js');
const translationKeys = Object.keys(translations);

module.exports = {
  plugins: ['bkpr'],
  rules: {
    'bkpr/no-unused-translation': ['error', 'i18n', 't', translationKeys]
  }
};
```
