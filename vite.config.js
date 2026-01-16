import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      '/exams': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/member-info': 'http://localhost:3000',
      '/member-check': 'http://localhost:3000',
      '/member-create': 'http://localhost:3000',
      '/subject': 'http://localhost:3000',
      '/image-upload': 'http://localhost:3000',
      '/question': 'http://localhost:3000',
      '/board': 'http://localhost:3000',
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
  }
})
