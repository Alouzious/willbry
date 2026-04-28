import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types'
import Badge from '../ui/Badge'
import { formatDate } from '../../lib/utils'

interface BlogCardProps {
  post: BlogPost
}

const categoryLabels: Record<string, string> = {
  farming_tips: 'Farming Tips',
  company_news: 'Company News',
  agri_tech: 'Agri Tech',
  market_trends: 'Market Trends',
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="success">{categoryLabels[post.category] || post.category}</Badge>
          <span className="text-xs text-gray-400">{formatDate(post.created_at)}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
        {post.excerpt && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">By {post.author_name}</span>
          <Link
            to={`/blog/${post.slug}`}
            className="text-sm font-medium text-[#2d6a4f] hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  )
}
