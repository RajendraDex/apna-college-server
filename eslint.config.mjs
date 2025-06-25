import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));
export default defineConfig( [
  includeIgnoreFile(gitignorePath),
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'prettier': prettierPlugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      
      // ESLint rules
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': 'off', // Handled by @typescript-eslint/no-unused-vars
      'require-await': 'error',
      'prefer-const': 'error',
      'quotes': ["error", "single"],
      'no-dupe-keys': "error",
      
      // Prettier will handle formatting
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
]);