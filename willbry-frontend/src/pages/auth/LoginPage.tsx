import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, Lock, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await login(form)
      toast.success('Welcome back')
      navigate('/portal')
    } catch {
      toast.error('Login failed. Check your email and password.')
    }
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-willbry-green-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(82,183,136,0.35),transparent_35%),linear-gradient(135deg,#0d2b18,#2d6a4f)]" />

        <Link to="/" className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-willbry-teal">
            <Leaf size={22} />
          </div>
          <div>
            <p className="text-xl font-black">WillBry</p>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-willbry-teal">
              Agro-Innovations
            </p>
          </div>
        </Link>

        <div className="relative max-w-xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
            Platform 2.0
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-tight">
            Welcome back to smarter agriculture.
          </h1>
          <p className="mt-5 leading-8 text-willbry-green-100">
            Access your dashboard, AI farming assistant, orders, resources, and farm profile.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center bg-willbry-light px-4 py-12">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Sign in
            </p>
            <h2 className="mt-3 text-3xl font-black text-willbry-green-900">
              Access your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Continue to your WillBry portal.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              leftIcon={<Mail size={16} />}
            />

            <Input
              label="Password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              leftIcon={<Lock size={16} />}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 font-medium text-gray-600">
                <input type="checkbox" className="rounded border-willbry-green-200" />
                Remember me
              </label>
              <Link to="/forgot-password" className="font-bold text-willbry-green-600">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={loading} className="w-full">
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            New to WillBry?{' '}
            <Link to="/register" className="font-black text-willbry-green-600">
              Create account
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}