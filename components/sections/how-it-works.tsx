import Image from "next/image"
import { Container } from "@/components/ui/container"
import { FileCheck, MessageSquare, Search, Repeat, LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

// Icon mapping for Sanity
const iconMap: Record<string, LucideIcon> = {
  FileCheck,
  MessageSquare,
  Search,
  Repeat
}

// Fallback data
const defaultSteps = [
  {
    icon: "FileCheck",
    title: "Get - Prepared - Head",
    description: "We hop on a quick call, walk you through, send you an onboarding form. We'll make sure we have all the infrastructure ready to go.",
    order: 1
  },
  {
    icon: "MessageSquare",
    title: "Kickoff Call - Idea Phase",
    description: "We run a 30min strategy call then reach our 30-min building your strategy and campaigns.",
    order: 2
  },
  {
    icon: "Search",
    title: "Campaign Launch",
    description: "Once results after kickoff your campaign go live. We hit the inbox start sending and generate conversions.",
    order: 3
  },
  {
    icon: "Repeat",
    title: "Scale - Repeat",
    description: "Every week we tweak better targeting, message messaging, and send volumes to optimize even better results.",
    order: 4
  }
]

interface HowItWorksProps {
  data?: Array<{
    icon: string
    title: string
    description: string
    order: number
  }> | null
}

export function HowItWorks({ data }: HowItWorksProps) {
  const steps = data || defaultSteps
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How does Mumbo LEADS work?
          </h2>
          <p className="text-lg text-gray-600">
            Generate Business Development calls and deals with your exact ICP in 4 easy steps.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon] || FileCheck
            return (
              <div key={index} className="relative">
                {/* Arrow between steps (hidden on mobile, shown on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-8 xl:-right-10 z-10">
                    <ArrowRight className="h-12 w-12 xl:h-16 xl:w-16 text-gray-300" strokeWidth={2.5} />
                  </div>
                )}

                {/* Step Card */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 p-6 shadow-lg">
                    <Icon className="h-12 w-12 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
