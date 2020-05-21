module.exports = {
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      'plugin:vue/recommended'
    ],
    rules: {
      // override/add rules settings here, such as:
      'vue/no-unused-vars': 'off',
      'no-unused-labels': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off'
    }
  }