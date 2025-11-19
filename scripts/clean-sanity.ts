import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function cleanDuplicates() {
  console.log('🧹 Cleaning duplicate content...\n')

  try {
    // Delete all FAQs
    console.log('Deleting FAQs...')
    await client.delete({ query: '*[_type == "faq"]' })

    // Delete all How It Works
    console.log('Deleting How It Works steps...')
    await client.delete({ query: '*[_type == "howItWorks"]' })

    // Delete all Blog Posts
    console.log('Deleting Blog Posts...')
    await client.delete({ query: '*[_type == "post"]' })

    // Delete all Case Studies
    console.log('Deleting Case Studies...')
    await client.delete({ query: '*[_type == "caseStudy"]' })

    console.log('\n✅ Cleanup complete! Run npm run populate-sanity to repopulate.\n')
  } catch (error) {
    console.error('❌ Error cleaning Sanity:', error)
    throw error
  }
}

cleanDuplicates()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
