export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mumbo Leads",
    "description": "B2B Cold Email Agency - Fill your calendar with sales-qualified leads",
    "url": "https://www.mumboleads.com",
    "logo": "https://www.mumboleads.com/logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hopewell@mumboleads.com",
      "contactType": "Customer Service",
      "areaServed": ["ZA", "US", "GB"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/mumboleads",
      "https://twitter.com/mumboleads"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paarl",
      "addressRegion": "Western Cape",
      "postalCode": "7646",
      "addressCountry": "ZA"
    }
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "B2B Lead Generation",
    "provider": {
      "@type": "Organization",
      "name": "Mumbo Leads"
    },
    "areaServed": ["ZA", "US", "GB"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Lead Generation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cold Email Outreach",
            "description": "Tech-driven cold email campaigns targeting your ideal customer profile"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "B2B Lead Generation",
            "description": "Sales qualified leads delivered directly to your calendar"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Email Deliverability Management",
            "description": "Ensure your emails reach the primary inbox, not spam"
          }
        }
      ]
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Mumbo Leads different from other lead gen agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We focus on quality over quantity, using a tech-driven approach combined with deep market research to ensure every lead is qualified and matches your ICP perfectly. Our proprietary targeting system and proven delivery methods set us apart."
        }
      },
      {
        "@type": "Question",
        "name": "How many B2B leads will I get?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The number of leads varies based on your industry, target market, and campaign specifics. We focus on qualified conversations and booked meetings rather than just raw numbers. Most clients see significant pipeline growth within the first 2-4 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "Will my emails land in spam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We've invested years and significant resources into mastering email deliverability. Our tech-driven delivery engineering ensures your messages reach the primary inbox, not spam."
        }
      },
      {
        "@type": "Question",
        "name": "How long before I see results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most clients start seeing qualified conversations and booked meetings within 2-4 weeks of campaign launch. We optimize weekly to improve results, and campaigns typically hit their stride by month 2-3."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
