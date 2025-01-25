import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from "./Router.jsx"
import { AuthProvider } from './routes/auth/AuthContext.jsx'
import { apiKey, baseURL } from './api/initPublic.js'


function App() {

  console.log("baseURL", baseURL)
  console.log("apikey", apiKey)

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
