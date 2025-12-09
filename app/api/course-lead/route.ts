import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, email } = body

    // Validate input
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'First name and email are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingLead = await client.fetch(
      `*[_type == "courseLead" && email == $email][0]`,
      { email }
    )

    if (existingLead) {
      // Already subscribed - return success anyway (don't reveal if email exists)
      return NextResponse.json({ success: true, message: 'Already subscribed' })
    }

    // Create new lead in Sanity
    await client.create({
      _type: 'courseLead',
      firstName: firstName.trim(),
      email: email.toLowerCase().trim(),
      source: 'course-landing-popup',
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: 'Lead captured successfully' })
  } catch (error) {
    console.error('Error capturing lead:', error)
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    )
  }
}
