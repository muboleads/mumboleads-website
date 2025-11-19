# Complete Sanity.io Guide for Nerdy Joe

## What is Sanity and Why Do We Use It?

**Sanity.io** is a headless CMS (Content Management System) that allows you to:
- ✅ **Write blog posts** without touching code
- ✅ **Update content** without redeploying your website
- ✅ **Manage images** with automatic optimization
- ✅ **Preview content** before publishing
- ✅ **Collaborate** with team members

**Think of it like WordPress admin, but better:**
- Modern, fast interface
- Structured content (not messy HTML)
- Real-time API
- Free tier (100K API requests/month)

---

## How It Works

```
┌──────────────────────────────────────────────────────────────────┐
│                         THE FLOW                                  │
└──────────────────────────────────────────────────────────────────┘

1. YOU WRITE                    2. SANITY STORES               3. WEBSITE DISPLAYS
   ┌─────────────┐                 ┌──────────┐                  ┌─────────────┐
   │ Sanity      │    Publish      │ Sanity   │     API Fetch    │ Your Next.js│
   │ Studio      │─────────────>   │ Cloud    │─────────────>    │ Website     │
   │             │                 │ Database │                  │             │
   │ Write post  │                 │ Stores   │                  │ Shows post  │
   │ Add images  │                 │ Content  │                  │ to visitors │
   │ Set SEO     │                 │          │                  │             │
   └─────────────┘                 └──────────┘                  └─────────────┘

   localhost:3000/studio          sanity.io cloud              localhost:3000/blog
```

---

## Setup Instructions

### Step 1: Install Sanity Dependencies

```bash
cd /Users/nkosinathindwandwe/DevOps/Nerd/nerdyjoe-clone

# Install the new Sanity dependencies
npm install
```

This installs:
- `sanity` - Core Sanity library
- `@sanity/vision` - Query testing tool
- `next-sanity` - Next.js integration
- `styled-components` - Required by Sanity Studio

---

### Step 2: Create Sanity Project

**Option A: Via CLI (Recommended)**

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity (opens browser)
sanity login

