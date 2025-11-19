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

async function updateFooter() {
  console.log('🔄 Updating footer settings only...\n')

  try {
    await client
      .patch('settings')
      .set({
        footer: {
          description: 'B2B Cold Email Agency\nfor Busy Companies',
          email: 'hopewell@mumboleads.com',
          links: [
            {
              _key: 'link-case-study',
              label: 'Case Study',
              href: '/case-studies'
            },
            {
              _key: 'link-blog',
              label: 'Blog',
              href: '/blog'
            }
          ],
          addresses: [
            {
              _key: 'address-paarl',
              line1: 'Paarl, Western Cape',
              line2: 'South Africa',
              city: '7646'
            }
          ]
        }
      })
      .commit()

    console.log('✅ Footer settings updated successfully!\n')
    console.log('🌐 Visit http://localhost:3002 to see the changes')
    console.log('🎨 Visit http://localhost:3002/studio to verify in Sanity Studio\n')
  } catch (error) {
    console.error('❌ Error updating footer:', error)
    process.exit(1)
  }
}

updateFooter()
