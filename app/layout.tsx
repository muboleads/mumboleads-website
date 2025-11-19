import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CalProvider } from '@/lib/cal-context'
import { getSettings } from '@/lib/sanity'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mumboleads.com'),
  title: {
    default: 'Mumbo LEADS | B2B Lead Generation & Cold Email Agency',
    template: '%s | Mumbo LEADS'
  },
  description: 'Fill your calendar with more sales-qualified leads. B2B cold email agency that helps businesses generate qualified leads through strategic outreach and targeting.',
  keywords: ['B2B lead generation', 'cold email agency', 'sales qualified leads', 'B2B marketing', 'email outreach', 'lead generation service'],
  authors: [{ name: 'Mumbo LEADS' }],
  creator: 'Mumbo LEADS',
  publisher: 'Mumbo LEADS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.mumboleads.com',
    siteName: 'Mumbo LEADS',
    title: 'Mumbo LEADS | B2B Lead Generation & Cold Email Agency',
    description: 'Fill your calendar with more sales-qualified leads. Expert B2B cold email agency.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mumbo LEADS - B2B Lead Generation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mumbo LEADS | B2B Lead Generation & Cold Email Agency',
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
        <CalProvider calSettings={settings?.calSettings}>
          {children}
        </CalProvider>
      </body>
    </html>
  )
}
