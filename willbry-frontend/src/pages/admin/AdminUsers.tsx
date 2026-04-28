import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import UsersTable from '../../components/admin/UsersTable'
import Spinner from '../../components/ui/Spinner'
import type { User } from '../../types'
import api from '../../lib/api'
import toast from 'react-hot-toast'

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/users')
      .then(res => setUsers(res.data.data || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [])

  const toggleActive = async (id: string) => {
    try {
      await api.patch(`/admin/users/${id}`, { action: 'toggle_active' })
      setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u))
    } catch {
      toast.error('Failed to update user')
    }
  }

  const toggleVerified = async (id: string) => {
    try {
      await api.patch(`/admin/users/${id}`, { action: 'toggle_verified' })
      setUsers(prev => prev.map(u => u.id === id ? { ...u, verified: !u.verified } : u))
    } catch {
      toast.error('Failed to update user')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-500 mt-1">Manage platform users</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            {loading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : (
              <UsersTable users={users} onToggleActive={toggleActive} onToggleVerified={toggleVerified} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
