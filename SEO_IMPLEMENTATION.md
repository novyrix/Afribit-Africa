# SEO Implementation Guide

## Overview

Comprehensive SEO implementation for Afribit Africa website including metadata, Open Graph tags, JSON-LD structured data, sitemaps, and robots.txt configuration.

## ✅ Implemented Features

### 1. Dynamic Metadata System

**File**: `src/lib/metadata.ts`

Centralized metadata generation with the `generateMetadata()` function:

```typescript
generateMetadata({
  title: 'Page Title',
  description: 'Page description',
  path: '/page-url',
  image: '/images/og-image.jpg',
  type: 'website',
  keywords: ['keyword1', 'keyword2'],
})
```

**Features**:
- Automatic title templates (`Page Title | Afribit Africa`)
- Default keyword injection
- Open Graph tag generation
- Twitter Card support
- Canonical URL automation
- Robots meta tag configuration
- Google Search Console verification

### 2. Structured Data (JSON-LD)

**Component**: `src/components/StructuredData.tsx`

Implements 7 schema types:

#### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Afribit Africa",
  "url": "https://afribit.africa",
  "logo": "https://afribit.africa/images/logo.png",
  "foundingDate": "2020",
  "sameAs": [
    "https://twitter.com/AfribitAfrica",
    "https://facebook.com/AfribitAfrica"
  ]
}
```

#### Website Schema
Enables Google Search Box integration

#### Breadcrumb Schema
Applied to all pages for navigation hierarchy

#### FAQ Schema
For donate page FAQ section

#### Donation Schema
Special schema for donation actions

#### Event Schema
For timeline events and milestones

#### Article Schema
For blog posts (future implementation)

### 3. Sitemap Generation

**File**: `src/app/sitemap.ts`

Dynamic XML sitemap generation:
- **Static Routes**: /, /about, /donate, /programs, /contact
- **Dynamic Routes**: /programs/[slug] (pulled from database)
- **Priorities**: Homepage (1.0), Donate (0.9), Others (0.7-0.8)
- **Change Frequencies**: Weekly for active pages, monthly for static
- **Last Modified**: Pulled from database timestamps

Accessible at: `https://afribit.africa/sitemap.xml`

### 4. Robots.txt

**File**: `src/app/robots.ts`

Configuration:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

Sitemap: https://afribit.africa/sitemap.xml
```

Accessible at: `https://afribit.africa/robots.txt`

### 5. Page-Specific Metadata

#### Homepage (`/`)
- **Title**: "Afribit Africa"
- **Description**: Complete mission statement
- **Schema**: Organization, Website, Breadcrumb

#### About Page (`/about`)
- **Title**: "About Us | Afribit Africa"
- **Description**: Mission, vision, team info
- **Schema**: Organization, Breadcrumb
- **Keywords**: team, vision, impact, timeline, partners

#### Donate Page (`/donate`)
- **Title**: "Donate | Afribit Africa"
- **Description**: Donation methods and impact
- **Schema**: Donation, FAQ, Breadcrumb
- **Keywords**: Bitcoin donation, cryptocurrency donation, Lightning Network

#### Programs Page (`/programs`)
- **Title**: "Our Programs | Afribit Africa"
- **Description**: All 5 programs overview
- **Schema**: Breadcrumb
- **Keywords**: Bitcoin education, Boda-Boda, waste management, business accelerator

#### Programs Detail (`/programs/[slug]`)
- **Dynamic Titles**: e.g., "Bitcoin Education Program | Afribit Africa"
- **Dynamic Descriptions**: From program data
- **Schema**: Breadcrumb with program path
- **Dynamic Keywords**: Based on program category

#### Contact Page (`/contact`)
- **Title**: "Contact Us | Afribit Africa"
- **Description**: Contact methods
- **Schema**: Organization, Breadcrumb

### 6. Open Graph Tags

Every page includes:
- `og:type` - website/article
- `og:locale` - en_US
- `og:url` - Canonical URL
- `og:site_name` - Afribit Africa
- `og:title` - Page-specific title
- `og:description` - Page-specific description
- `og:image` - 1200x630px image
- `og:image:width` - 1200
- `og:image:height` - 630
- `og:image:alt` - Alt text

### 7. Twitter Cards

Every page includes:
- `twitter:card` - summary_large_image
- `twitter:site` - @AfribitAfrica
- `twitter:creator` - @AfribitAfrica
- `twitter:title` - Page-specific title
- `twitter:description` - Page-specific description
- `twitter:image` - Same as OG image

