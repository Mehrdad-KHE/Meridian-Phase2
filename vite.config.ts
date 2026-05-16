import { defineConfig } from 'vite'
import path from 'path'
import { rmSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile({ removeViteModuleLoader: true }),
    {
      name: 'strip-dist-artifacts',
      closeBundle() {
        rmSync('dist/assets', { recursive: true, force: true })
      },
    },
  ],
  base: './',
  build: {
    assetsInlineLimit: 100000000,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
