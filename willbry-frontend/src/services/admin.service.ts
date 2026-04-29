import api from '../lib/api'

// ── Dashboard & Analytics ────────────────────────────────
export const getAdminDashboard = async () => {
  const res = await api.get('/admin/dashboard')
  return res.data?.data ?? res.data
}

export const getAnalyticsData = async () => {
  const res = await api.get('/admin/analytics')
  return res.data?.data ?? res.data
}

// ── Users ────────────────────────────────────────────────
export const adminListUsers = async () => {
  const res = await api.get('/admin/users')
  return res.data?.data ?? res.data
}

export const adminGetUser = async (id: string) => {
  const res = await api.get(`/admin/users/${id}`)
  return res.data?.data ?? res.data
}

export interface AdminUpdateUserDto {
  role?: string
  active?: boolean
  user_type?: string
}

export const adminUpdateUser = async (id: string, dto: AdminUpdateUserDto) => {
  const res = await api.patch(`/admin/users/${id}`, dto)
  return res.data?.data ?? res.data
}

export const adminDeleteUser = async (id: string) => {
  const res = await api.delete(`/admin/users/${id}`)
  return res.data
}

// ── Orders ───────────────────────────────────────────────
export const adminListOrders = async () => {
  const res = await api.get('/admin/orders')
  return res.data?.data ?? res.data
}

export interface AdminUpdateOrderDto {
  status?: string
  admin_notes?: string
}

export const adminUpdateOrder = async (id: string, dto: AdminUpdateOrderDto) => {
  const res = await api.patch(`/admin/orders/${id}`, dto)
  return res.data?.data ?? res.data
}

// ── Products ─────────────────────────────────────────────
export const adminListProducts = async () => {
  const res = await api.get('/admin/products')
  return res.data?.data ?? res.data
}

export interface CreateProductDto {
  name: string
  slug: string
  description: string
  price?: number
  unit?: string
  category: string
  image_url?: string
  active?: boolean
}

export const createProduct = async (dto: CreateProductDto) => {
  const res = await api.post('/admin/products', dto)
  return res.data?.data ?? res.data
}

export const updateProduct = async (id: string, dto: Partial<CreateProductDto>) => {
  const res = await api.put(`/admin/products/${id}`, dto)
  return res.data?.data ?? res.data
}

export const deleteProduct = async (id: string) => {
  const res = await api.delete(`/admin/products/${id}`)
  return res.data
}

// ── Blog ─────────────────────────────────────────────────
export const adminListPosts = async () => {
  const res = await api.get('/admin/blog')
  return res.data?.data ?? res.data
}

export interface CreatePostDto {
  title: string
  slug: string
  content: string
  excerpt?: string
  category: string
  cover_image?: string
  published?: boolean
}

export const createPost = async (dto: CreatePostDto) => {
  const res = await api.post('/admin/blog', dto)
  return res.data?.data ?? res.data
}

export const updatePost = async (id: string, dto: Partial<CreatePostDto>) => {
  const res = await api.put(`/admin/blog/${id}`, dto)
  return res.data?.data ?? res.data
}

export const deletePost = async (id: string) => {
  const res = await api.delete(`/admin/blog/${id}`)
  return res.data
}

// ── Gallery ──────────────────────────────────────────────
export const adminListImages = async () => {
  const res = await api.get('/admin/gallery')
  return res.data?.data ?? res.data
}

export interface CreateImageDto {
  url: string
  caption?: string
  category: string
}

export const uploadImage = async (dto: CreateImageDto) => {
  const res = await api.post('/admin/gallery', dto)
  return res.data?.data ?? res.data
}

export const deleteImage = async (id: string) => {
  const res = await api.delete(`/admin/gallery/${id}`)
  return res.data
}

// ── Resources ────────────────────────────────────────────
export const adminListResources = async () => {
  const res = await api.get('/admin/resources')
  return res.data?.data ?? res.data
}

export interface CreateResourceDto {
  title: string
  file_url: string
  category: string
  description?: string
}

export const uploadResource = async (dto: CreateResourceDto) => {
  const res = await api.post('/admin/resources', dto)
  return res.data?.data ?? res.data
}

export const deleteResource = async (id: string) => {
  const res = await api.delete(`/admin/resources/${id}`)
  return res.data
}

// ── Farmers ──────────────────────────────────────────────
export const adminListFarmers = async () => {
  const res = await api.get('/admin/farmers')
  return res.data?.data ?? res.data
}

export interface CreateFarmerDto {
  name: string
  location: string
  district: string
  crops: string
  phone?: string
  email?: string
}

export const createFarmer = async (dto: CreateFarmerDto) => {
  const res = await api.post('/admin/farmers', dto)
  return res.data?.data ?? res.data
}

export const updateFarmer = async (id: string, dto: Partial<CreateFarmerDto> & { active?: boolean }) => {
  const res = await api.put(`/admin/farmers/${id}`, dto)
  return res.data?.data ?? res.data
}

export const deleteFarmer = async (id: string) => {
  const res = await api.delete(`/admin/farmers/${id}`)
  return res.data
}

// ── Prices ───────────────────────────────────────────────
export const adminListPrices = async () => {
  const res = await api.get('/admin/prices')
  return res.data?.data ?? res.data
}

export interface CreatePriceDto {
  commodity: string
  price_ugx: number
  unit: string
  change_percent?: number
}

export const createPrice = async (dto: CreatePriceDto) => {
  const res = await api.post('/admin/prices', dto)
  return res.data?.data ?? res.data
}

export const updatePrice = async (id: string, dto: Partial<CreatePriceDto>) => {
  const res = await api.put(`/admin/prices/${id}`, dto)
  return res.data?.data ?? res.data
}

// ── Inquiries ────────────────────────────────────────────
export const listInquiries = async () => {
  const res = await api.get('/admin/inquiries')
  return res.data?.data ?? res.data
}

export interface UpdateInquiryDto {
  read?: boolean
  replied?: boolean
}

export const markInquiryRead = async (id: string, dto: UpdateInquiryDto) => {
  const res = await api.patch(`/admin/inquiries/${id}`, dto)
  return res.data?.data ?? res.data
}

// ── AI Config ────────────────────────────────────────────
export const getAiConfig = async () => {
  const res = await api.get('/admin/ai-config')
  return res.data?.data ?? res.data
}

export interface UpdateAiConfigDto {
  system_prompt?: string
  model?: string
  language?: string
}

export const updateAiConfig = async (dto: UpdateAiConfigDto) => {
  const res = await api.put('/admin/ai-config', dto)
  return res.data?.data ?? res.data
}

// ── Bookings ─────────────────────────────────────────────
export const adminListBookings = async () => {
  const res = await api.get('/admin/bookings')
  return res.data?.data ?? res.data
}

export interface AdminUpdateBookingDto {
  status?: string
  admin_notes?: string
}

export const adminUpdateBooking = async (id: string, dto: AdminUpdateBookingDto) => {
  const res = await api.patch(`/admin/bookings/${id}`, dto)
  return res.data?.data ?? res.data
}

// ── Chat Logs ────────────────────────────────────────────
export const getAdminChatLogs = async () => {
  const res = await api.get('/admin/chat-logs')
  return res.data?.data ?? res.data
}