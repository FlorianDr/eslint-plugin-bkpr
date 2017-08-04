const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-unknown-translation');

const ruleTester = new RuleTester();
ruleTester.run('no-unknown-translation', rule, {
  valid: [{
      code: 'i18n.t(\'search\')',
      options: ['i18n', 't', ['search']]
    }, {
      code: 'i18n.t("text.is.a.nice.thing")',
      options: ['i18n', 't', ['anotherstring', 'justanotherstring', 'text.is.a.nice.thing']]
    }, {
      code: '_(\'search\')',
      options: ['', '_', ['search']]
  }],
  invalid: [{
    code: '_(\'test\')',
    options: ['', '_', ['search']]
  }]
});
