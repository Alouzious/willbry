import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, LoginDto, RegisterDto } from '../types'
import api from '../lib/api'
import {
  setTokens,
  clearTokens,
  setUser,
  getUser,
  isAuthenticated,
} from '../lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (dto: LoginDto) => Promise<void>
  register: (dto: RegisterDto) => Promise<void>
  logout: () => void
  isAuth: boolean
  isAdmin: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(getUser())
  const [loading, setLoading] = useState(false)

  const login = async (dto: LoginDto) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', dto)
      const payload = res.data?.data ?? res.data

      setTokens(payload.access_token, payload.refresh_token)
      setUser(payload.user)
      setUserState(payload.user)
    } finally {
      setLoading(false)
    }
  }

  const register = async (dto: RegisterDto) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/register', dto)
      const payload = res.data?.data ?? res.data

      setTokens(payload.access_token, payload.refresh_token)
      setUser(payload.user)
      setUserState(payload.user)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearTokens()
    setUserState(null)
    window.location.href = '/'
  }

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isAuth: isAuthenticated(),
      isAdmin: user?.role === 'admin',
    }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}