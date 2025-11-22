# SEO & Analytics Complete Guide

## Overview
This site is now fully optimized for SEO and equipped with comprehensive analytics tracking capabilities. Everything is manageable through Sanity CMS - no code changes needed!

## 📊 Analytics & Tracking

### Sanity Studio Access
1. Go to `http://localhost:3002/studio` (or your live studio URL)
2. Navigate to **"Analytics & Tracking"** document
3. Enable/configure any analytics tools you need

### Supported Analytics Tools

#### 1. **Google Analytics 4 (GA4)**
- Toggle: Enable GA4
- Required: Measurement ID (format: `G-XXXXXXXXXX`)
- Tracks: Page views, events, conversions

#### 2. **Google Tag Manager (GTM)**
- Toggle: Enable GTM
- Required: Container ID (format: `GTM-XXXXXXX`)
- Use for: Advanced tracking, custom events, A/B testing

#### 3. **Mixpanel**
- Toggle: Enable Mixpanel
- Required: Project Token
- Use for: Product analytics, user behavior tracking

#### 4. **Microsoft Clarity**
- Toggle: Enable Clarity
- Required: Project ID
- Features: Heatmaps, session recordings, user insights

#### 5. **Hotjar**
- Toggle: Enable Hotjar
- Required: Site ID (numeric)
- Features: Heatmaps, recordings, feedback polls

#### 6. **Crazy Egg**
- Toggle: Enable Crazy Egg
- Required: Account Number
- Features: Heatmaps, scroll maps, A/B testing

#### 7. **Facebook Pixel**
- Toggle: Enable Facebook Pixel
- Required: Pixel ID
- Use for: Facebook ads conversion tracking

#### 8. **LinkedIn Insight Tag**
- Toggle: Enable LinkedIn Insight
- Required: Partner ID
- Use for: LinkedIn ads conversion tracking

#### 9. **Custom Scripts**
- Add unlimited custom tracking scripts
- Inject in `<head>` or `<body>`
- Perfect for: Other analytics tools, custom tracking

## 🔍 SEO Settings

### Sanity Studio Access
Navigate to **"SEO Settings"** document in Sanity Studio

### Core SEO Settings

#### Site Information
- **Site Name**: Your business name (e.g., "Mumbo Leads")
- **Site URL**: Full URL (e.g., "https://www.mumboleads.com")
- **Default Meta Title**: Fallback title for pages (max 60 chars)
- **Default Meta Description**: Fallback description (50-160 chars)
- **Default OG Image**: Social sharing image (1200x630px)

#### Keywords & Author
- **Site Keywords**: Main keywords (max 10)
- **Default Author**: Content author name
- **Twitter Handle**: Your @username for Twitter cards

#### Search Console Verification
- **Google Verification**: Google Search Console verification code
- **Bing Verification**: Bing Webmaster verification code

### Structured Data (JSON-LD)
Configure rich results for search engines:

- **Organization Name**: Your company name
- **Organization Type**: Corporation, Local Business, etc.
- **Logo**: Company logo for search results
- **Business Address**: Full address for local SEO
- **Contact Information**: Phone, email, contact type
- **Social Media Profiles**: All social media URLs

### Robots.txt Settings
- **Allow All Robots**: Toggle search engine crawling
- **Disallow Paths**: Paths to block (e.g., `/admin`, `/api`)
- **Custom robots.txt**: Override with custom content

### Sitemap Settings
- **Enable Sitemap**: Toggle sitemap generation
- **Exclude Paths**: Paths to exclude from sitemap
- **Default Priority**: Page importance (0.0 to 1.0)
- **Change Frequency**: How often pages update

## 🖼️ Image SEO

### Image Optimization Requirements
Every image uploaded to Sanity now **REQUIRES**:

1. **Alt Text** (Required)
   - 10-125 characters
   - Describe the image clearly
   - Include relevant keywords naturally
   - Example: "B2B sales team discussing lead generation strategy"

2. **Caption** (Optional)
   - Visible text below image
   - Provides context

3. **Title** (Optional)
   - Tooltip on hover
   - Additional context

### How to Add SEO-Optimized Images in Sanity

When uploading ANY image in Sanity:
1. Click on the image field
2. Upload your image
3. **Fill in the Alt Text field** (this is required!)
4. Optionally add Caption and Title
5. Save/Publish

**Note**: The system will prevent you from publishing if Alt text is missing!

