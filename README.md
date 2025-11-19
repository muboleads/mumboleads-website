# Mumbo LEADS - B2B Lead Generation Landing Page

A high-performance, SEO-optimized landing page clone built with Next.js 14, featuring calendar booking integration, headless CMS for blog management, and pixel-perfect design implementation.

## Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **SEO-First Architecture**: JSON-LD schema, optimized meta tags, automatic sitemap/robots.txt
- **Calendar Integration**: Cal.com booking system with modal interface
- **Headless CMS**: Sanity.io for blog content management
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Performance Optimized**: Image optimization, lazy loading, Core Web Vitals optimized
- **Accessible**: WCAG 2.1 AA compliant components

## Live Demo

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mumbo-leads-clone)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Sanity.io account (free tier available)
- A Cal.com account (optional, for calendar booking)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mumbo-leads-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your values:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_CAL_LINK=your-cal-username/consultation
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Sanity CMS Setup

### 1. Create a Sanity Project

```bash
npm install -g @sanity/cli
sanity init
```

Follow the prompts to create a new project.

### 2. Configure Sanity

The blog schema is already defined in `/sanity/schemas/post.ts`. To start the Sanity Studio:

```bash
cd sanity
sanity start
```

This will start the Sanity Studio at `http://localhost:3333`.

### 3. Deploy Sanity Studio

```bash
sanity deploy
```

Your studio will be available at `https://your-project.sanity.studio`.

### 4. Add Your Project ID

Update `.env.local` with your Sanity project ID from https://www.sanity.io/manage.

## Cal.com Integration

### 1. Set Up Cal.com

1. Create a free account at [Cal.com](https://cal.com)
2. Set up your event type (e.g., "Consultation")
3. Get your booking link (format: `username/event-type`)

### 2. Configure Calendar Modal

Update the Cal.com link in `/components/booking/cal-modal.tsx`:

```tsx
data-cal-link="your-username/consultation"
```

Or use the environment variable in `.env.local`:

```env
NEXT_PUBLIC_CAL_LINK=your-username/consultation
```

## Deployment to Vercel

### Option 1: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com/new)
3. Configure environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_CAL_LINK`
   - `NEXT_PUBLIC_SITE_URL`

4. Deploy!

### Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain and follow DNS configuration instructions

## Project Structure

```
mumbo-leads-clone/
├── app/                      # Next.js App Router
│   ├── blog/                 # Blog pages
│   │   ├── [slug]/          # Dynamic blog post pages
│   │   └── page.tsx         # Blog listing page
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt configuration
├── components/
│   ├── booking/             # Calendar booking components
│   ├── layout/              # Header, Footer
│   ├── sections/            # Landing page sections
│   ├── seo/                 # SEO components (JSON-LD)
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── cal-context.tsx      # Calendar modal context
│   ├── sanity.ts            # Sanity client & helpers
│   └── utils.ts             # Utility functions
├── sanity/
│   └── schemas/             # Sanity content schemas
├── public/
│   └── media/               # Images and assets
└── types/                   # TypeScript type definitions
```

## SEO Optimization

### Built-in SEO Features

- **Meta Tags**: Comprehensive meta tags for all pages
- **Open Graph**: Social media preview optimization
- **Twitter Cards**: Twitter-specific metadata
- **JSON-LD Schema**: Structured data for search engines
  - Organization schema
  - Service schema
  - FAQ schema
- **Sitemap**: Automatically generated XML sitemap
- **Robots.txt**: Search engine crawling configuration
- **Canonical URLs**: Prevent duplicate content issues

### SEO Best Practices Implemented

1. **Semantic HTML**: Proper heading hierarchy (H1-H6)
2. **Alt Text**: All images have descriptive alt attributes
3. **Mobile-First**: Responsive design for all devices
4. **Fast Loading**: Optimized images, code splitting, lazy loading
5. **Internal Linking**: Strategic internal link structure
6. **Core Web Vitals**: Optimized for Google's performance metrics

### Customizing SEO

Update SEO content in:
- `/app/layout.tsx` - Site-wide metadata
- `/app/page.tsx` - Homepage metadata
- `/components/seo/json-ld.tsx` - Structured data

## Performance Optimization

- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Code Splitting**: Automatic code splitting per route
- **Lazy Loading**: Below-the-fold content lazy loaded
- **Edge Functions**: API routes deployed to edge for low latency
- **Static Generation**: Pre-rendered pages for instant load times
- **ISR**: Incremental Static Regeneration for blog posts (1-hour revalidation)

## Customization

### Colors & Branding

Update brand colors in `/tailwind.config.ts`:

```ts
colors: {
  primary: {
    700: '#7c3aed', // Your primary color
  },
  // ... other colors
}
```

### Content

- **Hero Section**: Edit `/components/sections/hero.tsx`
- **Services**: Edit `/components/sections/help.tsx`
- **FAQ**: Edit `/components/sections/faq.tsx`
- **Footer**: Edit `/components/layout/footer.tsx`

### Assets

Replace images in `/public/media/` with your own assets.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Calendar**: Cal.com
- **Deployment**: Vercel
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: info@mumbo-leads.com

## Acknowledgments

- Design inspiration from the original Mumbo LEADS website
- Built with modern web technologies for optimal performance and SEO

---

**Ready to rank #1?** Deploy this site to Vercel and start generating leads! 🚀
