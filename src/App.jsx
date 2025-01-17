import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from "./Router.jsx"
import { AuthProvider } from './routes/auth/AuthContext.jsx'


function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
