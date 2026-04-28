import { format, formatDistanceToNow } from 'date-fns'

export const formatDate = (date: string) =>
  format(new Date(date), 'MMM dd, yyyy')

export const formatDateLong = (date: string) =>
  format(new Date(date), 'MMMM dd, yyyy')

export const timeAgo = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true })

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
  }).format(amount)

export const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

export const truncate = (text: string, length: number) =>
  text.length > length ? text.substring(0, length) + '...' : text

export const getInitials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

export const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ')
