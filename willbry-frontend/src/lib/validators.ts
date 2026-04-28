import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z
  .object({
    full_name: z.string().min(2, 'Full name is required').max(100),
    email: z.string().email('Enter a valid email address'),
    phone: z.string().min(7, 'Phone number is required').optional().or(z.literal('')),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string().min(8, 'Confirm your password'),
    user_type: z.enum(['farmer', 'client', 'partner']),
  })
  .refine((data) => data.password === data.confirm_password, {
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

export const inquirySchema = contactSchema

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
  size_acres: z.coerce.number().positive('Farm size must be greater than zero'),
  crops: z.string().min(2, 'List at least one crop'),
  irrigation: z.string().optional(),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().min(10, 'Description is required'),
  price: z.coerce.number().optional(),
  unit: z.string().optional(),
  category: z.enum(['food', 'seeds', 'digital', 'training', 'consultancy']),
  image_url: z.string().optional(),
  active: z.boolean().default(true),
})

export const blogSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  excerpt: z.string().optional(),
  content: z.string().min(20, 'Content is too short'),
  category: z.enum(['farming_tips', 'company_news', 'agri_tech', 'market_trends']),
  cover_image: z.string().optional(),
  published: z.boolean().default(false),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type OrderInput = z.infer<typeof orderSchema>
export type BookingInput = z.infer<typeof bookingSchema>
export type FarmProfileInput = z.infer<typeof farmProfileSchema>
export type ProductInput = z.infer<typeof productSchema>
export type BlogInput = z.infer<typeof blogSchema>