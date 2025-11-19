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

async function updateCalendly() {
  console.log('🔄 Updating Calendly settings only...\n')

  try {
    await client
      .patch('settings')
      .set({
        calendlySettings: {
          calendlyUrl: 'https://calendly.com/hopewell-mumboleads/30min'
        }
      })
      .commit()

    console.log('✅ Calendly settings updated successfully!\n')
    console.log('🌐 Visit http://localhost:3002 to see the changes')
    console.log('🎨 Visit http://localhost:3002/studio to verify in Sanity Studio\n')
  } catch (error) {
    console.error('❌ Error updating Calendly settings:', error)
    process.exit(1)
  }
}

updateCalendly()
