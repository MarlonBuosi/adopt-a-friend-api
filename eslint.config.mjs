import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
  ...tseslint.configs.recommended,
    
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
    rules: {
      // Style
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'always'],
      'max-len': ['warn', { code: 100 }],
      // Best practices
      eqeqeq: ['error', 'always'],
      'no-console': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      // TypeScript-specific
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-inferrable-types': 'off',
    },
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: globals.node,
    },
  },
]);
