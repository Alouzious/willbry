import React, { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import api from '../../lib/api'
import toast from 'react-hot-toast'

type Tab = 'profile' | 'password' | 'notifications'

export default function PortalSettings() {
  const { user } = useAuth()
  const [tab, setTab] = useState<Tab>('profile')
  const [profileForm, setProfileForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  })
  const [saving, setSaving] = useState(false)

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const saveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/portal/profile', profileForm)
      toast.success('Profile updated!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const savePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast.error('Passwords do not match')
      return
    }
    setSaving(true)
    try {
      await api.put('/portal/password', { current_password: passwordForm.current_password, new_password: passwordForm.new_password })
      toast.success('Password updated!')
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' })
    } catch {
      toast.error('Failed to update password')
    } finally {
      setSaving(false)
    }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'profile', label: 'Profile' },
    { key: 'password', label: 'Password' },
    { key: 'notifications', label: 'Notifications' },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="portal" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-1">Manage your account preferences</p>
          </div>

          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                  tab === t.key
                    ? 'border-[#2d6a4f] text-[#2d6a4f]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-xl">
            {tab === 'profile' && (
              <form onSubmit={saveProfile} className="space-y-4">
                <Input label="Full Name" name="full_name" value={profileForm.full_name} onChange={handleProfileChange} fullWidth />
                <Input label="Email" name="email" type="email" value={profileForm.email} onChange={handleProfileChange} fullWidth />
                <Input label="Phone" name="phone" type="tel" value={profileForm.phone} onChange={handleProfileChange} fullWidth />
                <Button type="submit" variant="primary" loading={saving}>Save Changes</Button>
              </form>
            )}

            {tab === 'password' && (
              <form onSubmit={savePassword} className="space-y-4">
                <Input label="Current Password" name="current_password" type="password" value={passwordForm.current_password} onChange={handlePasswordChange} fullWidth required />
                <Input label="New Password" name="new_password" type="password" value={passwordForm.new_password} onChange={handlePasswordChange} fullWidth required />
                <Input label="Confirm New Password" name="confirm_password" type="password" value={passwordForm.confirm_password} onChange={handlePasswordChange} fullWidth required />
                <Button type="submit" variant="primary" loading={saving}>Update Password</Button>
              </form>
            )}

            {tab === 'notifications' && (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">Notification preferences coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
