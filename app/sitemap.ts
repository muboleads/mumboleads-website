import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mumboleads.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Fetch blog posts
  let blogPosts: MetadataRoute.Sitemap = []
  if (client) {
    try {
      const posts = await client.fetch(
        `*[_type == "post"] {
          "slug": slug.current,
          publishedAt,
          _updatedAt
        }`
      )

      blogPosts = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt || post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    } catch (error) {
      console.error('Error fetching posts for sitemap:', error)
    }
  }

  // Fetch case studies
  let caseStudies: MetadataRoute.Sitemap = []
  if (client) {
    try {
      const studies = await client.fetch(
        `*[_type == "caseStudy"] {
          "slug": slug.current,
          publishedAt,
          _updatedAt
        }`
      )

      caseStudies = studies.map((study: any) => ({
        url: `${baseUrl}/case-studies/${study.slug}`,
        lastModified: new Date(study._updatedAt || study.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    } catch (error) {
      console.error('Error fetching case studies for sitemap:', error)
    }
  }

  // Add blog index if there are posts
  if (blogPosts.length > 0) {
    staticPages.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  // Add case studies index if there are studies
  if (caseStudies.length > 0) {
    staticPages.push({
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  return [...staticPages, ...blogPosts, ...caseStudies]
}