# Create a new project
sanity init --project-plan free
```

When prompted:
- **Project name**: "Nerdy Joe Blog"
- **Use default dataset?**: Yes (production)
- **Output path**: Press Enter (uses current directory)
- **Select project template**: Clean project with no predefined schemas

**Save these values:**
- **Project ID**: `abc123xyz` (you'll get your actual ID)
- **Dataset**: `production`

---

**Option B: Via Sanity Website**

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click "Create Project"
3. Name it "Nerdy Joe Blog"
4. Copy the **Project ID**

---

### Step 3: Configure Environment Variables

Update your `.env.local` file:

```bash
# Open .env.local
nano .env.local
```

Add your Sanity credentials:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz  # Replace with YOUR project ID
NEXT_PUBLIC_SANITY_DATASET=production

# Cal.com (configure later)
NEXT_PUBLIC_CAL_LINK=your-cal-username/consultation

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Save and close** (Ctrl+X, then Y, then Enter)

---

### Step 4: Start Your Development Server

```bash
# Start Next.js dev server
npm run dev
```

Open your browser to:
- **Website**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

---

## Using Sanity Studio

### Accessing the Studio

1. **Local Development**: http://localhost:3000/studio
2. **Production**: https://yourdomain.com/studio

### First Time Setup

When you first open the studio:
1. You'll see the Sanity interface
2. Click on **"Post"** in the sidebar
3. You'll see an empty list (no blog posts yet)

---

## Creating Your First Blog Post

### Step-by-Step:

1. **Open Studio**: http://localhost:3000/studio

2. **Click "Post"** in the left sidebar

3. **Click "Create new Post"** (big + button)

4. **Fill in the fields:**

   ```
   ┌─────────────────────────────────────────────────┐
   │ Title *                                         │
   │ ┌─────────────────────────────────────────────┐ │
   │ │ How to Generate 100+ B2B Leads per Month    │ │
   │ └─────────────────────────────────────────────┘ │
   │                                                 │
   │ Slug *                          [Generate]      │
   │ ┌─────────────────────────────────────────────┐ │
   │ │ how-to-generate-100-b2b-leads-per-month     │ │
   │ └─────────────────────────────────────────────┘ │
   │                                                 │
   │ Author                                          │
   │ ┌─────────────────────────────────────────────┐ │
   │ │ John Doe                                    │ │
   │ └─────────────────────────────────────────────┘ │
   │                                                 │
   │ Main Image                     [Upload Image]   │
   │                                                 │
   │ Excerpt                                         │
   │ ┌─────────────────────────────────────────────┐ │
   │ │ Learn our proven strategies for generating  │ │
   │ │ qualified B2B leads consistently...         │ │
   │ └─────────────────────────────────────────────┘ │
   │                                                 │
   │ Categories                        [+ Add]       │
   │ - Lead Generation                               │
   │ - B2B Marketing                                 │
   │                                                 │
   │ Published at                                    │
   │ [2024-11-19] [09:00]                           │
   │                                                 │
   │ Body (Rich Text Editor)                         │
   │ ┌─────────────────────────────────────────────┐ │
   │ │ ## Introduction                             │ │
   │ │                                             │ │
   │ │ In this comprehensive guide, we'll show...  │ │
   │ │                                             │ │
   │ │ [Add Image] [Add Quote] [Add Code]         │ │
   │ └─────────────────────────────────────────────┘ │
   │                                                 │
   │ SEO (Expand to see fields)          [▼]        │
   │   Meta Title                                    │
   │   Meta Description                              │
   │   Meta Keywords                                 │
   │                                                 │
   │            [Save Draft]    [Publish]            │
   └─────────────────────────────────────────────────┘
   ```

5. **Fill in SEO fields** (expand the SEO section):
   - **Meta Title**: "How to Generate 100+ B2B Leads | Nerdy Joe"
   - **Meta Description**: "Learn proven strategies for generating qualified B2B leads. Our guide covers cold email, targeting, and conversion optimization."
   - **Meta Keywords**: lead generation, B2B leads, cold email, sales

6. **Click "Publish"** (top right)

---

## What Happens When You Publish?

1. **Sanity saves** your post to their cloud database
2. **Your Next.js site** can now fetch this post via API
3. **The blog page** will show your post automatically
4. **No redeployment needed!**

---

## Viewing Your Blog Post

### On the Website:

1. Go to: http://localhost:3000/blog
2. You'll see your post in the grid
3. Click on it to read the full post
4. The URL will be: http://localhost:3000/blog/how-to-generate-100-b2b-leads-per-month

### How It Works Behind the Scenes:

```javascript
// This happens automatically when someone visits /blog

// 1. Next.js calls getPosts() from lib/sanity.ts
const posts = await getPosts()

// 2. Sanity API returns your posts
// [
//   {
//     title: "How to Generate 100+ B2B Leads",
//     slug: "how-to-generate-100-b2b-leads-per-month",
//     excerpt: "Learn our proven strategies...",
//     ...
//   }
// ]

// 3. Next.js renders the blog listing page with your posts
```

---

## Content Structure (Schema)

Your blog posts have this structure (defined in `/sanity/schemas/post.ts`):

```typescript
{
  title: "Post Title",              // Required
  slug: "post-url-slug",            // Required, auto-generated
  author: "Author Name",            // Optional
  mainImage: {...},                 // Optional, featured image
  excerpt: "Short summary...",      // Optional
  categories: ["Cat1", "Cat2"],     // Optional tags
  publishedAt: "2024-11-19",        // Auto-set to today
  body: [...],                      // Rich text content
  seo: {
    metaTitle: "SEO Title",
    metaDescription: "SEO desc...",
    metaKeywords: ["kw1", "kw2"]
  }
}
```

---

## Advanced Features

### Rich Text Editing (Body Field)

The body editor supports:

**Text Formatting:**
- Bold, italic, underline
- Headings (H1, H2, H3)
- Lists (bullet and numbered)
- Block quotes

**Media:**
- Images (drag and drop)
- Code blocks
- Links

**Example:**
```
## Step 1: Identify Your ICP

