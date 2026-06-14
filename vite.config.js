import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// Guarantee the deep-link association files land in dist/.well-known/.
// These power website -> app redirection (Android App Links + iOS Universal
// Links). Losing them silently breaks the in-app invite links, so we copy
// them explicitly after the bundle is written rather than relying on Vite's
// dotfile handling.
function copyWellKnown() {
  return {
    name: 'copy-well-known',
    closeBundle() {
      const root = process.cwd()
      const src = resolve(root, 'public/.well-known')
      const dest = resolve(root, 'dist/.well-known')
      mkdirSync(dest, { recursive: true })
      for (const file of ['assetlinks.json', 'apple-app-site-association']) {
        const from = resolve(src, file)
        if (existsSync(from)) copyFileSync(from, resolve(dest, file))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyWellKnown()],
})
