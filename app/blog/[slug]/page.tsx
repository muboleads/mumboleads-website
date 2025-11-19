import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/ui/container'
import { getBlogPost } from '@/lib/blog-data'
import { getPost } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PortableText } from '@portabletext/react'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Try Sanity first, fall back to placeholder data
  const sanityPost = await getPost(params.slug)
  const fallbackPost = getBlogPost(params.slug)

  if (!sanityPost && !fallbackPost) {
    notFound()
  }

  // Map Sanity post to expected format
  const post = sanityPost
    ? {
        title: sanityPost.title,
        excerpt: sanityPost.excerpt,
        image: sanityPost.mainImage ? urlFor(sanityPost.mainImage).width(1200).height(630).url() : '/media/download.jpeg',
        category: sanityPost.categories?.[0] || 'Lead Generation',
        publishedAt: sanityPost.publishedAt,
        readTime: sanityPost.readTime || '5 min read',
        author: sanityPost.author || 'Mumbo LEADS Team',
        content: null, // Sanity uses body (Portable Text)
        body: sanityPost.body // Portable Text content
      }
    : fallbackPost

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <article>
          {/* Hero Section */}
          <div className="relative bg-gray-50 py-16 sm:py-20">
            <Container>
              <div className="max-w-4xl mx-auto">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-600 transition-colors mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>

                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded-full">
                    {post.category}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  {post.title}
                </h1>

                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video max-w-5xl mx-auto -mt-8 mb-12 px-4">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-100 to-primary-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <Container>
            <div className="max-w-3xl mx-auto pb-16">
              <div className="text-xl text-gray-600 leading-relaxed mb-12 italic border-l-4 border-primary-600 pl-6">
                {post.excerpt}
              </div>

              <div className="prose prose-lg max-w-none">
                {post.body ? (
                  // Render Sanity Portable Text
                  <PortableText
                    value={post.body}
                    components={{
                      block: {
                        h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-4 text-gray-900">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-900">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-3 text-gray-900">{children}</h3>,
                        normal: ({ children }) => <p className="text-lg text-gray-700 leading-relaxed mb-6">{children}</p>,
                      },
                      list: {
                        bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6 ml-4">{children}</ul>,
                        number: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">{children}</ol>,
                      },
                      listItem: {
                        bullet: ({ children }) => <li className="text-lg text-gray-700 mb-2">{children}</li>,
                        number: ({ children }) => <li className="text-lg text-gray-700 mb-2">{children}</li>,
                      },
                      marks: {
                        strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                        link: ({ children, value }) => (
                          <a href={value.href} className="text-primary-700 hover:text-primary-600 underline">
                            {children}
                          </a>
                        ),
                        code: ({ children }) => <code className="bg-gray-100 rounded px-2 py-1 text-sm font-mono">{children}</code>,
                      },
                    }}
                  />
                ) : (
                  // Render markdown for fallback content
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-12 mb-4 text-gray-900" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-900" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-8 mb-3 text-gray-900" {...props} />,
                      p: ({ node, ...props }) => <p className="text-lg text-gray-700 leading-relaxed mb-6" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-6 ml-4" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-6 ml-4" {...props} />,
                      li: ({ node, ...props }) => <li className="text-lg text-gray-700 mb-2" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                      a: ({ node, ...props }) => <a className="text-primary-700 hover:text-primary-600 underline" {...props} />,
                      code: ({ node, ...props }) => <code className="bg-gray-100 rounded px-2 py-1 text-sm font-mono" {...props} />,
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                )}
              </div>

              {/* CTA */}
              <section className="mt-12 bg-gradient-to-br from-primary-700 to-primary-800 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Want to implement these strategies?
                </h3>
                <p className="text-lg mb-6 text-white/90">
                  Let&apos;s discuss how we can help you generate more qualified leads for your business.
                </p>
                <Link
                  href="/#book-call"
                  className="inline-flex items-center justify-center rounded-full bg-white text-primary-700 px-8 py-3 text-base font-semibold shadow-lg transition-all duration-200 hover:bg-gray-100"
                >
                  Book a Consultation
                </Link>
              </section>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  )
}
