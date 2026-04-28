import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { router } from './router'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f4f2b',
              color: '#fff',
              borderRadius: '8px',
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  )
}
