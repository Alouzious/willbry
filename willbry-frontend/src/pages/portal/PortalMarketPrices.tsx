import { Bot, Download, FileText, Package, ShoppingBag, TrendingDown, TrendingUp } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import AnalyticsChart from '../../components/admin/AnalyticsChart'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

const prices = [
  { commodity: 'Irish Potatoes', price: 1200, unit: 'kg', change: 8 },
  { commodity: 'Maize', price: 950, unit: 'kg', change: -3 },
  { commodity: 'Beans', price: 3200, unit: 'kg', change: 5 },
  { commodity: 'Coffee', price: 7800, unit: 'kg', change: 11 },
  { commodity: 'Sorghum', price: 1600, unit: 'kg', change: 2 },
]

const chartData = [
  { name: 'Jan', value: 900 },
  { name: 'Feb', value: 980 },
  { name: 'Mar', value: 1040 },
  { name: 'Apr', value: 1100 },
  { name: 'May', value: 1200 },
]

export default function PortalMarketPrices() {
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

          <div className="grid gap-8 xl:grid-cols-[.95fr_1.05fr]">
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
                  {prices.map((item) => {
                    const up = item.change >= 0
                    const Icon = up ? TrendingUp : TrendingDown

                    return (
                      <tr key={item.commodity} className="hover:bg-willbry-light">
                        <td className="px-6 py-4 font-black text-willbry-green-900">
                          {item.commodity}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-700">
                          UGX {item.price.toLocaleString()} / {item.unit}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={up ? 'green' : 'red'}>
                            <Icon size={13} />
                            {Math.abs(item.change)}%
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <AnalyticsChart
              title="Irish potato price trend"
              description="Indicative price movement over recent months."
              data={chartData}
              type="line"
            />
          </div>
        </div>
      </section>
    </main>
  )
}