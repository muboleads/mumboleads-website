import type { Metadata } from 'next'
import { getTourismLanding, getSettings, getPartners } from '@/lib/sanity'
import { TourismLanding } from '@/components/sections/tourism-landing'
import Script from 'next/script'
import './tourism.css'

// Default values for SEO
const defaults = {
  title: 'Tourism & Hospitality Lead Generation | Get Direct Bookings',
  description: 'Fill your rooms with qualified guests. Our B2C lead generation system delivers direct bookings for hotels, lodges, guest houses, and tour operators across South Africa.',
  keywords: ['tourism marketing', 'hotel lead generation', 'direct bookings', 'hospitality marketing', 'lodge marketing', 'guest house marketing', 'South Africa tourism'],
  ogImage: '/media/proof/DAAS.png',
  siteName: 'Mumbo Leads',
  siteUrl: 'https://mumboleads.com',
}

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getTourismLanding(),
    getSettings(),
  ])

  const seo = page?.seo || {}
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
  const canonicalUrl = seo.canonicalUrl || `${siteUrl}/tourism`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    authors: [{ name: 'Hopewell Mkhize' }],
    creator: 'Hopewell Mkhize',
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
      site: '@mumboleads',
      creator: '@mumboleads',
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImageUrl],
    },
  }
}

// JSON-LD Structured Data for LocalBusiness (Service Provider)
function generateLocalBusinessJsonLd(page: any) {
  const siteUrl = 'https://mumboleads.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/tourism`,
    name: 'Mumbo Leads - Tourism & Hospitality Division',
    description: page?.seo?.metaDescription || defaults.description,
    url: `${siteUrl}/tourism`,
    image: page?.seo?.ogImageUrl || `${siteUrl}${defaults.ogImage}`,

    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ZA',
      addressRegion: 'Gauteng',
      addressLocality: 'Johannesburg',
    },

    // Service offered
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Tourism & Hospitality Lead Generation',
        description: 'B2C lead generation service for hotels, lodges, guest houses, resorts, and tour operators',
        serviceType: 'Lead Generation',
        areaServed: {
          '@type': 'Country',
          name: 'South Africa',
        },
        provider: {
          '@type': 'Organization',
          name: 'Mumbo Leads',
          url: siteUrl,
        },
      },
    },

    // Contact
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: 'https://calendly.com/hopewell-mumboleads/30min',
      availableLanguage: ['English'],
    },

    // Aggregate rating from testimonials
    aggregateRating: page?.testimonials?.items?.length ? {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: page.testimonials.items.length.toString(),
      reviewCount: page.testimonials.items.length.toString(),
    } : {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '50',
      reviewCount: '50',
    },

    // Reviews from testimonials
    review: page?.testimonials?.items?.map((t: any) => ({
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

    // Same as for social profiles
    sameAs: [
      'https://www.linkedin.com/company/mumboleads',
      'https://twitter.com/mumboleads',
    ],
  }
}

// FAQ Structured Data
function generateFaqJsonLd(page: any) {
  if (!page?.faq?.items?.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.items.map((item: any) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// Service Structured Data
function generateServiceJsonLd(page: any) {
  const siteUrl = 'https://mumboleads.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tourism & Hospitality Lead Generation',
    description: page?.solution?.subtitle || 'We generate qualified B2C leads for your hospitality business',
    url: `${siteUrl}/tourism`,
    provider: {
      '@type': 'Organization',
      name: 'Mumbo Leads',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
    },
    serviceType: 'Lead Generation',
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tourism Lead Generation Services',
      itemListElement: page?.whatYouGet?.items?.map((item: any, index: number) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item.text,
          position: index + 1,
        },
      })) || [],
    },
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
        name: 'Tourism & Hospitality',
        item: 'https://mumboleads.com/tourism',
      },
    ],
  }
}

export default async function TourismPage() {
  const [page, partners] = await Promise.all([
    getTourismLanding(),
    getPartners('company'),
  ])

  const localBusinessJsonLd = generateLocalBusinessJsonLd(page)
  const serviceJsonLd = generateServiceJsonLd(page)
  const faqJsonLd = generateFaqJsonLd(page)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd()

  return (
    <>
      {/* LocalBusiness Structured Data */}
      <Script
        id="localbusiness-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* Service Structured Data */}
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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

      <TourismLanding data={page} partners={partners} />
    </>
  )
}
