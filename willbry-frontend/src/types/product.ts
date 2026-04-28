export type ProductCategory = 'food' | 'seeds' | 'digital' | 'training' | 'consultancy'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price?: number
  unit?: string
  category: ProductCategory
  image_url?: string
  active: boolean
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}
