import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Only create client if Sanity is configured
export const client = projectId && projectId !== 'your-project-id'
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: any): any {
  if (!builder) {
    return {
      url: () => '',
      width: () => ({ url: () => '', height: () => ({ url: () => '' }) }),
      height: () => ({ url: () => '', width: () => ({ url: () => '' }) }),
    }
  }
  return builder.image(source)
}

// ============================================================================
// BLOG POSTS
// ============================================================================

export async function getPosts() {
  if (!client) return []
  try {
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        author,
        mainImage,
        excerpt,
        categories,
        publishedAt,
        readTime,
        seo
      }`
    )
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPost(slug: string) {
  if (!client) return null
  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        author,
        mainImage,
        excerpt,
        categories,
        publishedAt,
        readTime,
        body,
        seo
      }`,
      { slug }
    )
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// ============================================================================
// HOMEPAGE
// ============================================================================

export async function getHomepage() {
  if (!client) return null
  try {
    const homepage = await client.fetch(
      `*[_type == "homepage"][0] {
        hero,
        stats[] {
          ...,
          "iconUrl": icon.asset->url
        },
        help,
        seo {
          ...,
          "ogImageUrl": ogImage.asset->url
        }
      }`
    )
    return homepage
  } catch (error) {
    console.error('Error fetching homepage:', error)
    return null
  }
}

// ============================================================================
// CASE STUDIES
// ============================================================================

export async function getCaseStudiesFromSanity() {
  if (!client) return []
  try {
    const caseStudies = await client.fetch(
      `*[_type == "caseStudy"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        client,
        industry,
        "imageUrl": image.asset->url,
        challenge,
        solution,
        results,
        testimonial,
        publishedAt,
        seo
      }`
    )
    return caseStudies
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return []
  }
}

export async function getCaseStudyFromSanity(slug: string) {
  if (!client) return null
  try {
    const caseStudy = await client.fetch(
      `*[_type == "caseStudy" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        client,
        industry,
        "imageUrl": image.asset->url,
        challenge,
        solution,
        results,
        testimonial,
        publishedAt,
        seo
      }`,
      { slug }
    )
    return caseStudy
  } catch (error) {
    console.error('Error fetching case study:', error)
    return null
  }
}

// ============================================================================
// FAQ
// ============================================================================

export async function getFAQs() {
  if (!client) return []
  try {
    const faqs = await client.fetch(
      `*[_type == "faq"] | order(order asc) {
        _id,
        question,
        answer,
        order
      }`
    )
    return faqs
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

// ============================================================================
// HOW IT WORKS
// ============================================================================

export async function getHowItWorksSteps() {
  if (!client) return []
  try {
    const steps = await client.fetch(
      `*[_type == "howItWorks"] | order(order asc) {
        _id,
        title,
        description,
        icon,
        order
      }`
    )
    return steps
  } catch (error) {
    console.error('Error fetching how it works steps:', error)
    return []
  }
}

// ============================================================================
// PARTNERS
// ============================================================================

export async function getPartners(type?: 'official' | 'company') {
  if (!client) return []
  try {
    const query = type
      ? `*[_type == "partner" && type == $type] | order(order asc) {
          _id,
          name,
          "logoUrl": logo.asset->url,
          type,
          order,
          website
        }`
      : `*[_type == "partner"] | order(order asc) {
          _id,
          name,
          "logoUrl": logo.asset->url,
          type,
          order,
          website
        }`

    const partners = await client.fetch(query, type ? { type } : {})
    return partners
  } catch (error) {
    console.error('Error fetching partners:', error)
    return []
  }
}

// ============================================================================
// PRICING
// ============================================================================

export async function getPricing() {
  if (!client) return []
  try {
    const pricing = await client.fetch(
      `*[_type == "pricing"] | order(order asc) {
        _id,
        planName,
        currency,
        price,
        period,
        highlight,
        savingsNote,
        features,
        ctaText,
        ctaLink,
        order
      }`
    )
    return pricing
  } catch (error) {
    console.error('Error fetching pricing:', error)
    return []
  }
}

// ============================================================================
// ABOUT US
// ============================================================================

export async function getAboutUs() {
  if (!client) return null
  try {
    const aboutUs = await client.fetch(
      `*[_type == "aboutUs"][0] {
        ownerName,
        ownerRole,
        "ownerImageUrl": ownerImage.asset->url,
        sectionHeading,
        shortBio,
        extendedBio,
        missionTitle,
        missionDescription,
        coreValues[] {
          icon,
          title,
          description
        }
      }`
    )
    return aboutUs
  } catch (error) {
    console.error('Error fetching about us:', error)
    return null
  }
}

// ============================================================================
// SETTINGS
// ============================================================================

export async function getSettings() {
  if (!client) return null
  try {
    const settings = await client.fetch(
      `*[_type == "settings"][0] {
        siteName,
        tagline,
        headerCta,
        calendlySettings,
        footer,
        social,
        showFAQ,
        faqSection,
        showHowItWorks,
        howItWorksSection,
        showPricing,
        pricingSection,
        showAboutSection,
        showCaseStudies,
        showBlog,
        showAbout,
        defaultSeo {
          ...,
          "ogImageUrl": ogImage.asset->url
        }
      }`
    )
    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

// ============================================================================
// ANALYTICS
// ============================================================================

export async function getAnalytics() {
  if (!client) return null
  try {
    const analytics = await client.fetch(
      `*[_type == "analytics"][0] {
        googleAnalytics,
        googleTagManager,
        mixpanel,
        clarity,
        hotjar,
        crazyEgg,
        facebookPixel,
        linkedInInsight,
        customScripts
      }`
    )
    return analytics
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return null
  }
}

// ============================================================================
// SEO SETTINGS
// ============================================================================

export async function getSEOSettings() {
  if (!client) return null
  try {
    const seoSettings = await client.fetch(
      `*[_type == "seoSettings"][0] {
        siteName,
        siteUrl,
        defaultMetaTitle,
        defaultMetaDescription,
        "defaultOgImageUrl": defaultOgImage.asset->url,
        keywords,
        author,
        twitterHandle,
        "faviconUrl": favicon.asset->url,
        "appleTouchIconUrl": appleTouchIcon.asset->url,
        structuredData {
          ...,
          "logoUrl": logo.asset->url
        },
        searchConsole,
        robotsSettings,
        sitemapSettings
      }`
    )
    return seoSettings
  } catch (error) {
    console.error('Error fetching SEO settings:', error)
    return null
  }
}
