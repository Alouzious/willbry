import type { User } from '../../types'
import Badge from '../ui/Badge'
import { formatDate } from '../../lib/utils'
import { UserCheck, UserX, CheckCircle, XCircle } from 'lucide-react'

interface UsersTableProps {
  users: User[]
  onToggleActive: (id: string) => void
  onToggleVerified: (id: string) => void
}

export default function UsersTable({ users, onToggleActive, onToggleVerified }: UsersTableProps) {
  if (!users.length) {
    return <div className="text-center py-12 text-gray-500">No users found.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left">
            <th className="py-3 px-4 font-semibold text-gray-600">Name</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Email</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Type</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Joined</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-medium text-gray-900">{u.full_name}</td>
              <td className="py-3 px-4 text-gray-600">{u.email}</td>
              <td className="py-3 px-4">
                <Badge variant="info">{u.user_type}</Badge>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <Badge variant={u.active ? 'success' : 'error'}>{u.active ? 'Active' : 'Inactive'}</Badge>
                  {u.verified && <Badge variant="success">Verified</Badge>}
                </div>
              </td>
              <td className="py-3 px-4 text-gray-500">{formatDate(u.created_at)}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleActive(u.id)}
                    title={u.active ? 'Deactivate' : 'Activate'}
                    className="text-gray-400 hover:text-[#2d6a4f] transition-colors"
                  >
                    {u.active ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => onToggleVerified(u.id)}
                    title={u.verified ? 'Unverify' : 'Verify'}
                    className="text-gray-400 hover:text-[#2d6a4f] transition-colors"
                  >
                    {u.verified ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
