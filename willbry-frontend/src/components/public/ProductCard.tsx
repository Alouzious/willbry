import { ShoppingCart, ArrowRight, Package } from 'lucide-react'
import type { Product } from '../../types'
import { formatCurrency } from '../../lib/utils'
import { useCart } from '../../hooks/useCart'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface ProductCardProps {
  product: Product
  compact?: boolean
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <article className="group overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-willbry-green-50 to-willbry-light">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-willbry-green-500/10 text-willbry-green-600">
              <Package size={38} />
            </div>
          </div>
        )}

        <div className="absolute left-4 top-4">
          <Badge variant="green" size="sm">
            {product.category}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black tracking-tight text-willbry-green-900">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {product.description}
        </p>

        {!compact && (
          <div className="mt-5 flex items-center justify-between">
            <div>
              {typeof product.price === 'number' ? (
                <>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Price
                  </p>
                  <p className="text-lg font-black text-willbry-green-900">
                    {formatCurrency(product.price)}
                    {product.unit && (
                      <span className="text-sm font-medium text-gray-500"> / {product.unit}</span>
                    )}
                  </p>
                </>
              ) : (
                <p className="text-sm font-bold text-willbry-accent">Request quote</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button
            variant="primary"
            className="flex-1"
            leftIcon={<ShoppingCart size={16} />}
            onClick={() => addItem(product)}
          >
            Add
          </Button>

          <Button variant="secondary" rightIcon={<ArrowRight size={16} />}>
            Details
          </Button>
        </div>
      </div>
    </article>
  )
}