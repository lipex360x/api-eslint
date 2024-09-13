<div align="center">

## <a name="header">API Lint BoilerPlate</a>

  <div>
    <img src="https://img.shields.io/badge/TypeScript-444?logo=typescript&logoColor=blue" />
    <img src="https://img.shields.io/badge/Bun%20Test-444?logo=bun&logoColor=white" />
    <img src="https://img.shields.io/badge/Hono-444?logo=hono&logoColor=orange" />
    <img src="https://img.shields.io/badge/ESLint-444?logo=eslint&logoColor=7c7dea" />
    <img src="https://img.shields.io/badge/Prettier-444?logo=prettier&logoColor=F7B93E" />
  </div>

</div>

## 📌 <a name="summary">Sumário</a>

1. ⚙️ [Tech Stack](#tech-stack)
1. 🔧 [Ferramentas](#wrench)
1. ⚡ [ESlint e Prettier](#eslint)
1. ©️ [Snippets (Code to Copy)](#snippets)

<br />

## <a name="tech-stack">⚙️ Tech Stack</a>

* Typescript
* Hono
* Bun Tests
* ESLint
* Prettier

<br />


## <a name="wrench">🔧 Ferramentas</a>

**Pré Requisitos**

* [Node.js](https://nodejs.org/en/download/package-manager)
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
* [Bun](https://bun.sh/docs/installation)

**Apps**

* [VSCode](https://code.visualstudio.com/)
* [Bruno API Client](https://www.usebruno.com/)

**VSCode Extensions**

* ESLint: `dbaeumer.vscode-eslint`
* Jest Runner: `firsttris.vscode-jest-runner`
* Bruno: `bruno-api-client.bruno`
* Pretty TypeScript Errors: `yoavbls.pretty-ts-errors`
* Material Icon Theme: `pkief.material-icon-theme`

**Snippet de Instalação -  VSCode Extensions**

```sh
code --install-extension dbaeumer.vscode-eslint
code --install-extension firsttris.vscode-jest-runner
code --install-extension bruno-api-client.bruno
code --install-extension yoavbls.pretty-ts-errors
code --install-extension pkief.material-icon-theme
```
<br />

## ⚡ <a name="eselint">ESlint e Prettier</a>

**Instalação**

```sh
npx eslint --init
```

**Plugins**

```sh
yarn add -D eslint-plugin-prettier eslint-config-prettier prettier eslint-plugin-simple-import-sort
```

<details>
<summary><code>eslint.config.mjs</code></summary>

```ts
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

```
</details>
<br />

<details>
<summary><code>prettier.config.mjs</code></summary>

```ts
/** @type {import("prettier").Config} */

const config = {
  printWidth: 120,
  singleQuote: true,
  semi: false,
}

export default config

```
</details>

<br />

## <a name="snippets">©️ Snippets</a>

<details>
<summary><code>.vscode/settings.json</code></summary>

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "jestrunner.jestCommand": "bun test",
  "jestrunner.jestPath": "${file}",
  "jestrunner.debugOptions": {
    "runtimeExecutable": "bun",
  }
}
```
</details>
<br />


<details>
<summary><code>tsconfig.json</code></summary>

```json
{
  "compilerOptions": {
    "strict": true,
    "skipLibCheck": true,
    "types": ["bun"],
    "paths": {
      "@/*": ["./src/*"],
      "$/*": ["./*"],
    }
  },
  "exclude": ["node_modules"]
}
```
</details>
<br />


---

👆 [Voltar para o Sumário](#header)