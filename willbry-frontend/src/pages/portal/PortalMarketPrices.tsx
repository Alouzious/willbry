import { useEffect, useState } from 'react'
import { Bot, Download, FileText, Loader2, Package, ShoppingBag, TrendingDown, TrendingUp } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import api from '../../lib/api'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

interface CommodityPrice {
  id: string
  commodity: string
  price_ugx: number
  unit: string
  change_percent: number | null
}

export default function PortalMarketPrices() {
  const [prices, setPrices] = useState<CommodityPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.get('/portal/market-prices')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setPrices(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load market prices. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={portalItems} title="Farmer Portal" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Market prices
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Commodity price intelligence
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Track indicative prices for key agricultural commodities and plan better market decisions.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-dashed border-red-200 bg-red-50 p-12 text-center">
              <p className="font-black text-red-700">{error}</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
              <table className="w-full text-left">
                <thead className="bg-willbry-light">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                      Commodity
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                      Price
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                      Trend
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-willbry-green-100">
                  {prices.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-sm text-gray-500">
                        No price data available yet.
                      </td>
                    </tr>
                  ) : (
                    prices.map((item) => {
                      const change = item.change_percent ?? 0
                      const up = change >= 0
                      const Icon = up ? TrendingUp : TrendingDown

                      return (
                        <tr key={item.id} className="hover:bg-willbry-light">
                          <td className="px-6 py-4 font-black text-willbry-green-900">
                            {item.commodity}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-gray-700">
                            UGX {item.price_ugx.toLocaleString()} / {item.unit}
                          </td>
                          <td className="px-6 py-4">
                            {item.change_percent != null ? (
                              <Badge variant={up ? 'green' : 'red'}>
                                <Icon size={13} />
                                {Math.abs(change)}%
                              </Badge>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
