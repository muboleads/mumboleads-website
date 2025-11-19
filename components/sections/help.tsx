import Image from "next/image"
import { Container } from "@/components/ui/container"
import { FileText, Target, Copy, Mail, Users, Zap, TrendingUp, CheckCircle2 } from "lucide-react"

// Icon mapping
const iconMap: Record<string, any> = {
  FileText,
  Target,
  Copy,
  Mail,
  Users,
  Zap,
  TrendingUp,
  CheckCircle2,
}

// Fallback data
const defaultHelpSteps = [
  "You have to reach to the primary inbox.",
  "It has to be the right email for a double-header at the right organization.",
  "The prospect needs to feel a reply."
]

const defaultServices = [
  {
    icon: 'FileText',
    title: "Tech-driven Delivery Engineering",
    description: "We've spent years and thousands of dollars figuring out what gets your message into your prospect's inbox, not their spam. We know what works, and we know what's not worth trying. Let's find out."
  },
  {
    icon: 'Target',
    title: "Laser-targeted Prospecting",
    description: "We've built this proprietary based on 100s of persona, ICP targets, job title needs, and market changes to instantly identify exactly who you need to reach to hit their pain points and not just who is a 'fit.'"
  },
  {
    icon: 'Copy',
    title: "Copy that Converts",
    description: "Converting copy requires deep knowledge of your target market, but also a proven and testing framework that delivers. You'll need to start with great list, solid deliverability setup and then copy that resonates and drives responses."
  }
]

const defaultHelp = {
  heading: "Still wondering how we can help you? Well, let's see...",
  subheading: "We generated 3,000 B2B calls for a gaming and esports organization by the Top 3 business development metrics. But how? Email leads when it's done right can cut this networking it right:",
  steps: defaultHelpSteps,
  services: defaultServices
}

interface HelpProps {
  data?: {
    heading?: string
    subheading?: string
    steps?: string[]
    services?: Array<{
      icon?: string
      title: string
      description: string
    }>
  } | null
}

export function Help({ data }: HelpProps) {
  const help = data || defaultHelp
  const helpSteps = help.steps || defaultHelpSteps
  const services = help.services || defaultServices

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            {help.heading || "Still wondering how we can help you?"}<br className="hidden md:block" /> {!help.heading && "Well, let's see..."}
          </h2>
          {help.subheading && (
            <p className="text-lg text-gray-700 mb-8">
              {help.subheading}
            </p>
          )}

          {/* Numbered Steps */}
          <div className="space-y-4">
            {helpSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 shadow-md">
                    <span className="text-lg font-bold text-gray-900">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed pt-1.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Cards */}
        <div className="mt-16 bg-black rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-primary-500">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service: any, index: number) => {
              const Icon = iconMap[service.icon || 'FileText'] || FileText
              return (
                <div key={index} className="flex flex-col items-center text-center text-white">
                  <div className="mb-4 rounded-xl bg-primary-500 p-4 shadow-md animate-icon-glow">
                    <Icon className="h-12 w-12 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-primary-400">{service.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
