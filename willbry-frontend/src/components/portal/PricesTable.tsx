import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'

interface PriceItem {
  commodity: string
  price: number
  unit: string
  change: number
}

interface PricesTableProps {
  prices: PriceItem[]
}

export default function PricesTable({ prices }: PricesTableProps) {
  if (!prices.length) {
    return <div className="text-center py-12 text-gray-500">No price data available.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left">
            <th className="py-3 px-4 font-semibold text-gray-600">Commodity</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Price</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Unit</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Change</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-medium text-gray-900">{p.commodity}</td>
              <td className="py-3 px-4 text-gray-700">{formatCurrency(p.price)}</td>
              <td className="py-3 px-4 text-gray-500">/{p.unit}</td>
              <td className="py-3 px-4">
                <div className={`flex items-center gap-1 text-xs font-medium ${p.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {p.change >= 0
                    ? <TrendingUp className="h-3.5 w-3.5" />
                    : <TrendingDown className="h-3.5 w-3.5" />
                  }
                  {Math.abs(p.change)}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
