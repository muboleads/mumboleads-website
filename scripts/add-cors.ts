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

async function addCorsOrigin() {
  console.log('🔧 Adding CORS origin to Sanity project...\n')

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!

    // Note: This requires using the Sanity Management API
    // For now, we'll just show the instructions
    console.log('✅ To add CORS origin manually:\n')
    console.log('1. Go to: https://www.sanity.io/manage')
    console.log(`2. Select your project: ${projectId}`)
    console.log('3. Click "API" in the left sidebar')
    console.log('4. Scroll to "CORS Origins"')
    console.log('5. Click "Add CORS origin"')
    console.log('6. Add: http://localhost:3002')
    console.log('7. Check "Allow credentials"')
    console.log('8. Click "Save"\n')
    console.log('🌐 Once added, refresh your browser at http://localhost:3002/studio\n')

  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  }
}

addCorsOrigin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
