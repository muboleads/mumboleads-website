import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/ui/container'
import { getCaseStudy, getCaseStudies } from '@/lib/case-studies-data'
import { getCaseStudyFromSanity, getCaseStudiesFromSanity } from '@/lib/sanity'
import { ArrowLeft, Quote } from 'lucide-react'

export async function generateStaticParams() {
  // Try Sanity first, fall back to placeholder
  const sanityCaseStudies = await getCaseStudiesFromSanity()
  const fallbackCaseStudies = getCaseStudies()

  const caseStudies = sanityCaseStudies.length > 0
    ? sanityCaseStudies.map((cs: any) => ({ slug: cs.slug.current }))
    : fallbackCaseStudies.map((cs) => ({ slug: cs.slug }))

  return caseStudies
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sanityCaseStudy = await getCaseStudyFromSanity(params.slug)
  const fallbackCaseStudy = getCaseStudy(params.slug)

  const caseStudy = sanityCaseStudy || fallbackCaseStudy

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  const image = sanityCaseStudy?.imageUrl || caseStudy.image

  return {
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.challenge.substring(0, 155),
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.challenge.substring(0, 155),
      type: 'article',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  // Try Sanity first, fall back to placeholder data
  const sanityCaseStudy = await getCaseStudyFromSanity(params.slug)
  const fallbackCaseStudy = getCaseStudy(params.slug)

  if (!sanityCaseStudy && !fallbackCaseStudy) {
    notFound()
  }

  // Map Sanity case study to expected format
  const caseStudy = sanityCaseStudy
    ? {
        title: sanityCaseStudy.title,
        client: sanityCaseStudy.client,
        industry: sanityCaseStudy.industry,
        image: sanityCaseStudy.imageUrl || '/media/download.jpeg',
        challenge: sanityCaseStudy.challenge,
        solution: sanityCaseStudy.solution,
        results: sanityCaseStudy.results,
        testimonial: sanityCaseStudy.testimonial,
        publishedAt: sanityCaseStudy.publishedAt
      }
    : fallbackCaseStudy!

  // This should never happen due to the check above, but TypeScript needs it
  if (!caseStudy) {
    notFound()
  }

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
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-600 transition-colors mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Case Studies
                </Link>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded-full">
                    {caseStudy.industry}
                  </span>
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
                    {caseStudy.client}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  {caseStudy.title}
                </h1>

                <p className="text-xl text-gray-600">
                  Published {new Date(caseStudy.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </Container>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video max-w-5xl mx-auto -mt-8 mb-12 px-4">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-100 to-primary-200">
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <Container>
            <div className="max-w-3xl mx-auto pb-16">
              {/* Challenge */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The Challenge</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </section>

              {/* Solution */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Solution</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {caseStudy.solution}
                </p>
              </section>

              {/* Results */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Results</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {caseStudy.results.map((result: { value: string; metric: string }, index: number) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 text-center"
                    >
                      <div className="text-4xl font-bold text-primary-700 mb-2">
                        {result.value}
                      </div>
                      <div className="text-sm text-gray-700 font-medium">
                        {result.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Testimonial */}
              {caseStudy.testimonial && (
                <section className="mb-12">
                  <div className="bg-gray-50 rounded-2xl p-8 relative">
                    <Quote className="h-12 w-12 text-primary-200 absolute top-6 left-6" />
                    <div className="relative z-10 pl-8">
                      <p className="text-xl text-gray-800 italic mb-6 leading-relaxed">
                        &ldquo;{caseStudy.testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-bold text-gray-900">
                            {caseStudy.testimonial.author}
                          </div>
                          <div className="text-sm text-gray-600">
                            {caseStudy.testimonial.position}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* CTA */}
              <section className="bg-primary-700 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Ready for similar results?
                </h3>
                <p className="text-lg mb-6 text-white/90">
                  Let&apos;s discuss how we can help you generate more qualified leads.
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
