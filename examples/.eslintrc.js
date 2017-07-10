// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "space-before-function-paren": [0, {"anonymous": "always", "named": "never"}],
    "space-in-parens": [0, "never"],
    "spaced-comment": 0,
    "no-irregular-whitespace": 1,
    "no-multi-spaces": 0,
    "no-tabs": 'off',
    "no-multiple-empty-lines": [2, {"max": 2}],
    "indent": ["off", 4],
    "no-mixed-spaces-and-tabs": [0, false],
    "no-trailing-spaces": 0,
    "space-before-blocks": [0, "always"],
    "keyword-spacing ": ["off", { "before": false, "after": false }],
	"one-var": 1,
    "eqeqeq": 0,
    "eol-last": 0,
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}],
    "no-new": "off",
    "semi": [0, "off"],
    "comma-dangle": ["off"],
  }
}