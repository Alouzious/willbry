export type UserRole = 'user' | 'admin'
export type UserType = 'farmer' | 'client' | 'partner'

export interface User {
  id: string
  full_name: string
  email: string
  phone?: string
  role: UserRole
  user_type: UserType
  profile_photo?: string
  verified: boolean
  active: boolean
  created_at: string
}

export interface AuthResponse {
  user: User
  access_token: string
  refresh_token: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  full_name: string
  email: string
  phone?: string
  password: string
  user_type: UserType
}
