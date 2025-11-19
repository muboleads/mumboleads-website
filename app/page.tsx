import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Partners } from "@/components/sections/partners"
import { Help } from "@/components/sections/help"
import { HowItWorks } from "@/components/sections/how-it-works"
import { FAQ } from "@/components/sections/faq"
import { JsonLd } from "@/components/seo/json-ld"
import {
  getHomepage,
  getFAQs,
  getHowItWorksSteps,
  getPartners,
  getSettings
} from "@/lib/sanity"

export default async function Home() {
  // Fetch all homepage data from Sanity
  const [homepage, faqs, howItWorksSteps, partners, settings] = await Promise.all([
    getHomepage(),
    getFAQs(),
    getHowItWorksSteps(),
    getPartners(),
    getSettings(),
  ])

  return (
    <>
      <JsonLd />
      <main className="min-h-screen">
        <Header data={settings} />
        <Hero data={homepage} />
        <Partners data={partners} />
        <Help data={homepage?.help} />
        <HowItWorks data={howItWorksSteps} sectionData={settings?.howItWorksSection} />
        <FAQ data={faqs} sectionData={settings?.faqSection} />
        <Footer data={settings?.footer} />
      </main>
    </>
  )
}
