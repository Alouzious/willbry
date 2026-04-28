import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/api'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Leaf, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)
    try {
      await api.post('/auth/forgot-password', { email })
      setSent(true)
    } catch {
      setError('Unable to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7e8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Leaf className="h-8 w-8 text-[#2d6a4f]" />
          <span className="text-2xl font-bold text-[#2d6a4f]">WillBry</span>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-[#2d6a4f] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-600 text-sm mb-6">
              We've sent a password reset link to <strong>{email}</strong>. Check your inbox.
            </p>
            <Link to="/login" className="text-[#2d6a4f] font-medium hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Reset Password</h1>
            <p className="text-gray-500 text-center text-sm mb-8">Enter your email to receive a reset link</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth required
              />
              <Button type="submit" variant="primary" loading={loading} className="w-full" size="lg">
                Send Reset Link
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              <Link to="/login" className="text-[#2d6a4f] font-medium hover:underline">← Back to Login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