Start by clearly defining your Ideal Customer Profile:

- Industry and company size
- Decision makers and job titles
- Pain points and goals

![ICP Diagram](upload your image here)

Next, we'll show you how to...
```

### Adding Images

1. Click the **image icon** in the body editor
2. Upload an image or select from media library
3. Add alt text for SEO
4. Image is automatically optimized by Sanity

### Categories/Tags

Add categories to organize posts:
1. In the Categories field, type a category name
2. Press Enter to add
3. Add multiple categories
4. They'll appear as tags on the blog listing

### SEO Optimization

Always fill in SEO fields:
- **Meta Title**: 50-60 characters, include main keyword
- **Meta Description**: 150-160 characters, compelling summary
- **Meta Keywords**: 5-10 relevant keywords

---

## Production Workflow

### Local to Production:

**Development (Local):**
```bash
npm run dev
# Edit content at http://localhost:3000/studio
```

**Staging/Testing:**
```bash
npm run build  # Test the build
npm start      # Preview production mode
```

**Production:**
1. Push code to GitHub/Vercel
2. Content updates via studio automatically appear
3. No need to redeploy for content changes!

### Content Updates:

**To update a blog post:**
1. Go to https://yourdomain.com/studio
2. Find the post in the list
3. Edit and click "Publish"
4. Changes appear on site within seconds (thanks to ISR)

**ISR (Incremental Static Regeneration):**
- Blog posts rebuild every 1 hour automatically
- Or immediately when content changes
- Configured in `/app/blog/page.tsx`:
  ```typescript
  export const revalidate = 3600 // 1 hour
  ```

---

## Managing CORS (Security)

Sanity needs to allow your domains to access the API.

### Configure CORS:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Click "API" in the sidebar
4. Click "CORS Origins"
5. Add these origins:
   ```
   http://localhost:3000        (development)
   https://yourdomain.com       (production)
   https://www.yourdomain.com   (www subdomain)
   https://*.vercel.app         (Vercel previews)
   ```
6. Check **"Allow credentials"** for each
7. Click "Add origin"

---

## Common Tasks

### Task 1: Create a Blog Post

```bash
1. Open http://localhost:3000/studio
2. Click "Post" → "Create"
3. Fill in title, content, SEO
4. Upload featured image
5. Click "Publish"
6. View at http://localhost:3000/blog
```

### Task 2: Edit Existing Post

```bash
1. Open studio
2. Click on the post in the list
3. Make changes
4. Click "Publish" again
5. Changes appear on site automatically
```

### Task 3: Delete a Post

```bash
1. Open studio
2. Click on the post
3. Click "..." menu (top right)
4. Select "Delete"
5. Confirm deletion
```

### Task 4: Upload Images

**For featured images:**
1. In the "Main image" field
2. Click "Upload"
3. Select image from computer
4. Image is auto-optimized

**For images in content:**
1. In the body editor, click image icon
2. Upload or select from library
3. Add alt text
4. Image appears in content

---

## Troubleshooting

### "Dataset not found" Error

**Problem:** Sanity project not configured

**Solution:**
```bash
# Check .env.local has correct values
cat .env.local

# Should show:
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-id  # Not "your-project-id"
NEXT_PUBLIC_SANITY_DATASET=production
```

### Studio Shows Blank Page

**Problem:** Wrong project ID or CORS not configured

**Solution:**
1. Verify project ID in `.env.local`
2. Add CORS origins in Sanity dashboard
3. Restart dev server: `npm run dev`

### Blog Posts Not Appearing

**Problem:** Content not published or API error

**Solution:**
1. Check posts are **Published** (not just saved as draft)
2. Check browser console for errors
3. Verify `npm run dev` is running
4. Check Sanity project has posts

### Images Not Loading

**Problem:** Image URLs not resolving

**Solution:**
1. Verify images uploaded to Sanity (not just local files)
2. Check `urlFor()` function in `lib/sanity.ts`
3. Ensure image has `.asset` property

---

## Example: Full Blog Post Workflow

Let's create a complete blog post:

### 1. Write the Post

**Title:** "5 Cold Email Strategies That Generated 1000+ Leads"

**Slug:** (auto-generated) "5-cold-email-strategies"

**Author:** "Nerdy Joe Team"

**Excerpt:**
```
Discover the exact cold email strategies we used to generate over
1,000 qualified leads for B2B companies. Proven tactics you can
implement today.
```

**Categories:**
- Cold Email
- Lead Generation
- B2B Sales

**Body:**
```markdown
## Introduction

