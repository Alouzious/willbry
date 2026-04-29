import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem } from '../types'

interface CartStore {
  items: CartItem[]
  count: number
  total: number
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const calcCount = (items: CartItem[]) => items.reduce((n, i) => n + i.quantity, 0)
const calcTotal = (items: CartItem[]) =>
  items.reduce((t, i) => t + (i.product.price ?? 0) * i.quantity, 0)

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      count: 0,
      total: 0,
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          const items = existing
            ? state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            : [...state.items, { product, quantity: 1 }]
          return { items, count: calcCount(items), total: calcTotal(items) }
        }),
      removeItem: (productId) =>
        set((state) => {
          const items = state.items.filter((i) => i.product.id !== productId)
          return { items, count: calcCount(items), total: calcTotal(items) }
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const items =
            quantity <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i
                )
          return { items, count: calcCount(items), total: calcTotal(items) }
        }),
      clearCart: () => set({ items: [], count: 0, total: 0 }),
    }),
    { name: 'willbry-cart' }
  )
)

export function useCart() {
  return useCartStore()
}

export default useCart