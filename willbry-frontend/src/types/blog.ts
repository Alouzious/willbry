export type BlogCategory = 'farming_tips' | 'company_news' | 'agri_tech' | 'market_trends'

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  author_id: string
  author_name?: string
  category: BlogCategory
  cover_image?: string
  published: boolean
  created_at: string
  updated_at: string
}
