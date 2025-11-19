import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/ui/container'
import { getCaseStudies } from '@/lib/case-studies-data'
import { getCaseStudiesFromSanity } from '@/lib/sanity'
import { TrendingUp, Users, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Case Studies - Real Results from Real Clients',
  description: 'See how we\'ve helped B2B companies generate thousands of qualified leads through strategic cold email campaigns. Real results, real clients.',
  openGraph: {
    title: 'Case Studies - Real Results | Mumbo LEADS',
    description: 'See how we\'ve helped B2B companies generate thousands of qualified leads.',
  },
}

export default async function CaseStudiesPage() {
  // Try to fetch from Sanity first, fall back to placeholder data
  const sanityCaseStudies = await getCaseStudiesFromSanity()
  const fallbackCaseStudies = getCaseStudies()

  // Use Sanity case studies if available, otherwise use fallback
  const caseStudies = sanityCaseStudies.length > 0
    ? sanityCaseStudies.map((cs: any) => ({
        id: cs._id,
        slug: cs.slug.current,
        title: cs.title,
        client: cs.client,
        industry: cs.industry,
        image: cs.imageUrl || '/media/download.jpeg',
        challenge: cs.challenge,
        solution: cs.solution,
        results: cs.results,
        testimonial: cs.testimonial,
        publishedAt: cs.publishedAt
      }))
    : fallbackCaseStudies

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Container>
          {/* Header Section */}
          <div className="py-16 sm:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Client <span className="text-primary-700">Success Stories</span>
              </h1>
              <p className="text-lg text-gray-600">
                Real results from real clients. See how we&apos;ve helped B2B companies fill their pipeline with qualified leads.
              </p>
            </div>

            {/* Stats Bar */}
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <TrendingUp className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">$4.1M+</div>
                <div className="text-sm text-gray-600 mt-1">Pipeline Generated</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">2,400+</div>
                <div className="text-sm text-gray-600 mt-1">Qualified Leads</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <Target className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">67%</div>
                <div className="text-sm text-gray-600 mt-1">Avg. Open Rate</div>
              </div>
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="pb-16 sm:pb-20">
            <div className="grid gap-8 md:grid-cols-2">
              {caseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy.id}
                  href={`/case-studies/${caseStudy.slug}`}
                  className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                        {caseStudy.industry}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(caseStudy.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                      {caseStudy.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {caseStudy.challenge}
                    </p>

                    {/* Results Preview */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                      {caseStudy.results.slice(0, 3).map((result, index) => (
                        <div key={index} className="text-center">
                          <div className="text-lg font-bold text-primary-600">
                            {result.value}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {result.metric}
                          </div>
                        </div>
                      ))}
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
