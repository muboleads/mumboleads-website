import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

// Create client with write access (requires token)
const client = projectId && token
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      token,
    })
  : null

export async function POST(request: NextRequest) {
  try {
    // Check if client is available
    if (!client) {
      console.error('Sanity client not configured - missing SANITY_API_TOKEN')
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { fullName, email, phone, company, businessType, monthlyRevenue, website, primaryGoal, budget } = body

    // Validate required fields
    if (!fullName || !email || !phone || !company || !businessType || !monthlyRevenue || !primaryGoal || !budget) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check for existing lead with same email (don't reveal if exists for privacy)
    const existingLead = await client.fetch(
      `*[_type == "tourismLead" && email == $email][0]`,
      { email: email.toLowerCase().trim() }
    )

    if (existingLead) {
      // Return success anyway so attackers can't enumerate emails
      return NextResponse.json({
        success: true,
        message: 'Thank you! We will be in touch soon.',
      })
    }

    // Create the lead document
    await client.create({
      _type: 'tourismLead',
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      company: company.trim(),
      businessType,
      monthlyRevenue,
      website: website?.trim() || '',
      primaryGoal,
      budget,
      source: 'tourism-landing',
      status: 'new',
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will be in touch soon.',
    })
  } catch (error) {
    console.error('Error capturing tourism lead:', error)
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    )
  }
}
