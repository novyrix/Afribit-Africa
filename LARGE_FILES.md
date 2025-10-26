# Large Video Files

The following video files are too large for GitHub (>100MB limit) and have been excluded from the repository via `.gitignore`:

## Excluded Files (Total: ~795 MB)

1. **public/Videos/Complilation of people buying products with bitcoin.mp4** (238.44 MB)
2. **public/Videos/News and major shoutouts/FirstPost.mp4** (144.67 MB)
3. **public/Videos/News and major shoutouts/NAKAMOTO.mp4** (115.51 MB)
4. **public/Videos/Merchant Interviews/Grace Interview-1.mp4** (97.72 MB)
5. **public/Videos/Merchant Interviews/Mercy Interview.mp4** (82.54 MB)
6. **public/Videos/Merchant Interviews/Fridah Interview-1.mp4** (77.73 MB)
7. **public/Videos/Merchant Interviews/Lilian Interview.mp4** (55.96 MB)

## ✅ Solution Implemented: YouTube Embeds

Instead of hosting large video files, we've embedded YouTube videos for media coverage and community impact:

### Media Coverage (About Page)
- **BBC News** - Bitcoin Adoption in Kenya
  - YouTube ID: `rPVoaYFiIDg`
  - https://www.youtube.com/watch?v=rPVoaYFiIDg

- **FirstPost** - Africa's Bitcoin Revolution
  - YouTube ID: `l4mUySspn1E`
  - https://www.youtube.com/watch?v=l4mUySspn1E

- **AP Archive News** - Bitcoin in African Markets
  - YouTube ID: `RBUj98JhpWY`
  - https://www.youtube.com/watch?v=RBUj98JhpWY

- **ABC News** - Financial Freedom Through Bitcoin
  - YouTube ID: `0Ov1vgy8Gag`
  - https://www.youtube.com/watch?v=0Ov1vgy8Gag

- **Capital FM Kenya** - Bitcoin Adoption in Kenya
  - YouTube ID: `d6mT2J1lHh0`
  - https://www.youtube.com/watch?v=d6mT2J1lHh0

- **Joe Nakamoto** - Bitcoin in Africa - Community Perspective
  - YouTube ID: `LRSQSkiil0M`
  - https://www.youtube.com/watch?v=LRSQSkiil0M

### Implementation Details
- Created `YouTubeEmbed` component (`src/components/ui/youtube-embed.tsx`)
- Created media coverage data (`src/data/media.ts`)
- Added Media Coverage section to About page
- Updated testimonials to support YouTube embeds
- Uses privacy-enhanced mode (`youtube-nocookie.com`)
- Responsive 16:9 aspect ratio maintained

### Benefits
✅ Zero hosting costs  
✅ Faster page loads (no large video downloads)  
✅ Better SEO (YouTube metadata)  
✅ Professional presentation  
✅ No bandwidth limits  
✅ Works perfectly on Vercel free tier

## Current Implementation

The website currently includes:
- ✅ Smaller video files (< 50MB) for homepage hero and local testimonials
- ✅ YouTube embeds for all major media coverage and news
- ✅ Mixed approach: local videos for quick demos, YouTube for long-form content

## Alternative Options (Not Needed)

## Alternative Options (Not Needed)

These alternatives are documented for reference but are not required since we're using YouTube embeds:

### Option 1: External CDN (Recommended)
Upload large videos to a CDN service:
- **Cloudflare R2** (S3-compatible, no egress fees)
- **Bunny CDN** (cost-effective for video)
- **AWS S3 + CloudFront**
- **Vimeo** or **YouTube** (embed players)

### Option 2: Git LFS (Limited Free Tier)
Use Git Large File Storage if hosting on GitHub:
```bash
git lfs install
git lfs track "*.mp4"
git add .gitattributes
```
Note: GitHub LFS free tier is 1GB storage + 1GB bandwidth/month

### Option 3: Vercel Blob Storage
Use Vercel's built-in blob storage (paid feature):
```bash
npm install @vercel/blob
```

## Current Implementation

The website currently includes smaller video files:
- Home hero section video (< 50MB) ✅
- Smaller merchant testimonials ✅
- News clips under 50MB ✅

Large videos exist locally in `public/Videos/` but are gitignored and won't be deployed.

## Next Steps

1. Compress large videos using FFmpeg or HandBrake (target: < 10MB each)
2. Upload to CDN and update video URLs in components
3. Or use video embed services (YouTube/Vimeo) for testimonials and news clips
