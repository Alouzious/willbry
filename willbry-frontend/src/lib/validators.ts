import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  full_name: z.string().min(2, 'Full name is required').max(100),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string(),
  user_type: z.enum(['farmer', 'client', 'partner']),
}).refine((d) => d.password === d.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const orderSchema = z.object({
  delivery_address: z.string().min(5, 'Delivery address is required'),
  notes: z.string().optional(),
})

export const bookingSchema = z.object({
  service_type: z.string().min(2, 'Service type is required'),
  preferred_date: z.string().min(1, 'Preferred date is required'),
  description: z.string().min(10, 'Please describe your needs'),
})

export const farmProfileSchema = z.object({
  district: z.string().min(2, 'District is required'),
  size_acres: z.number().positive('Size must be positive'),
  main_crops: z.string().min(2, 'List at least one crop'),
  irrigation_type: z.string().optional(),
})

export const cropLogSchema = z.object({
  crop: z.string().min(2, 'Crop name is required'),
  planted_date: z.string().min(1, 'Planted date is required'),
  expected_harvest: z.string().min(1, 'Expected harvest date is required'),
  yield_kg: z.number().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type OrderInput = z.infer<typeof orderSchema>
export type BookingInput = z.infer<typeof bookingSchema>
export type FarmProfileInput = z.infer<typeof farmProfileSchema>
export type CropLogInput = z.infer<typeof cropLogSchema>