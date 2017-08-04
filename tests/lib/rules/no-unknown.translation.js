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
    }, {
      code: '_(somevar)',
      options: ['', '_', ['search']]
    }, {
      code: 'mysicktranslationtool.translatitbitch(\'what string is it\')',
      options: ['', 'translatitbitch', ['search']]
  }],
  invalid: [{
    code: '_(\'test\')',
    options: ['', '_', ['search']],
    errors: [{ message: 'Translation key is not defined: test', type: 'Literal'}]
  }, {
    code: '_(\'ilikelongstringsandIcannotlie\')',
    options: ['', '_', []],
    errors: [{ message: 'Translation key is not defined: ilikelongstringsandIcannotlie', type: 'Literal'}]
  }]
});
