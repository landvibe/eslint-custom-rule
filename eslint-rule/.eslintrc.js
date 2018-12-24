module.exports = {
  extends: 'airbnb-base',
  plugins: ['myplugin'],
  rules: {
    'no-console': 'off',
    'myplugin/no-date-with-args': 2,
  },
};
