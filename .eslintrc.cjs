module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard-with-typescript'],
  plugins: ['unused-imports'],
  rules: {
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'comma-dangle': ['warn', 'never'],
    'unused-imports/no-unused-imports': 'error',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
    ]
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
    sourceType: 'module',
    ecmaVersion: 'latest',
    extraFileExtensions: ['.svelte']

  },
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      // Svelte rules
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'no-undef-init': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
        ]
      }
    },
    {
      files: ['*.server.ts'],
      rules: {
        '@typescript-eslint/no-throw-literal': 'off'
      }
    }

  ]
}
