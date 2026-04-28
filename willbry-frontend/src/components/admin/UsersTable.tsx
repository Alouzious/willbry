import { UserCheck, UserX } from 'lucide-react'
import type { User } from '../../types'
import { formatDate } from '../../lib/utils'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface UsersTableProps {
  users: User[]
  onToggleActive?: (user: User) => void
}

export default function UsersTable({ users, onToggleActive }: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-willbry-light">
            <tr>
              {['User', 'Type', 'Role', 'Status', 'Joined', 'Action'].map((head) => (
                <th
                  key={head}
                  className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-willbry-green-100">
            {users.map((user) => (
              <tr key={user.id} className="transition-colors hover:bg-willbry-light">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-willbry-green-500 text-sm font-black text-white">
                      {user.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-willbry-green-900">{user.full_name}</p>
                      <p className="text-xs font-medium text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <Badge variant="teal">{user.user_type}</Badge>
                </td>

                <td className="px-6 py-4">
                  <Badge variant={user.role === 'admin' ? 'orange' : 'gray'}>{user.role}</Badge>
                </td>

                <td className="px-6 py-4">
                  <Badge variant={user.active ? 'green' : 'red'} dot>
                    {user.active ? 'Active' : 'Suspended'}
                  </Badge>
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-600">
                  {formatDate(user.created_at)}
                </td>

                <td className="px-6 py-4">
                  <Button
                    size="sm"
                    variant={user.active ? 'danger' : 'secondary'}
                    leftIcon={user.active ? <UserX size={15} /> : <UserCheck size={15} />}
                    onClick={() => onToggleActive?.(user)}
                  >
                    {user.active ? 'Suspend' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!users.length && (
          <div className="p-12 text-center">
            <p className="text-sm font-semibold text-gray-500">No users found.</p>
          </div>
        )}
      </div>
    </div>
  )
}