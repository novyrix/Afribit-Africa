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

## Recommendations for Production

For production deployment on Vercel, consider these options:

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
