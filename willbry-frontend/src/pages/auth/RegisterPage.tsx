import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, Lock, Mail, Phone, UserRound } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import type { UserType } from '../../types'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, loading } = useAuth()

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    user_type: 'farmer' as UserType,
  })

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await register(form)
      toast.success('Account created')
      navigate('/portal')
    } catch {
      toast.error('Registration failed. Please try again.')
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
            Join the platform
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-tight">
            Build smarter farming decisions with WillBry.
          </h1>
          <p className="mt-5 leading-8 text-willbry-green-100">
            Create an account to access advisory, resources, orders, bookings, and market information.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center bg-willbry-light px-4 py-12">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Register
            </p>
            <h2 className="mt-3 text-3xl font-black text-willbry-green-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join as a farmer, client, or partner.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <Input
              label="Full name"
              required
              value={form.full_name}
              onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
              leftIcon={<UserRound size={16} />}
            />

            <Input
              label="Email address"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              leftIcon={<Mail size={16} />}
            />

            <Input
              label="Phone number"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              leftIcon={<Phone size={16} />}
            />

            <div>
              <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
                User type
              </label>
              <select
                value={form.user_type}
                onChange={(e) => setForm((p) => ({ ...p, user_type: e.target.value as UserType }))}
                className="h-11 w-full rounded-xl border border-willbry-green-100 px-4 text-sm font-semibold text-willbry-green-900 outline-none focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
              >
                <option value="farmer">Farmer</option>
                <option value="client">Client</option>
                <option value="partner">Partner</option>
              </select>
            </div>

            <Input
              label="Password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              leftIcon={<Lock size={16} />}
            />

            <Button type="submit" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-black text-willbry-green-600">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}