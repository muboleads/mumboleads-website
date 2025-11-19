import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/ui/container'
import { getBlogPosts, BlogPost } from '@/lib/blog-data'
import { getPosts } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Lead Generation Insights & Tips',
  description: 'Expert insights on B2B lead generation, cold email strategies, and sales qualified leads. Learn from the best in the industry.',
  openGraph: {
    title: 'Blog - Lead Generation Insights & Tips | Mumbo Leads',
    description: 'Expert insights on B2B lead generation, cold email strategies, and sales qualified leads.',
  },
}

export default async function BlogPage() {
  // Try to fetch from Sanity first, fall back to placeholder data
  const sanityPosts = await getPosts()
  const fallbackPosts = getBlogPosts()

  // Use Sanity posts if available, otherwise use fallback
  const posts: BlogPost[] = sanityPosts.length > 0
    ? sanityPosts.map((post: any) => ({
        id: post._id,
        slug: post.slug.current,
        title: post.title,
        excerpt: post.excerpt,
        content: null,
        image: post.mainImage ? urlFor(post.mainImage).width(800).height(450).url() : '/media/download.jpeg',
        category: post.categories?.[0] || 'Lead Generation',
        publishedAt: post.publishedAt,
        readTime: post.readTime || '5 min read',
        author: post.author || 'Mumbo Leads Team'
      }))
    : fallbackPosts

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Container>
          {/* Header Section */}
          <div className="py-16 sm:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                B2B Lead Generation <span className="text-primary-700">Insights</span>
              </h1>
              <p className="text-lg text-gray-600">
                Expert strategies, tips, and case studies to help you generate more qualified leads
              </p>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="pb-16 sm:pb-20">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
