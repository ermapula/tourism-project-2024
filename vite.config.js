import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_BACKEND_URL')
  console.log("env:", env)
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
        },
        '/media': {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
        },
      }
    }
  }
})
