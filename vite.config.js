import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseURL } from './src/api/initPublic'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: baseURL,
        changeOrigin: true,
        secure: false,
      },
      '/media': {
        target: baseURL,
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
