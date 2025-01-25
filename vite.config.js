import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  console.log("env:", env)
  return {
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
    },
    plugins: [react()],
  }
})
