import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CalendlyProvider } from '@/lib/calendly-context'
import { getSettings } from '@/lib/sanity'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mumboleads.com'),
  title: {
    default: 'Mumbo Leads | B2B Lead Generation & Cold Email Agency',
    template: '%s | Mumbo Leads'
  },
  description: 'Fill your calendar with more sales-qualified leads. B2B cold email agency that helps businesses generate qualified leads through strategic outreach and targeting.',
  keywords: ['B2B lead generation', 'cold email agency', 'sales qualified leads', 'B2B marketing', 'email outreach', 'lead generation service'],
  authors: [{ name: 'Mumbo Leads' }],
  creator: 'Mumbo Leads',
  publisher: 'Mumbo Leads',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.mumboleads.com',
    siteName: 'Mumbo Leads',
    title: 'Mumbo Leads | B2B Lead Generation & Cold Email Agency',
    description: 'Fill your calendar with more sales-qualified leads. Expert B2B cold email agency.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mumbo Leads - B2B Lead Generation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mumbo Leads | B2B Lead Generation & Cold Email Agency',
    description: 'Fill your calendar with more sales-qualified leads',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()

  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <CalendlyProvider calendlySettings={settings?.calendlySettings}>
          {children}
        </CalendlyProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
