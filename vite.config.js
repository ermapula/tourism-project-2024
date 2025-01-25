import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

const baseUrl = process.env.VITE_BACKEND_URL || "http://localhost:8000";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: baseUrl,
        changeOrigin: true,
        secure: false,
      },
      '/media': {
        target: baseUrl,
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
