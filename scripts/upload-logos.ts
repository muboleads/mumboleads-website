import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

// Create a client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Case study client logos with their company names
const caseStudyLogos = [
  { file: 'asana.jpeg', name: 'Asana', website: 'https://asana.com' },
  { file: 'copia.png', name: 'Copia', website: '' },
  { file: 'espresso-ai.png', name: 'Espresso AI', website: '' },
  { file: 'ground-control.jpeg', name: 'Ground Control', website: '' },
  { file: 'monkedia.jpeg', name: 'Monkedia', website: '' },
  { file: 'runppc.png', name: 'RunPPC', website: '' },
  { file: 'sana.webp', name: 'Sana', website: 'https://sana.ai' },
  { file: 'seven.jpeg', name: 'Seven', website: '' },
  { file: 'wiselayer.png', name: 'Wiselayer', website: '' },
]

// Official partner logos with their names
const partnerLogos = [
  { file: 'apollo.png', name: 'Apollo.io', website: 'https://apollo.io' },
  { file: 'clay-logo.png', name: 'Clay', website: 'https://clay.com' },
  { file: 'instantly.png', name: 'Instantly', website: 'https://instantly.ai' },
  { file: 'lemlist.png', name: 'Lemlist', website: 'https://lemlist.com' },
  { file: 'smartlead.webp', name: 'Smartlead', website: 'https://smartlead.ai' },
  { file: 'trigify.jpeg', name: 'Trigify', website: '' },
]

async function uploadImage(filePath: string): Promise<any> {
  const imageBuffer = fs.readFileSync(filePath)
  const fileName = path.basename(filePath)

  console.log(`Uploading ${fileName}...`)

  return client.assets.upload('image', imageBuffer, {
    filename: fileName,
  })
}

async function createPartner(
  name: string,
  logoAsset: any,
  type: 'official' | 'company',
  order: number,
  website?: string
) {
  console.log(`Creating partner document for ${name}...`)

  return client.create({
    _type: 'partner',
    name,
    logo: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: logoAsset._id,
      },
    },
    type,
    order,
    ...(website && { website }),
  })
}

async function deleteExistingPartners() {
  console.log('Deleting existing partners...')
  const existingPartners = await client.fetch(`*[_type == "partner"]._id`)

  if (existingPartners.length > 0) {
    const transaction = client.transaction()
    existingPartners.forEach((id: string) => {
      transaction.delete(id)
    })
    await transaction.commit()
    console.log(`Deleted ${existingPartners.length} existing partners`)
  }
}

async function main() {
  try {
    console.log('Starting logo upload process...\n')

    // Optional: Delete existing partners first
    const shouldDelete = process.argv.includes('--delete-existing')
    if (shouldDelete) {
      await deleteExistingPartners()
      console.log('')
    }

    // Upload case study client logos
    console.log('=== Uploading Case Study Client Logos ===')
    for (let i = 0; i < caseStudyLogos.length; i++) {
      const logo = caseStudyLogos[i]
      const filePath = path.join(
        process.cwd(),
        'public',
        'logos',
        'case-studies',
        logo.file
      )

      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`)
        continue
      }

      const asset = await uploadImage(filePath)
      await createPartner(logo.name, asset, 'company', i + 1, logo.website)
      console.log(`✅ Created ${logo.name}\n`)
    }

    // Upload official partner logos
    console.log('\n=== Uploading Official Partner Logos ===')
    for (let i = 0; i < partnerLogos.length; i++) {
      const logo = partnerLogos[i]
      const filePath = path.join(
        process.cwd(),
        'public',
        'logos',
        'partners',
        logo.file
      )

      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`)
        continue
      }

      const asset = await uploadImage(filePath)
      await createPartner(logo.name, asset, 'official', i + 1, logo.website)
      console.log(`✅ Created ${logo.name}\n`)
    }

    console.log('\n🎉 All logos uploaded successfully!')
    console.log(`
Summary:
- ${caseStudyLogos.length} case study client logos
- ${partnerLogos.length} official partner logos
- Total: ${caseStudyLogos.length + partnerLogos.length} logos
    `)
  } catch (error) {
    console.error('Error uploading logos:', error)
    process.exit(1)
  }
}

main()
