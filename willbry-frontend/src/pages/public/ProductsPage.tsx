import { useMemo, useState } from 'react'
import { Filter, ShoppingCart, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import ProductCard from '../../components/public/ProductCard'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { useCart } from '../../hooks/useCart'
import { formatCurrency } from '../../lib/utils'
import { listProducts } from '../../services/public.service'
import { isAuthenticated } from '../../lib/auth'
import api from '../../lib/api'
import type { ProductCategory } from '../../types'

const categories: Array<'all' | ProductCategory> = [
  'all', 'food', 'digital', 'training', 'consultancy', 'seeds',
]

export default function ProductsPage() {
  const [active, setActive] = useState<'all' | ProductCategory>('all')
  const [cartOpen, setCartOpen] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { items, total, count, removeItem, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
    staleTime: 1000 * 60 * 10,
  })

  const filteredProducts = useMemo(() => {
    const list = Array.isArray(products) ? products : []
    return active === 'all' ? list : list.filter((p) => p.category === active)
  }, [active, products])

  const handleSubmitOrder = async () => {
    if (!isAuthenticated()) {
      toast.error('Please login to submit an order')
      navigate('/login')
      return
    }
    if (!deliveryAddress.trim()) {
      toast.error('Please enter a delivery address')
      return
    }
    setSubmitting(true)
    try {
      await api.post('/portal/orders', {
        delivery_address: deliveryAddress,
        notes: notes || undefined,
        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          unit_price: item.product.price ?? 0,
        })),
      })
      toast.success('Order submitted successfully!')
      clearCart()
      setCartOpen(false)
      setShowOrderForm(false)
      setDeliveryAddress('')
      setNotes('')
      navigate('/portal/orders')
    } catch {
      toast.error('Failed to submit order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="Marketplace"
          title="Value-added products and agricultural solutions."
          description="Explore WillBry products, training packages, and digital agriculture solutions designed for farmers, clients, and institutions."
        >
          <Button variant="accent" leftIcon={<ShoppingCart size={18} />} onClick={() => setCartOpen(true)}>
            View Cart ({count})
          </Button>
        </PageBanner>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">Shop & request quote</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-willbry-green-900">Products that connect farming to markets.</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Filter size={17} className="text-willbry-green-600" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActive(category)}
                    className={[
                      'rounded-full border px-4 py-2 text-sm font-black capitalize transition-all',
                      active === category
                        ? 'border-willbry-green-500 bg-willbry-green-500 text-white'
                        : 'border-willbry-green-100 bg-white text-willbry-green-700 hover:bg-willbry-green-50',
                    ].join(' ')}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {cartOpen && (
          <div className="fixed inset-0 z-[90]">
            <button className="absolute inset-0 bg-willbry-green-900/50 backdrop-blur-sm" onClick={() => { setCartOpen(false); setShowOrderForm(false) }} aria-label="Close cart" />
            <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-willbry-green-100 px-6 py-5">
                <div>
                  <h2 className="text-xl font-black text-willbry-green-900">Your Cart</h2>
                  <p className="text-sm text-gray-500">{count} item(s)</p>
                </div>
                <button onClick={() => { setCartOpen(false); setShowOrderForm(false) }} className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {items.length ? (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="rounded-2xl border border-willbry-green-100 p-4">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-black text-willbry-green-900">{item.product.name}</h3>
                            <Badge variant="teal" size="sm">{item.product.category}</Badge>
                          </div>
                          <button onClick={() => removeItem(item.product.id)} className="text-sm font-bold text-red-600">Remove</button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="h-8 w-8 rounded-lg border border-willbry-green-100 font-black">-</button>
                            <span className="w-8 text-center font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-8 w-8 rounded-lg border border-willbry-green-100 font-black">+</button>
                          </div>
                          <p className="font-black text-willbry-green-900">{formatCurrency((item.product.price ?? 0) * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <ShoppingCart className="h-12 w-12 text-willbry-green-300" />
                    <h3 className="mt-4 text-lg font-black text-willbry-green-900">Your cart is empty</h3>
                    <p className="mt-2 text-sm text-gray-500">Add products or request a quote to begin.</p>
                  </div>
                )}

                {showOrderForm && items.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-willbry-green-100 bg-willbry-light p-4">
                    <h3 className="mb-4 font-black text-willbry-green-900">Delivery details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-600">Delivery address *</label>
                        <textarea rows={2} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-willbry-teal focus:outline-none" placeholder="e.g. Kijuguta, Kabale Municipality" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-600">Notes (optional)</label>
                        <textarea rows={2} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-willbry-teal focus:outline-none" placeholder="Any special instructions..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-willbry-green-100 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-bold text-gray-600">Total</span>
                  <span className="text-2xl font-black text-willbry-green-900">{formatCurrency(total)}</span>
                </div>
                <div className="grid gap-3">
                  {!showOrderForm ? (
                    <Button disabled={!items.length} onClick={() => { if (!isAuthenticated()) { toast.error('Please login to submit an order'); navigate('/login'); return; } setShowOrderForm(true) }}>
                      Submit Order Request
                    </Button>
                  ) : (
                    <Button disabled={submitting || !deliveryAddress.trim()} onClick={handleSubmitOrder}>
                      {submitting ? 'Submitting...' : 'Confirm Order'}
                    </Button>
                  )}
                  <Button variant="secondary" onClick={clearCart} disabled={!items.length}>Clear Cart</Button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}