## 🗺️ Sitemap

### Automatic Generation
Your sitemap is automatically generated at `/sitemap.xml`

### What's Included:
- Homepage (priority: 1.0)
- About page (priority: 0.8)
- All blog posts (priority: 0.7)
- All case studies (priority: 0.7)
- Blog index (if posts exist)
- Case studies index (if case studies exist)

### Testing Your Sitemap:
Visit: `https://your-domain.com/sitemap.xml`

## 🤖 Robots.txt

### AI Crawler Friendly
Your site explicitly welcomes AI crawlers including:
- GPTBot (OpenAI/ChatGPT)
- ClaudeBot (Anthropic)
- Google-Extended (Bard/Gemini)
- PerplexityBot
- And more!

### Protected Paths:
- `/studio/` - Sanity Studio (not indexed)
- `/api/` - API routes (not indexed)

### Testing Your Robots.txt:
Visit: `https://your-domain.com/robots.txt`

## 📝 How to Use This System

### For Marketing Team:

#### Setting Up Google Analytics:
1. Go to Sanity Studio → Analytics & Tracking
2. Toggle "Enable GA4" to ON
3. Enter your GA4 Measurement ID
4. Click "Publish"
5. Done! Tracking is now live.

#### Setting Up Mixpanel:
1. Go to Sanity Studio → Analytics & Tracking
2. Toggle "Enable Mixpanel" to ON
3. Enter your Mixpanel Project Token
4. Click "Publish"
5. Done!

#### Adding Custom Tracking Scripts:
1. Go to Sanity Studio → Analytics & Tracking
2. Scroll to "Custom Tracking Scripts"
3. Click "+ Add" under Head Scripts or Body Scripts
4. Enter a name (for your reference)
5. Paste the tracking code
6. Toggle "Enabled" to ON
7. Click "Publish"

### For Content Team:

#### Optimizing Page SEO:
1. Go to Sanity Studio → SEO Settings
2. Update default meta title and description
3. Upload a compelling OG image for social sharing
4. Add relevant keywords
5. Fill in structured data for rich results
6. Click "Publish"

#### Adding SEO-Optimized Images:
1. When creating content (blog post, case study, etc.)
2. Upload your image
3. **IMPORTANT**: Fill in the Alt Text field
4. Add caption if needed
5. Publish

### For Developers:

#### Environment Variables:
Add to your `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://www.mumboleads.com
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

#### Testing Analytics Locally:
1. Enable analytics in Sanity Studio
2. Run `npm run dev`
3. Open browser console
4. Navigate pages - check for tracking events

## 🚀 Deployment Checklist

Before going live, ensure:

- [ ] Google Analytics enabled and tested
- [ ] Meta title and description set
- [ ] OG image uploaded (1200x630px)
- [ ] All images have Alt text
- [ ] Structured data configured
- [ ] Google Search Console verified
- [ ] Site URL set correctly in SEO Settings
- [ ] Robots.txt allows crawling
- [ ] Sitemap is accessible
- [ ] Social media profiles added to structured data

## 🔧 Advanced Features

### Dynamic Sitemap
The sitemap auto-updates when you:
- Publish new blog posts
- Publish new case studies
- Update existing content

### AI-Friendly
Your site is optimized for AI search engines and can be used for:
- ChatGPT web browsing
- Perplexity search results
- Claude web search
- Google Bard/Gemini
- And future AI search engines

### Performance Optimized
- Analytics load after page interactive (doesn't slow initial load)
- Images lazy-load automatically
- Scripts async-loaded for better performance

## 📞 Support

### Common Issues:

**Q: Analytics not showing data?**
A: Check that you've published changes in Sanity and wait 24-48 hours for data to appear.

**Q: Images missing alt text error?**
A: All images require alt text now. Go back and add descriptive alt text to each image.

**Q: Sitemap not updating?**
A: The sitemap updates on each build. Redeploy your site to regenerate.

**Q: Can I have multiple analytics tools?**
A: Yes! Enable as many as you need. They work together without conflicts.

### Need Help?
Refer to the individual tool documentation:
- [Google Analytics](https://analytics.google.com)
- [Mixpanel](https://mixpanel.com/help)
- [Microsoft Clarity](https://clarity.microsoft.com/help)
- [Hotjar](https://help.hotjar.com)

---

**Last Updated**: January 2025
**Maintained by**: Development Team
