module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'prettier'
  ],
  settings: {
    linkComponents: { name: 'Link', linkAttribute: 'to' },
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/button-has-type': 'off',
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/alt-text': [
      'warn',
      {
        img: ['Img']
      }
    ],
    'jsx-a11y/anchor-has-content': [
      'warn',
      {
        components: ['Link']
      }
    ],
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        components: ['Link', 'ExternalLink'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref']
      }
    ],
    'jsx-a11y/img-redundant-alt': [
      'warn',
      {
        components: ['Img']
      }
    ],
    'jsx-a11y/lang': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
  ]
};
