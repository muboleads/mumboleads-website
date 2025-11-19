import Image from "next/image"
import { Container } from "@/components/ui/container"

// Fallback data
const defaultOfficialPartners = [
  { name: "Partner 1", logoUrl: "/media/download.jpeg" },
  { name: "Instantly App", logoUrl: "/media/instantlyapp_logo.jpeg" },
  { name: "Partner 3", logoUrl: "/media/download.png" }
]

const defaultCompanies = [
  { name: "Shootsta", logoUrl: "/media/download.png" },
  { name: "Hunter", logoUrl: "/media/1676490325-hunter_logo_orange-300x102.png" },
  { name: "Banzai", logoUrl: "/media/1651946284-banzai.png" },
  { name: "StoryXl", logoUrl: "/media/download-1.png" },
  { name: "Boundless", logoUrl: "/media/images.png" },
  { name: "AppSumo", logoUrl: "/media/1651847560-3600-appsumo_logo.png" },
  { name: "G-Crane", logoUrl: "/media/download-2.png" },
  { name: "Sembli", logoUrl: "/media/images_1.png" },
  { name: "Wise", logoUrl: "/media/images-1.png" },
  { name: "Indi Video", logoUrl: "/media/1651939826-360-individeo.png" },
  { name: "Vidico", logoUrl: "/media/images.jpeg" },
  { name: "Project Blue", logoUrl: "/media/Project-Blue-Main-Logo-2.png" },
  { name: "Beui Pixlr", logoUrl: "/media/1651946117-pixlr-bg-result-1.png" },
  { name: "My Scale", logoUrl: "/media/1bad15b0-de3d-4bc0-acca-0a59292d7223.png" },
  { name: "Luzmo", logoUrl: "/media/1671141855222.jpeg" }
]

interface PartnersProps {
  data?: Array<{
    name: string
    logoUrl: string
    type: 'official' | 'company'
  }> | null
}

export function Partners({ data }: PartnersProps) {
  // Split partners by type
  const officialPartners = (data && data.length > 0)
    ? data.filter(p => p.type === 'official')
    : defaultOfficialPartners

  const companies = (data && data.length > 0)
    ? data.filter(p => p.type === 'company')
    : defaultCompanies
  return (
    <section className="py-12 sm:py-16 bg-white">
      <Container>
        {/* Official Partners */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-gray-300" />
            <h2 className="text-xl font-bold text-gray-900">
              Tools
            </h2>
            <div className="h-px w-12 bg-gray-300" />
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {officialPartners.map((partner: any, index: number) => (
              <div
                key={index}
                className="flex h-20 w-32 items-center justify-center rounded-xl bg-white p-4 shadow-md border border-primary-400"
              >
                <Image
                  src={partner.logoUrl}
                  alt={`${partner.name} logo`}
                  width={100}
                  height={60}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Companies Section */}
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            We&apos;ve driven thousands of leads to these companies, and more....
          </h3>

          {/* Company Logos Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center justify-items-center">
            {companies.map((company: any, index: number) => (
              <div
                key={index}
                className="flex h-32 w-full items-center justify-center rounded-xl bg-white p-6 shadow-md border border-primary-400 transition-all duration-300 hover:shadow-lg"
              >
                <Image
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  width={160}
                  height={80}
                  className="max-h-20 w-auto object-contain md:grayscale md:hover:grayscale-0"
                />
              </div>
            ))}

            {/* Add "..and counting" card if odd number of logos */}
            {companies.length % 2 !== 0 && (
              <div className="flex h-32 w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 p-6 shadow-md border border-primary-400 transition-all duration-300 hover:shadow-lg">
                <span className="text-2xl font-bold text-gray-900">
                  ...and counting
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
