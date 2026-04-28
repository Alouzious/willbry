import type { Product } from '../../types'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { useCart } from '../../hooks/useCart'
import { ShoppingCart } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'

interface ProductCardProps {
  product: Product
}

const categoryLabels: Record<string, string> = {
  food: 'Food',
  seeds: 'Seeds',
  digital: 'Digital',
  training: 'Training',
  consultancy: 'Consultancy',
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {product.image_url ? (
        <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-[#f0f7e8] flex items-center justify-center text-[#2d6a4f] text-4xl font-bold">
          {product.name[0]}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{categoryLabels[product.category] || product.category}</Badge>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            {product.price != null ? (
              <span className="text-lg font-bold text-[#2d6a4f]">
                {formatCurrency(product.price)}{product.unit ? `/${product.unit}` : ''}
              </span>
            ) : (
              <span className="text-sm text-gray-400">Contact for price</span>
            )}
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
