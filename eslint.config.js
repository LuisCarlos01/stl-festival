import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';

export default [
  // Base JavaScript recommendations
  js.configs.recommended,

  // Global ignores
  {
    ignores: [
      'dist/**',
      '.output/**',
      '.astro/**',
      'node_modules/**',
      '*.config.{js,mjs,ts}',
      'public/**',
    ],
  },

  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // Using TypeScript for prop validation
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Astro files
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        parser: typescriptParser,
      },
    },
    plugins: {
      astro: astro,
    },
    rules: {
      ...astro.configs.recommended.rules,
      'astro/no-unused-define-vars-in-style': 'error',
    },
  },

  // Prettier integration (must be last)
  prettier,
];
