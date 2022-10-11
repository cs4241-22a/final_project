import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootPage from './pages/RootPage.jsx'
import './index.css'
import AuthPage from './pages/AuthPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />
  },
  {
    path: "/Login",
    element: <AuthPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
