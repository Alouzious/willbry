import { User } from '../types'

export const getAccessToken = () => localStorage.getItem('access_token')
export const getRefreshToken = () => localStorage.getItem('refresh_token')

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
}

export const clearTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user')
}

export const setUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = (): User | null => {
  const u = localStorage.getItem('user')
  return u ? JSON.parse(u) : null
}

export const isAdmin = (): boolean => {
  const user = getUser()
  return user?.role === 'admin'
}

export const isAuthenticated = (): boolean => {
  return !!getAccessToken()
}
