import type { Metadata } from 'next'
import { getSalesCourse, getAboutUs, getSettings } from '@/lib/sanity'
import { CourseLanding } from '@/components/sections/course-landing'
import Script from 'next/script'
import './course.css'

// Default values for SEO
const defaults = {
  title: 'Cold Email Mastery Course | Grow Your B2B Business',
  description: 'Learn the exact cold email system that has generated $16.5M+ in sales pipeline. 8 modules, lifetime access, certificate included.',
  keywords: ['cold email', 'B2B sales', 'lead generation', 'email marketing', 'cold outreach', 'sales course'],
  ogImage: '/media/proof/xxx.png', // Fallback to hero proof image
  siteName: 'Mumbo Education',
  siteUrl: 'https://mumboleads.com',
}

export async function generateMetadata(): Promise<Metadata> {
  const [course, settings] = await Promise.all([
    getSalesCourse(),
    getSettings(),
  ])

  const seo = course?.seo || {}
  const siteName = settings?.siteName || defaults.siteName
  const siteUrl = settings?.defaultSeo?.siteUrl || defaults.siteUrl

  // Titles with fallbacks
  const metaTitle = seo.metaTitle || defaults.title
  const ogTitle = seo.ogTitle || metaTitle
  const twitterTitle = seo.twitterTitle || ogTitle

  // Descriptions with fallbacks
  const metaDescription = seo.metaDescription || defaults.description
  const ogDescription = seo.ogDescription || metaDescription
  const twitterDescription = seo.twitterDescription || ogDescription

  // Images with fallbacks
  const ogImageUrl = seo.ogImageUrl || `${siteUrl}${defaults.ogImage}`
  const twitterImageUrl = seo.twitterImageUrl || ogImageUrl

  // Keywords
  const keywords = seo.metaKeywords?.length ? seo.metaKeywords : defaults.keywords

  // Canonical URL
  const canonicalUrl = seo.canonicalUrl || `${siteUrl}/course`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    authors: [{ name: course?.instructor?.name || 'Hopewell Mkhize' }],
    creator: course?.instructor?.name || 'Hopewell Mkhize',
    publisher: siteName,

    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },

    // Robots
    robots: seo.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: siteName,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
          type: 'image/png',
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: (seo.twitterCard as 'summary_large_image' | 'summary') || 'summary_large_image',
      site: seo.twitterCreator || '@mumboleads',
      creator: seo.twitterCreator || '@mumboleads',
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImageUrl],
    },

    // Additional meta tags
    other: {
      'og:price:amount': course?.pricing?.salePrice?.replace(/[^0-9]/g, '') || '1999',
      'og:price:currency': 'ZAR',
      'product:price:amount': course?.pricing?.salePrice?.replace(/[^0-9]/g, '') || '1999',
      'product:price:currency': 'ZAR',
    },
  }
}

// JSON-LD Structured Data for Course
function generateCourseJsonLd(course: any, instructorImageUrl?: string) {
  const siteUrl = 'https://mumboleads.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course?.seo?.metaTitle || defaults.title,
    description: course?.seo?.metaDescription || defaults.description,
    url: `${siteUrl}/course`,
    image: course?.seo?.ogImageUrl || `${siteUrl}${defaults.ogImage}`,

    provider: {
      '@type': 'Organization',
      name: 'Mumbo Education',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
    },

    instructor: {
      '@type': 'Person',
      name: course?.instructor?.name || 'Hopewell Mkhize',
      jobTitle: course?.instructor?.title || 'Managing Director @ Mumbo Education',
      image: instructorImageUrl,
      description: course?.instructor?.bio,
    },

    // Course details
    courseCode: 'COLD-EMAIL-101',
    numberOfCredits: '8',
    educationalCredentialAwarded: 'Certificate of Completion',

    // Pricing
    offers: {
      '@type': 'Offer',
      price: course?.pricing?.salePrice?.replace(/[^0-9]/g, '') || '1999',
      priceCurrency: 'ZAR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      url: course?.hero?.ctaUrl || `${siteUrl}/course`,
    },

    // Course structure
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT5H', // 5 hours
      instructor: {
        '@type': 'Person',
        name: course?.instructor?.name || 'Hopewell Mkhize',
      },
    },

    // Syllabus from modules
    syllabusSections: course?.modules?.moduleList?.map((module: any, index: number) => ({
      '@type': 'Syllabus',
      name: module.title,
      position: index + 1,
    })) || [],

    // Aggregate rating (from testimonials)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '500',
      reviewCount: course?.testimonials?.items?.length || 3,
    },

    // Reviews from testimonials
    review: course?.testimonials?.items?.map((t: any) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name,
      },
      reviewBody: t.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
    })) || [],
  }
}

// FAQ Structured Data
function generateFaqJsonLd(course: any) {
  if (!course?.faq?.items?.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faq.items.map((item: any) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// Breadcrumb Structured Data
function generateBreadcrumbJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mumboleads.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cold Email Course',
        item: 'https://mumboleads.com/course',
      },
    ],
  }
}

export default async function CoursePage() {
  const [course, aboutUs] = await Promise.all([
    getSalesCourse(),
    getAboutUs(),
  ])

  const courseJsonLd = generateCourseJsonLd(course, aboutUs?.ownerImageUrl)
  const faqJsonLd = generateFaqJsonLd(course)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd()

  return (
    <>
      {/* Course Structured Data */}
      <Script
        id="course-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* FAQ Structured Data */}
      {faqJsonLd && (
        <Script
          id="faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumb Structured Data */}
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <CourseLanding data={course} instructorImageUrl={aboutUs?.ownerImageUrl} />
    </>
  )
}
