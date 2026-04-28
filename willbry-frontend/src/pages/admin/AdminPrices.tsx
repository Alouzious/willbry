import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import Spinner from '../../components/ui/Spinner'
import api from '../../lib/api'
import toast from 'react-hot-toast'
import { TrendingUp, Edit2, Check, X } from 'lucide-react'
import { formatDate } from '../../lib/utils'

interface MarketPrice {
  id: string
  commodity: string
  unit: string
  price: number
  market: string
  updated_at: string
}

export default function AdminPrices() {
  const [prices, setPrices] = useState<MarketPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>('')

  useEffect(() => {
    api.get('/admin/prices')
      .then(res => setPrices(res.data.data || []))
      .catch(() => setPrices([]))
      .finally(() => setLoading(false))
  }, [])

  const startEdit = (p: MarketPrice) => {
    setEditingId(p.id)
    setEditValue(String(p.price))
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const saveEdit = async (id: string) => {
    const parsed = parseFloat(editValue)
    if (isNaN(parsed) || parsed <= 0) {
      toast.error('Enter a valid price')
      return
    }
    try {
      await api.patch(`/admin/prices/${id}`, { price: parsed })
      setPrices(prev => prev.map(p => p.id === id ? { ...p, price: parsed, updated_at: new Date().toISOString() } : p))
      toast.success('Price updated')
      cancelEdit()
    } catch {
      toast.error('Failed to update price')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-2 bg-[#2d6a4f]/10 rounded-xl">
              <TrendingUp className="h-6 w-6 text-[#2d6a4f]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Market Prices</h1>
              <p className="text-gray-500 mt-0.5">Update commodity prices for the portal</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Commodity</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Market</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Unit</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Price (KES)</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Last Updated</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-16 text-gray-400">No price data available</td>
                    </tr>
                  ) : prices.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{p.commodity}</td>
                      <td className="px-6 py-4 text-gray-600">{p.market}</td>
                      <td className="px-6 py-4 text-gray-600">{p.unit}</td>
                      <td className="px-6 py-4">
                        {editingId === p.id ? (
                          <input
                            type="number"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            className="w-28 px-2 py-1 text-sm rounded-lg border border-[#2d6a4f] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                            autoFocus
                          />
                        ) : (
                          <span className="font-semibold text-[#2d6a4f]">{p.price.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">{formatDate(p.updated_at)}</td>
                      <td className="px-6 py-4">
                        {editingId === p.id ? (
                          <div className="flex gap-1">
                            <button onClick={() => saveEdit(p.id)} className="p-1.5 rounded-lg bg-[#2d6a4f] text-white hover:bg-[#245a40] transition-colors">
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button onClick={cancelEdit} className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => startEdit(p)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                            <Edit2 className="h-3.5 w-3.5" /> Edit
                          </button>
                        )}
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
