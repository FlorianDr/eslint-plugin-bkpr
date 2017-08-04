function getFirstArgumentValue(args) {
  if (args && args.length > 0 && args[0].type === 'Literal') {
    return args[0].value;
  } else {
    return null;
  }
}

function getProperty(node) {
  let property;
  if (node.callee.type === 'MemberExpression') {
    property = node.callee.property;
  } else if (node.callee.type === 'Identifier') {
    property = node.callee;
  } else {
    property = null;
  }
  return property;
}

const rule = {
  meta: {
    docs: {
      description: 'disallow usage of unknown translations',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    schema: [{
      type: 'string'
    },{
      type: 'string'
    }, {
      type: 'array',
      items: {
        type: 'string'
      },
      uniqueItems: true
    }]
  },
  create(context) {
    const objectName = context.options[0];
    const propertyName = context.options[1];
    const translationKeys = context.options[2];

    function isTranslationProperty(property) {
      return property.name === propertyName;
    }
    function isTranslationObject(object) {
      let isTransObj;
      if (!object && !objectName) {
        isTransObj = true;
      } else if (object && object.name === objectName) {
        isTransObj = true;
      } else {
        isTransObj = false;
      }
      return isTransObj;
    }
    function isTranslationCall(property, object) {
      return isTranslationProperty(property) && isTranslationObject(object);
    }
    function getTranslationKeyIndex(translationKey) {
      return translationKeys.indexOf(translationKey);
    }
    function reportNotDefinedKey(nodeOrToken, key) {
      context.report({
        node: nodeOrToken,
        message: 'Translation key is not defined: {{ identifier }}',
        data: {
          identifier: key
        }
      });
    }
    return {
      CallExpression(node) {
        const property = getProperty(node);
        if (!property || !isTranslationCall(property, node.callee.object)) {
          // We are not interested, if it's not a translation call
          return;
        }
        const translationKey = getFirstArgumentValue(node.arguments);
        if (!translationKey) {
          // We can not handle not Literals, therefore we will not test them
          return;
        }
        const translationKeyIndex = getTranslationKeyIndex(translationKey);

        if (translationKeyIndex === -1) {
          reportNotDefinedKey(node.arguments[0], translationKey);
        }
      }
    };
  },
};
module.exports = rule;
