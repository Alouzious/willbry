import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, UserRound } from 'lucide-react'
import type { BlogPost } from '../../types'
import { formatDate } from '../../lib/utils'
import { Badge } from '../ui/Badge'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-willbry-green-50 to-willbry-light">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-8 text-center">
              <p className="text-2xl font-black text-willbry-green-700">
                WillBry Insights
              </p>
            </div>
          )}

          <div className="absolute left-4 top-4">
            <Badge variant="teal" size="sm">
              {post.category.replaceAll('_', ' ')}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} className="text-willbry-teal" />
            {formatDate(post.created_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <UserRound size={14} className="text-willbry-teal" />
            {post.author_name}
          </span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-black tracking-tight text-willbry-green-900 transition-colors group-hover:text-willbry-green-600">
            {post.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.excerpt || post.content}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-black text-willbry-green-600 transition-all hover:gap-3"
        >
          Read article
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}