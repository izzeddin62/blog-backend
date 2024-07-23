import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'], rules: {

      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'linebreak-style': ['error', 'unix'],
      'no-console': 0,
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']

    }
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];