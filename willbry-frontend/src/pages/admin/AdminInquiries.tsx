import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import api from '../../lib/api'
import toast from 'react-hot-toast'
import { Mail, Trash2, CheckCheck } from 'lucide-react'
import { formatDate } from '../../lib/utils'

interface Inquiry {
  id: string
  full_name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Inquiry | null>(null)

  useEffect(() => {
    api.get('/admin/inquiries')
      .then(res => setInquiries(res.data.data || []))
      .catch(() => setInquiries([]))
      .finally(() => setLoading(false))
  }, [])

  const markRead = async (id: string) => {
    try {
      await api.patch(`/admin/inquiries/${id}`, { read: true })
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, read: true } : i))
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, read: true } : null)
    } catch {
      toast.error('Failed to update inquiry')
    }
  }

  const remove = async (id: string) => {
    try {
      await api.delete(`/admin/inquiries/${id}`)
      setInquiries(prev => prev.filter(i => i.id !== id))
      if (selected?.id === id) setSelected(null)
      toast.success('Inquiry deleted')
    } catch {
      toast.error('Failed to delete inquiry')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-2 bg-[#2d6a4f]/10 rounded-xl">
              <Mail className="h-6 w-6 text-[#2d6a4f]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
              <p className="text-gray-500 mt-0.5">Contact form submissions from visitors</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {loading ? (
                <div className="flex justify-center py-20"><Spinner size="lg" /></div>
              ) : inquiries.length === 0 ? (
                <p className="text-center py-16 text-gray-400 text-sm">No inquiries yet</p>
              ) : (
                <ul>
                  {inquiries.map(inq => (
                    <li
                      key={inq.id}
                      onClick={() => setSelected(inq)}
                      className={`px-4 py-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === inq.id ? 'bg-[#2d6a4f]/5 border-l-2 border-l-[#2d6a4f]' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`text-sm font-medium ${inq.read ? 'text-gray-600' : 'text-gray-900'}`}>{inq.full_name}</p>
                        {!inq.read && <Badge variant="info">New</Badge>}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{inq.subject}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(inq.created_at)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              {selected ? (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="font-semibold text-gray-900">{selected.subject}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        From: <span className="font-medium">{selected.full_name}</span> &lt;{selected.email}&gt;
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(selected.created_at)}</p>
                    </div>
                    <div className="flex gap-2">
                      {!selected.read && (
                        <button
                          onClick={() => markRead(selected.id)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#2d6a4f]/5 transition-colors"
                        >
                          <CheckCheck className="h-3.5 w-3.5" /> Mark read
                        </button>
                      )}
                      <button
                        onClick={() => remove(selected.id)}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                  <Mail className="h-10 w-10 mb-3 opacity-30" />
                  <p className="text-sm">Select an inquiry to read it</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
