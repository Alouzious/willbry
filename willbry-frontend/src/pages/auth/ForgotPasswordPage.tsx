import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Leaf, Mail, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import api from '../../lib/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      await api.post('/auth/forgot-password', { email })
      toast.success('Password reset instructions sent')
      setEmail('')
    } catch {
      toast.error('Could not send reset instructions')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-willbry-light px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
        <Link to="/" className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-willbry-green-500 text-white">
            <Leaf size={22} />
          </div>
          <div>
            <p className="text-xl font-black text-willbry-green-900">WillBry</p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-willbry-teal">
              Agro-Innovations
            </p>
          </div>
        </Link>

        <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
          Account recovery
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-willbry-green-900">
          Reset your password
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Enter your email and we will send instructions to help you regain access.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <Input
            label="Email address"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            leftIcon={<Mail size={16} />}
          />

          <Button type="submit" loading={loading} className="w-full" rightIcon={<Send size={16} />}>
            Send Reset Link
          </Button>
        </form>

        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-2 text-sm font-black text-willbry-green-600"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </div>
    </main>
  )
}