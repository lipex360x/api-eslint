import pluginJs from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import simpleImport from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  prettierPlugin,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  { ignores: ['.build'] },
  {
    plugins: {
      'simple-import': simpleImport,
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'simple-import/imports': 'error',
      'simple-import/exports': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    },
  },
]
