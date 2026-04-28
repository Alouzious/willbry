import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import api from '../../lib/api'
import toast from 'react-hot-toast'
import type { User } from '../../types'
import { Search, CheckCircle, XCircle, Leaf } from 'lucide-react'

export default function AdminFarmers() {
  const [farmers, setFarmers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/admin/users?user_type=farmer')
      .then(res => setFarmers(res.data.data || []))
      .catch(() => setFarmers([]))
      .finally(() => setLoading(false))
  }, [])

  const toggleVerified = async (id: string) => {
    try {
      await api.patch(`/admin/users/${id}`, { action: 'toggle_verified' })
      setFarmers(prev => prev.map(f => f.id === id ? { ...f, verified: !f.verified } : f))
      toast.success('Farmer verification updated')
    } catch {
      toast.error('Failed to update farmer')
    }
  }

  const filtered = farmers.filter(f =>
    f.full_name.toLowerCase().includes(search.toLowerCase()) ||
    f.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-2 bg-[#2d6a4f]/10 rounded-xl">
              <Leaf className="h-6 w-6 text-[#2d6a4f]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Farmers</h1>
              <p className="text-gray-500 mt-0.5">Manage and verify registered farmers</p>
            </div>
          </div>

          <div className="mb-4 relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search farmers…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Name</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Email</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Phone</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-16 text-gray-400">No farmers found</td>
                    </tr>
                  ) : filtered.map(farmer => (
                    <tr key={farmer.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{farmer.full_name}</td>
                      <td className="px-6 py-4 text-gray-600">{farmer.email}</td>
                      <td className="px-6 py-4 text-gray-600">{farmer.phone || '—'}</td>
                      <td className="px-6 py-4">
                        <Badge variant={farmer.verified ? 'success' : 'warning'}>
                          {farmer.verified ? 'Verified' : 'Pending'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleVerified(farmer.id)}
                          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
                        >
                          {farmer.verified
                            ? <><XCircle className="h-4 w-4 text-red-500" /> Revoke</>
                            : <><CheckCircle className="h-4 w-4 text-[#2d6a4f]" /> Verify</>
                          }
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
