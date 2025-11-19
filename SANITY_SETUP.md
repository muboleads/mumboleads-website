# Sanity CMS Setup Guide

## Overview
Your website is now fully integrated with Sanity CMS, allowing you to edit ALL content without touching code.

## What You Can Edit
✅ **Homepage Content**
- Hero headline, subheadline, and bullet points
- Stats cards (metrics, descriptions, colors)
- Help section text and CTA

✅ **Blog Posts**
- Title, content, excerpt
- Featured image
- Categories and tags
- SEO metadata (title, description, keywords)
- Read time

✅ **Case Studies**
- Client name, industry
- Challenge, solution, results
- Testimonials
- Featured image
- SEO metadata

✅ **FAQ Section**
- Questions and answers
- Display order

✅ **How It Works**
- Step titles and descriptions
- Icons
- Display order

✅ **Partners & Companies**
- Company logos
- Type (official partner or client)
- Display order

✅ **Global Settings**
- Site name and tagline
- Footer contact information
- Social media links
- Default SEO settings

## Setup Steps

### 1. Create Sanity Project
1. Go to https://www.sanity.io/
2. Sign up for a free account
3. Create a new project
4. Choose a project name
5. Select "production" as the dataset name
6. Copy your **Project ID**

### 2. Add Environment Variables
Create a `.env.local` file in your project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Access Sanity Studio
Once deployed, access your CMS at:
```
https://yourdomain.com/studio
```

Or locally:
```
http://localhost:3002/studio
```

### 4. Initial Setup in Studio
After logging in for the first time:

1. **Create Homepage Content**
   - Click "Homepage" in the sidebar
   - Fill in hero section content
   - Add 4 stat cards
   - Add help section content
   - Set SEO metadata

2. **Create Site Settings**
   - Click "Site Settings"
   - Add company information
   - Set footer addresses and contact
   - Configure default SEO

3. **Add Partners/Companies**
   - Click "Partners & Companies"
   - Upload logo images
   - Set type (official/company)
   - Set display order

4. **Add FAQs**
   - Click "FAQ"
   - Create new questions
   - Set display order (1, 2, 3...)

5. **Add How It Works Steps**
   - Click "How It Works Steps"
   - Create 4 steps
   - Choose icons
   - Set order (1, 2, 3, 4)

6. **Create Blog Posts**
   - Click "Blog Post"
   - Add title, content, image
   - Set category and read time
   - Add SEO metadata

7. **Create Case Studies**
   - Click "Case Study"
   - Add client details
   - Fill in challenge/solution
   - Add results metrics
   - Include testimonial

## Content Management Tips

### SEO Best Practices
- **Meta Titles**: Keep under 60 characters
- **Meta Descriptions**: 150-160 characters
- **Keywords**: 5-10 relevant keywords per page
- **Images**: Use descriptive file names, optimize size

### Blog Posts
- Write engaging, valuable content
- Use headings (H2, H3) for structure
- Add relevant images
- Include internal links
- Update regularly for SEO

### Case Studies
- Use specific numbers in results
- Include client testimonials
- Show before/after metrics
- Tell a clear story

## Need Help?
- Sanity Documentation: https://www.sanity.io/docs
- Support: Contact your developer

## Deployment
After making changes in Sanity Studio, your website will automatically rebuild and update within 1-2 minutes (on Vercel/Netlify with webhooks configured).
