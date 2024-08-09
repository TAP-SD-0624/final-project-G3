import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // General Rules
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'prefer-const': 'error',

      // Style Rules
      'arrow-parens': ['error', 'always'],
      'brace-style': ['error', '1tbs'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      "indent": ["error", 2],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      // TypeScript-Specific Rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
