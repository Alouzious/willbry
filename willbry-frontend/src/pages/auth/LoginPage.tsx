import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { loginSchema } from '../../lib/validators'
import type { LoginFormData } from '../../lib/validators'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { Leaf, EyeOff, Eye } from 'lucide-react'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = loginSchema.safeParse(form)
    if (!result.success) {
      const errs: Partial<LoginFormData> = {}
      result.error.issues.forEach(issue => {
        const key = issue.path[0] as keyof LoginFormData
        errs[key] = issue.message
      })
      setErrors(errs)
      return
    }
    setErrors({})
    setApiError(null)
    try {
      await login(form)
      navigate('/portal')
    } catch {
      setApiError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7e8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Leaf className="h-8 w-8 text-[#2d6a4f]" />
          <span className="text-2xl font-bold text-[#2d6a4f]">WillBry</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Welcome back</h1>
        <p className="text-gray-500 text-center text-sm mb-8">Sign in to your account</p>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            fullWidth
            required
          />
          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            fullWidth
            required
            rightIcon={
              <button type="button" onClick={() => setShowPassword(p => !p)} className="pointer-events-auto">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-[#2d6a4f] hover:underline">Forgot password?</Link>
          </div>
          <Button type="submit" variant="primary" loading={loading} className="w-full" size="lg">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#2d6a4f] font-medium hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  )
}
