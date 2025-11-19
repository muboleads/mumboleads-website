# Deployment Guide

Complete guide to deploying your Nerdy Joe landing page to production on Vercel.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Sanity CMS project set up and deployed
- [ ] Cal.com account configured
- [ ] Assets optimized and uploaded
- [ ] Custom domain ready (optional)
- [ ] Google Analytics set up (optional)

## Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
# Initialize git if you haven't already
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Nerdy Joe landing page"

# Add your remote repository
git remote add origin <your-github-repo-url>

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. Add environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_CAL_LINK=your-cal-username/consultation
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

6. Click "Deploy"

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts and select settings:
# - Link to existing project? No
# - What's your project's name? nerdyjoe-clone
# - In which directory is your code located? ./
# - Want to override settings? No

# Production deployment
vercel --prod
```

### 3. Configure Custom Domain

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `nerdyjoe.com`)
4. Follow DNS configuration instructions:

   **For Nameserver Configuration:**
   - Point your nameservers to Vercel's nameservers

   **For A Record Configuration:**
   - Add an A record pointing to Vercel's IP: `76.76.21.21`
   - Add CNAME for www: `cname.vercel-dns.com`

5. Wait for DNS propagation (can take up to 48 hours, usually faster)

### 4. Set Up Sanity CMS

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Navigate to sanity directory
cd sanity

# Login to Sanity
sanity login

# Initialize Sanity (if not already done)
sanity init

# Deploy Sanity Studio
sanity deploy

# Your studio will be available at: https://your-project.sanity.studio
```

### 5. Configure Sanity CORS

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to "API" → "CORS Origins"
4. Add your domains:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
   - `https://www.yourdomain.com` (www subdomain)
   - `https://your-project.vercel.app` (Vercel preview)

5. Check "Allow credentials"

### 6. Set Up Cal.com

1. Log in to [Cal.com](https://cal.com)
2. Create an event type:
   - Name: "Consultation" or "Discovery Call"
   - Duration: 30 minutes (or your preference)
   - Location: Zoom, Google Meet, or Phone
3. Copy your booking link
4. Update environment variable in Vercel:
   - `NEXT_PUBLIC_CAL_LINK=your-username/consultation`
5. Update the Cal.com embed in `/components/booking/cal-modal.tsx`

### 7. Configure Analytics (Optional)

#### Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Add GA script to `/app/layout.tsx` (if not already present)

#### Vercel Analytics

1. Go to your Vercel project
2. Navigate to "Analytics" tab
3. Click "Enable Vercel Analytics"
4. Free for hobby projects, includes:
   - Page views
   - Top pages
   - Top referrers
   - Web Vitals

### 8. SEO Configuration

#### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (your domain)
3. Verify ownership:
   - DNS verification (recommended)
   - Or HTML file upload
4. Submit your sitemap: `https://yourdomain.com/sitemap.xml`

#### Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add your site
3. Verify via DNS or HTML file
4. Submit sitemap

### 9. Performance Monitoring

#### Vercel Speed Insights

Enable in Vercel dashboard:
1. Go to project settings
2. Navigate to "Speed Insights"
3. Enable for production
4. View real-user metrics

#### Lighthouse CI (Optional)

Add to GitHub Actions for automated performance testing:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://yourdomain.com
          uploadArtifacts: true
```

### 10. Post-Deployment Testing

Test these features after deployment:

- [ ] Homepage loads correctly
- [ ] All images display properly
- [ ] Navigation links work
- [ ] "Book a Call" button opens Cal.com modal
- [ ] Blog page loads (even if empty)
- [ ] SEO meta tags present (view page source)
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Mobile responsiveness
- [ ] Page speed (run Lighthouse test)

### 11. Monitoring & Maintenance

#### Regular Tasks

- **Weekly**: Check Vercel Analytics for traffic patterns
- **Monthly**: Review Core Web Vitals in Speed Insights
- **Quarterly**: Update dependencies (`npm update`)
- **As needed**: Add blog posts via Sanity Studio

#### Troubleshooting Common Issues

**Build Fails:**
- Check environment variables are set correctly
- Review build logs in Vercel dashboard
- Test build locally: `npm run build`

**Images Not Loading:**
- Verify images exist in `/public/media/`
- Check Next.js Image configuration in `next.config.js`
- Clear Vercel cache and redeploy

**Sanity Content Not Appearing:**
- Verify Sanity project ID in environment variables
- Check CORS settings in Sanity dashboard
- Ensure content is published in Sanity Studio

**Calendar Modal Not Working:**
- Verify Cal.com script loads (check browser console)
- Update Cal.com link in modal component
- Test Cal.com link directly

## Environment Variables Reference

Required variables for production:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz  # From sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production

# Calendar Booking
NEXT_PUBLIC_CAL_LINK=username/consultation  # Your Cal.com booking link

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com  # Your production URL

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics
```

## Continuous Deployment

Vercel automatically:
- Deploys on every push to `main` branch
- Creates preview deployments for pull requests
- Runs build checks before deployment
- Invalidates edge cache on new deployments

To customize:
1. Edit `vercel.json` for build settings
2. Configure branch deployments in Vercel dashboard
3. Set up deployment protection (password, IP allowlist)

## Security Best Practices

1. **Environment Variables**: Never commit `.env.local` to git
2. **API Keys**: Use Vercel environment variables, not hardcoded values
3. **CORS**: Only allow your production domains in Sanity
4. **Headers**: Security headers configured in `vercel.json`
5. **Dependencies**: Regularly update with `npm audit fix`

## Scaling Considerations

As your site grows:

1. **Vercel Pro**: Upgrade for better performance and analytics
2. **Sanity Growth**: Scale Sanity plan for more API requests
3. **Image CDN**: Consider Cloudinary or Imgix for large image catalogs
4. **Caching**: Implement advanced caching strategies
5. **Edge Functions**: Move API routes to edge for global performance

## Support & Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Sanity Docs**: [sanity.io/docs](https://www.sanity.io/docs)
- **Cal.com Docs**: [cal.com/docs](https://cal.com/docs)

---

**Deployment Complete!** Your site is now live and optimized for #1 rankings. 🎉
