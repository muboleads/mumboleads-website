import type { Metadata } from 'next'
import { getSalesCourse, getAboutUs } from '@/lib/sanity'
import { CourseLanding } from '@/components/sections/course-landing'
import './course.css'

export async function generateMetadata(): Promise<Metadata> {
  const course = await getSalesCourse()

  return {
    title: course?.seo?.metaTitle || 'Cold Email Mastery Course | Grow Your B2B Business',
    description: course?.seo?.metaDescription || 'Learn the exact cold email system that has generated $16.5M+ in sales pipeline. 8 modules, lifetime access, certificate included.',
    keywords: course?.seo?.metaKeywords || ['cold email', 'B2B sales', 'lead generation', 'email marketing'],
    openGraph: {
      title: course?.seo?.metaTitle || 'Cold Email Mastery Course',
      description: course?.seo?.metaDescription || 'Turn cold strangers into paying clients with one email.',
      images: course?.seo?.ogImageUrl ? [course.seo.ogImageUrl] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: course?.seo?.metaTitle || 'Cold Email Mastery Course',
      description: course?.seo?.metaDescription || 'Turn cold strangers into paying clients with one email.',
      images: course?.seo?.ogImageUrl ? [course.seo.ogImageUrl] : [],
    },
  }
}

export default async function CoursePage() {
  const [course, aboutUs] = await Promise.all([
    getSalesCourse(),
    getAboutUs(),
  ])

  return <CourseLanding data={course} instructorImageUrl={aboutUs?.ownerImageUrl} />
}
