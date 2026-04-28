import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import PricesTable from '../../components/portal/PricesTable'
import Spinner from '../../components/ui/Spinner'
import api from '../../lib/api'
import { RefreshCw } from 'lucide-react'

interface PriceItem {
  commodity: string
  price: number
  unit: string
  change: number
}

export default function PortalMarketPrices() {
  const [prices, setPrices] = useState<PriceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchPrices = () => {
    setLoading(true)
    api.get('/prices')
      .then(res => {
        setPrices(res.data.data || [])
        setLastUpdated(new Date().toLocaleTimeString())
      })
      .catch(() => setPrices([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchPrices() }, [])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="portal" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Market Prices</h1>
              {lastUpdated && <p className="text-gray-500 text-sm mt-1">Last updated: {lastUpdated}</p>}
            </div>
            <button
              onClick={fetchPrices}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#2d6a4f] hover:underline"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            {loading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : (
              <PricesTable prices={prices} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
