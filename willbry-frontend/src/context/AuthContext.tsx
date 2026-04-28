import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, LoginDto, RegisterDto } from '../types'
import api from '../lib/api'
import { setTokens, clearTokens, setUser, getUser, isAuthenticated } from '../lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (dto: LoginDto) => Promise<void>
  register: (dto: RegisterDto) => Promise<void>
  logout: () => void
  isAuth: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(getUser())
  const [loading, setLoading] = useState(false)

  const login = async (dto: LoginDto) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', dto)
      const { user, access_token, refresh_token } = res.data.data
      setTokens(access_token, refresh_token)
      setUser(user)
      setUserState(user)
    } finally {
      setLoading(false)
    }
  }

  const register = async (dto: RegisterDto) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/register', dto)
      const { user, access_token, refresh_token } = res.data.data
      setTokens(access_token, refresh_token)
      setUser(user)
      setUserState(user)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearTokens()
    setUserState(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuth: isAuthenticated(),
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
