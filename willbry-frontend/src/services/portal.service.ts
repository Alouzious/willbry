import api from '../lib/api'

// ── Dashboard ────────────────────────────────────────────
export interface PortalDashboardData {
  total_orders: number
  pending_orders: number
  ai_chats_total: number
  bookings: number
}

export const getPortalDashboard = async (): Promise<PortalDashboardData> => {
  const res = await api.get('/portal/dashboard')
  return res.data?.data ?? res.data
}

// ── Profile ──────────────────────────────────────────────
export interface UpdateProfileDto {
  full_name?: string
  phone?: string
  profile_photo?: string
}

export const getProfile = async () => {
  const res = await api.get('/portal/profile')
  return res.data?.data ?? res.data
}

export const updateProfile = async (dto: UpdateProfileDto) => {
  const res = await api.put('/portal/profile', dto)
  return res.data?.data ?? res.data
}

// ── Orders ───────────────────────────────────────────────
export interface OrderItemRequest {
  product_id: string
  quantity: number
  unit_price: number
}

export interface PlaceOrderDto {
  delivery_address: string
  notes?: string
  items: OrderItemRequest[]
}

export const listMyOrders = async () => {
  const res = await api.get('/portal/orders')
  return res.data?.data ?? res.data
}

export const getOrder = async (id: string) => {
  const res = await api.get(`/portal/orders/${id}`)
  return res.data?.data ?? res.data
}

export const placeOrder = async (dto: PlaceOrderDto) => {
  const res = await api.post('/portal/orders', dto)
  return res.data?.data ?? res.data
}

export const cancelOrder = async (id: string) => {
  const res = await api.patch(`/portal/orders/${id}`, {})
  return res.data
}

// ── Bookings ─────────────────────────────────────────────
export interface CreateBookingDto {
  service_type: string
  preferred_date?: string
  description: string
}

export const listMyBookings = async () => {
  const res = await api.get('/portal/bookings')
  return res.data?.data ?? res.data
}

export const createBooking = async (dto: CreateBookingDto) => {
  const res = await api.post('/portal/bookings', dto)
  return res.data?.data ?? res.data
}

// ── Farm Profile ─────────────────────────────────────────
export interface UpsertFarmProfileDto {
  district: string
  size_acres?: number
  crops: string
  irrigation?: string
}

export const getFarmProfile = async () => {
  const res = await api.get('/portal/farm-profile')
  return res.data?.data ?? res.data
}

export const upsertFarmProfile = async (dto: UpsertFarmProfileDto) => {
  const res = await api.put('/portal/farm-profile', dto)
  return res.data?.data ?? res.data
}

export const listCropLogs = async () => {
  const res = await api.get('/portal/crop-logs')
  return res.data?.data ?? res.data
}

export interface CreateCropLogDto {
  crop: string
  planted_date?: string
  expected_harvest?: string
  actual_harvest?: string
  yield_kg?: number
  notes?: string
}

export const createCropLog = async (dto: CreateCropLogDto) => {
  const res = await api.post('/portal/crop-logs', dto)
  return res.data?.data ?? res.data
}

// ── Resources ────────────────────────────────────────────
export const listResources = async () => {
  const res = await api.get('/portal/resources')
  return res.data?.data ?? res.data
}

export const getDownloadUrl = async (id: string) => {
  const res = await api.get(`/portal/resources/${id}/download`)
  return res.data?.download_url as string
}

// ── Market Prices (portal alias) ─────────────────────────
export const getMarketPrices = async () => {
  const res = await api.get('/portal/market-prices')
  return res.data?.data ?? res.data
}