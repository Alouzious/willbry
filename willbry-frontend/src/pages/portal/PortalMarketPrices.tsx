import { useEffect, useState } from 'react'
import { Bot, Download, FileText, Package, ShoppingBag, TrendingDown, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import { getMarketPrices } from '../../services/portal.service'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

export default function PortalMarketPrices() {
  const [prices, setPrices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMarketPrices()
        setPrices(Array.isArray(data) ? data : [])
      } catch {
        toast.error('Failed to load market prices')
      } finally {
        setLoading(false)
      }
    }
    void load()
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
            <p className="text-sm text-gray-500">Loading prices…</p>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
              <table className="w-full text-left">
                <thead className="bg-willbry-light">
                  <tr>
                    {['Commodity', 'Price (UGX)', 'Unit', 'Trend'].map((head) => (
                      <th key={head} className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-willbry-green-100">
                  {prices.map((item) => {
                    const change = item.change_percent ?? 0
                    const up = change >= 0
                    const Icon = up ? TrendingUp : TrendingDown
                    return (
                      <tr key={item.id} className="hover:bg-willbry-light">
                        <td className="px-6 py-4 font-black text-willbry-green-900">{item.commodity}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-700">
                          {item.price_ugx.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-600">{item.unit}</td>
                        <td className="px-6 py-4">
                          <Badge variant={up ? 'green' : 'red'}>
                            <Icon size={13} />
                            {Math.abs(change)}%
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}