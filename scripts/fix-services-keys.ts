import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import path from 'path'
import { randomUUID } from 'crypto'

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env.local') })

// Create client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function fixServicesKeys() {
  try {
    console.log('Fetching homepage document...')

    // Get the homepage document
    const homepage = await client.fetch(`*[_type == "homepage"][0]`)

    if (!homepage) {
      console.error('Homepage document not found!')
      return
    }

    if (!homepage.help?.services) {
      console.log('No services found to fix')
      return
    }

    console.log('Adding _key to services...')

    // Add _key to each service
    const servicesWithKeys = homepage.help.services.map((service: any) => ({
      ...service,
      _key: randomUUID(),
    }))

    // Update the homepage with services that have keys
    await client
      .patch(homepage._id)
      .set({
        'help.services': servicesWithKeys,
      })
      .commit()

    console.log('✅ Successfully added _key to all services!')
    console.log(`
Fixed ${servicesWithKeys.length} services:
${servicesWithKeys.map((s: any, i: number) => `${i + 1}. ${s.title} (key: ${s._key})`).join('\n')}

You can now edit these services in Sanity Studio without errors.
    `)
  } catch (error) {
    console.error('Error fixing services:', error)
    process.exit(1)
  }
}

fixServicesKeys()
