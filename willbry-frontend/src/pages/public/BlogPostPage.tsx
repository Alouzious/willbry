import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, UserRound } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatDate } from '../../lib/utils'
import type { BlogPost } from '../../types'

const post: BlogPost = {
  id: 'b1',
  title: 'Digital Farming Tools for Better Agricultural Decisions',
  slug: 'digital-farming-tools-better-decisions',
  content:
    'Digital agriculture is becoming one of the most important tools for improving farming decisions. For farmers in Uganda, access to the right information at the right time can reduce losses, improve productivity, and support better market planning.\n\nWillBry Agro-Innovations Platform 2.0 brings together advisory, farmer profiles, resources, market information, and AI support to create a more connected agricultural ecosystem.\n\nThe goal is not to replace farmers’ knowledge, but to strengthen it with timely data and practical support.',
  excerpt:
    'How farmer-centered digital systems can improve decisions in Uganda’s agricultural sector.',
  author_id: '1',
  author_name: 'WillBry Team',
  category: 'agri_tech',
  published: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export default function BlogPostPage() {
  const { slug } = useParams()

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="WillBry Insights"
          title={post.title}
          description={post.excerpt}
        />

        <article className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Link to="/blog">
              <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={16} />}>
                Back to blog
              </Button>
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <Badge variant="teal">{post.category.replaceAll('_', ' ')}</Badge>
              <span className="flex items-center gap-2">
                <CalendarDays size={16} className="text-willbry-teal" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <UserRound size={16} className="text-willbry-teal" />
                {post.author_name}
              </span>
            </div>

            <div className="prose prose-lg mt-10 max-w-none prose-headings:text-willbry-green-900 prose-p:leading-8 prose-a:text-willbry-green-600">
              {post.content.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-willbry-light p-6">
              <p className="text-sm font-black text-willbry-green-900">
                Reading: {slug}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Connect the backend blog endpoint later to load this post dynamically by slug.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}