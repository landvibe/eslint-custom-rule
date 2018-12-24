module.exports = {
  rules: {
    'no-date-with-args': {
      create(context) {
        return {
          NewExpression(node) {
            if (node.callee.name === 'Date' && node.arguments.length > 0) {
              context.report({
                node,
                message: 'Do not use `new Date` with arguments',
              });
            }
          },
        };
      },
    },
  },
};
