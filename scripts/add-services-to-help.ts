import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import path from 'path'

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

const defaultServices = [
  {
    icon: 'FileText',
    title: 'Tech-driven Delivery Engineering',
    description: "We've spent years and thousands of dollars figuring out what gets your message into your prospect's inbox, not their spam. We know what works, and we know what's not worth trying. Let's find out.",
  },
  {
    icon: 'Target',
    title: 'Laser-targeted Prospecting',
    description: "We've built this proprietary based on 100s of persona, ICP targets, job title needs, and market changes to instantly identify exactly who you need to reach to hit their pain points and not just who is a 'fit.'",
  },
  {
    icon: 'Copy',
    title: 'Copy that Converts',
    description: 'Converting copy requires deep knowledge of your target market, but also a proven and testing framework that delivers. You\'ll need to start with great list, solid deliverability setup and then copy that resonates and drives responses.',
  },
]

async function addServicesToHelp() {
  try {
    console.log('Fetching homepage document...')

    // Get the homepage document
    const homepage = await client.fetch(`*[_type == "homepage"][0]`)

    if (!homepage) {
      console.error('Homepage document not found!')
      return
    }

    console.log('Adding services to help section...')

    // Update the homepage with services
    await client
      .patch(homepage._id)
      .set({
        'help.services': defaultServices,
      })
      .commit()

    console.log('✅ Successfully added services to help section!')
    console.log(`
Services added:
${defaultServices.map((s, i) => `${i + 1}. ${s.title}`).join('\n')}

You can now manage these services in Sanity Studio at:
http://localhost:3002/studio
    `)
  } catch (error) {
    console.error('Error adding services:', error)
    process.exit(1)
  }
}

addServicesToHelp()