Cold email is dead. Or is it?

Despite what you might have heard, cold email remains one of the
most effective channels for B2B lead generation—when done right.

In this guide, we'll share 5 strategies that generated over 1,000
qualified leads for our clients.

## Strategy 1: Hyper-Personalization

Gone are the days of "Dear [First Name]" emails. True personalization
means:

- Researching each prospect's company
- Referencing recent news or achievements
- Addressing specific pain points

**Example:**
"I noticed [Company] just raised Series B funding. With your team
growing from 50 to 200, lead gen probably became a bottleneck..."

[Add image: Example of personalized email]

## Strategy 2: Solve a Problem in Your Subject Line

Your subject line should...

[Continue with remaining strategies]
```

**SEO Fields:**
- **Meta Title:** "5 Cold Email Strategies That Generated 1000+ Leads | Nerdy Joe"
- **Meta Description:** "Learn the proven cold email tactics that generated over 1,000 qualified B2B leads. Includes examples, templates, and step-by-step implementation."
- **Meta Keywords:** cold email, B2B leads, email outreach, lead generation, sales email

### 2. Add Images

Upload 3-5 images:
- Featured image (screenshot of email metrics)
- Example email templates
- Before/after results

### 3. Publish

Click **"Publish"** button

### 4. Verify

Go to http://localhost:3000/blog

You should see your new post!

### 5. Share

The URL will be:
```
http://localhost:3000/blog/5-cold-email-strategies
```

---

## Best Practices

### Content Strategy:

1. **Publish consistently** - 2-4 posts per month minimum
2. **Focus on SEO** - Always fill meta fields
3. **Use images** - Posts with images get 94% more views
4. **Internal linking** - Link to other blog posts
5. **Categories** - Keep them consistent

### SEO Tips:

1. **Keywords in title** - Front-load important keywords
2. **Long-form content** - Aim for 1,500+ words
3. **Headers** - Use H2, H3 for structure
4. **Alt text** - Add descriptive alt text to all images
5. **Meta description** - Make it compelling, include CTA

### Writing Tips:

1. **Hook first** - Grab attention in first paragraph
2. **Subheadings** - Break content into scannable sections
3. **Examples** - Include real examples and case studies
4. **Actionable** - Give readers specific takeaways
5. **CTA** - End with clear call-to-action

---

## Cost & Limits

### Sanity Free Tier:

- ✅ **Unlimited documents** (blog posts)
- ✅ **3 users** (team members)
- ✅ **100K API requests/month** (plenty for most sites)
- ✅ **5GB bandwidth/month**
- ✅ **500MB assets** (images/files)

**For most blogs, free tier is enough!**

### If You Grow:

- **Growth plan**: $99/month
  - 1M API requests
  - 10 users
  - 100GB bandwidth
  - 5GB assets

---

## Summary

**Sanity.io gives you:**
- 🎨 Beautiful admin interface
- 📝 Easy content management
- 🚀 Real-time updates (no redeployment)
- 🎯 SEO-friendly structure
- 💰 Free for most use cases
- 🔒 Secure and scalable

**Your workflow:**
1. Write posts in Sanity Studio
2. Content auto-appears on your site
3. No code changes needed
4. Focus on creating great content!

---

**Ready to create your first post?**

```bash
npm run dev
# Then open http://localhost:3000/studio
```

Happy blogging! 🚀
