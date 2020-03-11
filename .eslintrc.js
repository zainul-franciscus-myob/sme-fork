module.exports = {
  extends: ['react-app', 'airbnb'],
  parser: 'babel-eslint',
  plugins: [
    'jest',
    'sort-imports-es6-autofix',
  ],
  env: {
    'browser': true,
    'jest/globals': true
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.js',
          '.jsx'
        ]
      }
    ],
    'import/extensions': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'sort-imports-es6-autofix/sort-imports-es6': 2,
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
      }
    ],

    // @TODO
    // eslint-plugin-react@7.19.0
    // eslint-config-airbnb@18.0.1
    // enable these as needed
    'arrow-parens': 'off',
    'no-mixed-operators': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-indent': 'off',
    'react/self-closing-comp': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-fragments': 'off',
  }
};
