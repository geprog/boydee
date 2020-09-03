module.exports = {
  plugins: ['vue', '@intlify/vue-i18n'],
  extends: [
    '../../.eslintrc.js',
    'plugin:vue/recommended',
    '@vue/typescript',
    'prettier',
    'prettier/vue',
    'plugin:vue-scoped-css/recommended',
  ],
  rules: {
    'vue/attribute-hyphenation': 'error',
    'vue-scoped-css/no-unused-selector': 'error',
    'vue-scoped-css/no-parsing-error': 'error',
    'vue-scoped-css/require-scoped': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
        },
      },
    ],
    'vue/component-name-in-template-casing': 'error',
    'vue/no-static-inline-styles': 'warn',
    'vue/v-on-function-call': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-concat': 'error',
    'vue/no-bare-strings-in-template': [
      'error',
      {
        allowlist: [
          // be careful when updating eslint-plugin-vue this key changes in v7.0.0-alpha.7
          // TODO: maybe this can take a regex
          ':',
          '|',
        ],
        attributes: {
          '/.+/': ['title', 'label', 'aria-label', 'aria-placeholder', 'aria-roledescription', 'aria-valuetext'],
          input: ['placeholder'],
          img: ['alt'],
          TextField: ['placeholder'],
          ProtocolTable: ['loading-message'],
          Notification: ['msg'],
        },
      },
    ],
    'vue/no-boolean-default': 'error',
    'vue/valid-v-slot': 'off',
    '@intlify/vue-i18n/no-html-messages': 'error',
    '@intlify/vue-i18n/no-missing-keys': 'error',
    '@intlify/vue-i18n/no-raw-text': [
      'error',
      {
        ignoreNodes: ['v-icon'],
        ignoreText: [':', '|'],
      },
    ],
    '@intlify/vue-i18n/no-dynamic-keys': 'error',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
  settings: {
    'vue-i18n': {
      localeDir: './src/i18n/en.json',
    },
  },
};
