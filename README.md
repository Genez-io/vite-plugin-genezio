# vite-plugin-genezio
## Introduction

This plugin ensures that your development environment remains up-to-date with any changes in the Genezio SDK by watching for overwrites and automatically reloading the Vite dev server.

## Example

```js
// vite.config.js
import { defineConfig } from 'vite'
import genezio from '@genezio/vite-plugin-genezio'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [genezio()],
})
```

## Install

```
npm install --save-dev @genezio/vite-plugin-genezio
```
