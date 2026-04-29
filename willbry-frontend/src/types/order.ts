export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  id: string
  product_id: string
  product_name?: string
  quantity: number
  unit_price: number
}

export interface Order {
  id: string
  user_id: string
  status: OrderStatus
  total: number
  delivery_address: string
  notes?: string
  items?: OrderItem[]
  created_at: string
  updated_at: string
}

export interface CreateOrderDto {
  items: { product_id: string; quantity: number }[]
  delivery_address: string
  notes?: string
}
