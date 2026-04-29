import api from '../lib/api'
import type { Product, BlogPost } from '../types'

// ── Products ────────────────────────────────────────────
export const listProducts = async (): Promise<Product[]> => {
  const res = await api.get('/products')
  return res.data?.data ?? res.data
}

export const getProduct = async (slug: string): Promise<Product> => {
  const res = await api.get(`/products/${slug}`)
  return res.data?.data ?? res.data
}

// ── Blog ────────────────────────────────────────────────
export interface BlogListParams {
  page?: number
  per_page?: number
  category?: string
  search?: string
}

export interface BlogListResponse {
  data: BlogPost[]
  pagination: { page: number; per_page: number; total: number }
}

export const listPosts = async (params?: BlogListParams): Promise<BlogListResponse> => {
  const res = await api.get('/blog', { params })
  return res.data
}

export const getPost = async (slug: string): Promise<BlogPost> => {
  const res = await api.get(`/blog/${slug}`)
  return res.data?.data ?? res.data
}

// ── Gallery ─────────────────────────────────────────────
export interface GalleryImage {
  id: string
  url: string
  caption?: string
  category: string
  active: boolean
  created_at: string
}

export const listImages = async (): Promise<GalleryImage[]> => {
  const res = await api.get('/gallery')
  return res.data?.data ?? res.data
}

// ── Farmers ─────────────────────────────────────────────
export interface Farmer {
  id: string
  name: string
  location: string
  district: string
  crops: string
  phone?: string
  email?: string
  active: boolean
  created_at: string
}

export interface FarmerListParams {
  page?: number
  per_page?: number
  district?: string
  search?: string
}

export const listFarmers = async (params?: FarmerListParams): Promise<Farmer[]> => {
  const res = await api.get('/farmers', { params })
  return res.data?.data ?? res.data
}

// ── Inquiry ─────────────────────────────────────────────
export interface InquiryDto {
  name: string
  email: string
  subject: string
  message: string
}

export const submitInquiry = async (dto: InquiryDto) => {
  const res = await api.post('/inquiries', dto)
  return res.data
}

// ── Prices (public) ─────────────────────────────────────
export interface CommodityPrice {
  id: string
  commodity: string
  price_ugx: number
  unit: string
  change_percent?: number
  updated_at: string
}

export const listPrices = async (): Promise<CommodityPrice[]> => {
  const res = await api.get('/prices')
  return res.data?.data ?? res.data
}