### 8. Canonical URLs

Automatic canonical URL generation prevents duplicate content:
```html
<link rel="canonical" href="https://afribit.africa/page-url" />
```

## 📸 Open Graph Images

### Required Images

Create these images in `/public/images/`:

1. **Default OG Image** (`og-default.jpg`)
   - Size: 1200x630px
   - Content: Afribit logo + tagline
   - Used as fallback for all pages

2. **Page-Specific Images** (Optional but recommended):
   - `og-home.jpg` - Homepage hero
   - `og-about.jpg` - Team photo
   - `og-donate.jpg` - Bitcoin donation visual
   - `og-programs.jpg` - Programs overview
   - `og-contact.jpg` - Contact banner

3. **Program-Specific Images**:
   - `og-bitcoin-education.jpg`
   - `og-boda-boda.jpg`
   - `og-waste-management.jpg`
   - `og-business-accelerator.jpg`
   - `og-equipment-scaling.jpg`

### Image Guidelines

**Dimensions**: 1200x630px (1.91:1 ratio)
**Format**: JPG or PNG (JPG preferred for smaller file size)
**File Size**: < 1MB (ideally < 300KB)
**Safe Zone**: Keep text/logos in center 1200x600px area

**Design Tips**:
- Include Afribit logo
- Use brand colors (orange #f97316)
- Add short tagline
- Avoid small text (won't be readable in previews)
- Test on Facebook Sharing Debugger and Twitter Card Validator

### Image Creation Tools

**Free Options**:
- Canva (templates available)
- Figma (design from scratch)
- Remove.bg (background removal)

**Paid Options**:
- Adobe Photoshop
- Adobe Illustrator

### Template Sizes for Other Platforms

- **Facebook**: 1200x630px ✅ (covered)
- **Twitter**: 1200x675px (similar)
- **LinkedIn**: 1200x627px (similar)
- **WhatsApp**: Uses same OG tags ✅

## 🔍 Search Console Setup

### Google Search Console

1. **Verify Ownership**:
   - Add verification code to `.env`:
     ```env
     GOOGLE_SITE_VERIFICATION="your-verification-code"
     ```
   - Or upload verification file to `/public/`
   - Or add DNS TXT record

2. **Submit Sitemap**:
   - URL: `https://afribit.africa/sitemap.xml`
   - Resubmit after major content updates

3. **Monitor**:
   - Index coverage
   - Search queries
   - Click-through rates
   - Mobile usability

### Bing Webmaster Tools

1. Import from Google Search Console (recommended)
2. Or manually verify with meta tag
3. Submit sitemap

## 📊 SEO Checklist

### On-Page SEO ✅
- [x] Title tags (unique per page)
- [x] Meta descriptions (unique per page)
- [x] Heading hierarchy (H1 → H6)
- [x] Alt text for images
- [x] Internal linking
- [x] Mobile responsiveness
- [x] Page speed optimization
- [x] HTTPS enabled
- [x] Canonical URLs

### Technical SEO ✅
- [x] XML sitemap generated
- [x] Robots.txt configured
- [x] Structured data (JSON-LD)
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Favicon
- [x] 404 page (Next.js default)
- [x] Clean URL structure

### Content SEO ⏳
- [ ] Keyword research completed
- [ ] Content optimized for target keywords
- [ ] Long-form content (1000+ words)
- [ ] Blog/news section (future)
- [ ] Regular content updates

### Local SEO ⏳
- [ ] Google Business Profile
- [ ] NAP consistency (Name, Address, Phone)
- [ ] Local citations
- [ ] Location pages

## 🎯 Target Keywords

### Primary Keywords
1. **Bitcoin Africa** - High volume, competitive
2. **Bitcoin education Africa** - Medium volume, moderate
3. **Bitcoin Uganda** - Medium volume, low competition
4. **Bitcoin donation Africa** - Low volume, low competition
5. **Cryptocurrency Africa** - High volume, competitive

### Long-Tail Keywords
- "Bitcoin financial inclusion Africa"
- "How to accept Bitcoin in Uganda"
- "Bitcoin merchant onboarding Africa"
- "Donate Bitcoin to African charity"
- "Bitcoin education programs Uganda"
- "Boda-Boda Bitcoin payment"

### Keyword Mapping

| Page | Primary Keyword | Secondary Keywords |
|------|----------------|-------------------|
| Homepage | Bitcoin Africa | cryptocurrency Africa, Bitcoin Uganda |
| About | Afribit Africa | Bitcoin education organization |
| Donate | Bitcoin donation Africa | donate Bitcoin, crypto charity |
| Programs | Bitcoin programs Africa | Bitcoin education, merchant onboarding |
| Bitcoin Education | Bitcoin education Africa | learn Bitcoin Uganda |
| Boda-Boda | Boda-Boda Bitcoin | motorcycle Bitcoin payment |

## 🚀 Performance Optimization

### Current Optimizations
- Next.js Image optimization
- Static page generation
- Code splitting
- Tree shaking
- Font optimization (Geist fonts)

### Recommended Additions
- [ ] Compress images (TinyPNG, ImageOptim)
- [ ] Enable Brotli compression on server
- [ ] Add CDN (Vercel Edge Network)
- [ ] Lazy load below-fold content
- [ ] Preload critical resources
- [ ] Add Service Worker for offline support

## 📱 Mobile SEO

### Current Status
- ✅ Responsive design (Tailwind CSS)
- ✅ Mobile-first approach
- ✅ Touch-friendly buttons
- ✅ Readable font sizes

### Testing Tools
- Google Mobile-Friendly Test
- Chrome DevTools Device Mode
- BrowserStack (cross-device testing)

## 🔗 Link Building Strategy

### Internal Linking ✅
- Homepage links to all major pages
- Programs page links to individual programs
- Footer links to all pages
- Breadcrumbs for navigation

### External Linking (To Do)
- [ ] Bitcoin.org (educational resource)
- [ ] Local Uganda news sites
- [ ] Partner organizations
- [ ] Bitcoin podcasts/YouTube channels
- [ ] Guest posts on Bitcoin blogs
- [ ] Press releases

### Backlinks Strategy
- Submit to Bitcoin directories
- Reach out to Bitcoin news sites
- Partner with other African Bitcoin initiatives
- Social media engagement
- Community involvement

## 📈 Analytics Integration

### Google Analytics 4 (To Add)

Add to `.env`:
```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

Track:
- Page views
- Donation conversions
- Form submissions
- Newsletter signups
- Outbound link clicks
- Video engagement

### Alternative Analytics
- Plausible (privacy-focused)
- Matomo (self-hosted)
- Simple Analytics

## 🧪 Testing Tools

### SEO Testing
1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test all structured data

2. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Validate JSON-LD

3. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test OG tags

4. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test Twitter Cards

5. **Lighthouse SEO Audit**
   - Built into Chrome DevTools
   - Target score: 90+

6. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Test performance + SEO

### Manual Testing Checklist
- [ ] All pages have unique titles
- [ ] All pages have unique descriptions
- [ ] Images have alt text
- [ ] Links are descriptive (no "click here")
- [ ] No broken links (404s)
- [ ] No duplicate content
- [ ] Mobile-friendly layout
- [ ] Fast page load (<3 seconds)

## 🔧 Maintenance

### Weekly Tasks
- Monitor Search Console for errors
- Check for broken links
- Review analytics for trends
- Update content as needed

### Monthly Tasks
- Review keyword rankings
- Analyze competitor SEO
- Update meta descriptions for better CTR
- Create new content
- Build backlinks

### Quarterly Tasks
- Comprehensive SEO audit
- Update structured data
- Review and refresh old content
- Update Open Graph images
- Performance optimization review

## 📚 Resources

### Documentation
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)

### Tools
- [Screaming Frog SEO Spider](https://www.screamingfrogseoseo.co.uk/)
- [Ahrefs](https://ahrefs.com/) (paid)
- [SEMrush](https://www.semrush.com/) (paid)
- [Ubersuggest](https://neilpatel.com/ubersuggest/) (freemium)

### Learning
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Search Engine Journal](https://www.searchenginejournal.com/)

## 🎓 Next Steps

1. **Create Open Graph Images** (high priority)
2. **Set up Google Search Console** (high priority)
3. **Submit sitemap** (high priority)
4. **Set up Google Analytics** (medium priority)
5. **Create blog section** (medium priority)
6. **Build backlinks** (ongoing)
7. **Content optimization** (ongoing)
8. **Monitor and adjust** (ongoing)

## Summary

✅ **Technical SEO**: Complete
✅ **Metadata**: Complete
✅ **Structured Data**: Complete
✅ **Sitemap**: Complete
✅ **Robots.txt**: Complete
⏳ **OG Images**: Need creation
⏳ **Search Console**: Need setup
⏳ **Analytics**: Need setup
⏳ **Content SEO**: Ongoing

**SEO Foundation**: Fully implemented and production-ready!
