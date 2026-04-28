import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { registerSchema } from '../../lib/validators'
import type { RegisterFormData } from '../../lib/validators'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { Leaf } from 'lucide-react'
import type { UserType } from '../../types'

export default function RegisterPage() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterFormData>({
    full_name: '', email: '', phone: '', password: '', user_type: 'farmer',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({})
  const [apiError, setApiError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = registerSchema.safeParse(form)
    if (!result.success) {
      const errs: Partial<Record<keyof RegisterFormData, string>> = {}
      result.error.issues.forEach(issue => {
        const key = issue.path[0] as keyof RegisterFormData
        errs[key] = issue.message
      })
      setErrors(errs)
      return
    }
    setErrors({})
    setApiError(null)
    try {
      await register(form)
      navigate('/portal')
    } catch {
      setApiError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7e8] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Leaf className="h-8 w-8 text-[#2d6a4f]" />
          <span className="text-2xl font-bold text-[#2d6a4f]">WillBry</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Create Account</h1>
        <p className="text-gray-500 text-center text-sm mb-8">Join the WillBry community</p>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
            error={errors.full_name}
            fullWidth required
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
            error={errors.email}
            fullWidth required
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone || ''}
            onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
            fullWidth
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
            error={errors.password}
            fullWidth required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              I am a... <span className="text-red-500">*</span>
            </label>
            <select
              name="user_type"
              value={form.user_type}
              onChange={e => setForm(prev => ({ ...prev, user_type: e.target.value as UserType }))}
              className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
            >
              <option value="farmer">Farmer</option>
              <option value="client">Client / Consumer</option>
              <option value="partner">Business Partner</option>
            </select>
          </div>
          <Button type="submit" variant="primary" loading={loading} className="w-full" size="lg">
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#2d6a4f] font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
