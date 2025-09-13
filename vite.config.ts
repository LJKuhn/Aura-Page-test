// @ts-nocheck // (opcional) Quitar si agregas @types/node y quieres chequeo estricto aquí
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Compatibilidad ESM para obtener ruta actual
const currentFilename = fileURLToPath(import.meta.url)
const currentDirname = path.dirname(currentFilename)

export default defineConfig({
  plugins: [
  react()
  // Visualizador opcional: ejecutar "npm run analyze" para generar reporte.
  ],
  server: {
    port: 3002,
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      output: {
        // División de chunks manual para reducir el bundle inicial
        manualChunks: {
          "vendor-react": ['react', 'react-dom', 'react-router-dom'],
          "vendor-chakra": ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
            // Radix primitives agrupadas (se pueden subdividir si crecen)
          "vendor-radix": [
            '@radix-ui/react-dialog', '@radix-ui/react-alert-dialog', '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-menubar', '@radix-ui/react-navigation-menu', '@radix-ui/react-popover',
            '@radix-ui/react-tooltip', '@radix-ui/react-hover-card', '@radix-ui/react-select',
            '@radix-ui/react-tabs', '@radix-ui/react-toast', '@radix-ui/react-scroll-area',
            '@radix-ui/react-accordion', '@radix-ui/react-collapsible'
          ],
          "vendor-forms": ['react-hook-form'],
          "vendor-query": ['@tanstack/react-query'],
          "vendor-charts": ['recharts'],
          "vendor-carousel": ['embla-carousel-react'],
          "vendor-utils": ['class-variance-authority', 'tailwind-merge', 'cmdk'],
        }
      }
    },
    chunkSizeWarningLimit: 900
  },
  resolve: {
    alias: {
  '@': path.resolve(currentDirname, './src')
    }
  }
})
