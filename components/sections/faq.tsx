"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Fallback data
const defaultFaqs = [
  {
    question: "What makes Mumbo Leads different from other lead gen agencies?",
    answer: "We focus on quality over quantity, using a tech-driven approach combined with deep market research to ensure every lead is qualified and matches your ICP perfectly. Our proprietary targeting system and proven delivery methods set us apart.",
    order: 1
  },
  {
    question: "How many B2B leads will I get?",
    answer: "The number of leads varies based on your industry, target market, and campaign specifics. We focus on qualified conversations and booked meetings rather than just raw numbers. Most clients see significant pipeline growth within the first 2-4 weeks.",
    order: 2
  },
  {
    question: "Will my emails land in spam?",
    answer: "We've invested years and significant resources into mastering email deliverability. Our tech-driven delivery engineering ensures your messages reach the primary inbox, not spam. We use proven methods and constantly monitor deliverability metrics.",
    order: 3
  },
  {
    question: "Who handles copy and targeting?",
    answer: "Our expert team handles all copywriting and targeting. We use a proven framework based on hundreds of successful campaigns, combined with deep research into your specific market and ICP to create messaging that resonates and converts.",
    order: 4
  },
  {
    question: "What happens if I want to pause or cancel?",
    answer: "We offer flexible engagement options. You can pause or cancel your campaign with proper notice. We believe in earning your business every month through results, not locking you into long-term contracts.",
    order: 5
  },
  {
    question: "How long before I see results?",
    answer: "Most clients start seeing qualified conversations and booked meetings within 2-4 weeks of campaign launch. We optimize weekly to improve results, and campaigns typically hit their stride by month 2-3.",
    order: 6
  },
  {
    question: "Why wouldn't I just hire a full-time SDR?",
    answer: "A full-time SDR costs $60k+ per year plus benefits, training, tools, and management time. With Mumbo Leads, you get an entire team of experts, proven systems, and technology for a fraction of the cost, with faster results and no hiring risk.",
    order: 7
  }
]

interface FAQProps {
  data?: Array<{
    question: string
    answer: string
    order: number
  }> | null
  sectionData?: {
    title?: string
    description?: string
  } | null
}

export function FAQ({ data, sectionData }: FAQProps) {
  const faqs = data || defaultFaqs
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const sectionTitle = sectionData?.title || 'What the FAQ'
  const sectionDescription = sectionData?.description || 'Have a question? I trust you do! If you can\'t find your answer here, let\'s check email.'

  return (
    <section id="faq" className="py-16 sm:py-20 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-600">
            {sectionDescription}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-gray-900 bg-clip-text text-transparent pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-900 flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "transform rotate-180"
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
