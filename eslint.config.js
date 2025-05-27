import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    name: 'global-env',
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    name: 'javascript-rules',
    files: ['**/*.{js,cjs,mjs,jsx,vue}'],
    ...js.configs.recommended,
  },

  ...pluginVue.configs['flat/essential'],

  // Vitest test file rules
  {
    name: 'vitest-tests',
    files: ['src/**/__tests__/*', '**/*.test.js'],
    ...pluginVitest.configs.recommended,
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // Prettier compatibility (disable ESLint formatting rules)
  eslintConfigPrettier,
]);
