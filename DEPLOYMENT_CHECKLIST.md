# Production Deployment Checklist

## Pre-Deployment

### Environment Variables
- [ ] Create production `.env` on Vercel
- [ ] `DATABASE_URL` - Production MySQL connection string
- [ ] `BTCPAY_HOST` - BTCPay Server URL
- [ ] `BTCPAY_API_KEY` - BTCPay API key
- [ ] `BTCPAY_STORE_ID` - BTCPay Store ID
- [ ] `BTCPAY_WEBHOOK_SECRET` - BTCPay Webhook secret
- [ ] `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` - hCaptcha site key
- [ ] `HCAPTCHA_SECRET` - hCaptcha secret key
- [ ] `SMTP_HOST` - Email SMTP host
- [ ] `SMTP_PORT` - Email SMTP port
- [ ] `SMTP_SECURE` - Email SSL/TLS setting
- [ ] `SMTP_USER` - Email username
- [ ] `SMTP_PASSWORD` - Email password
- [ ] `SMTP_FROM` - From email address
- [ ] `ADMIN_EMAIL` - Admin notification email
- [ ] `NEXT_PUBLIC_SITE_URL` - Production URL (https://afribit.africa)
- [ ] `GOOGLE_SITE_VERIFICATION` - Google Search Console code
- [ ] `NODE_ENV=production`

### Database Setup
- [ ] Ensure production database is accessible
- [ ] Run Prisma migrations: `npx prisma migrate deploy`
- [ ] Seed initial data if needed
- [ ] Test database connection
- [ ] Verify all tables exist
- [ ] Check database indices

### BTCPay Server Configuration
- [ ] Create production BTCPay store
- [ ] Generate API key with permissions
- [ ] Configure webhook URL: `https://afribit.africa/api/donations/webhook`
- [ ] Set webhook secret
- [ ] Test webhook delivery
- [ ] Enable Lightning Network (optional)
- [ ] Configure payment methods (BTC, Lightning)

### DNS & Domain
- [ ] Purchase domain (afribit.africa)
- [ ] Configure DNS records
  - [ ] A record pointing to Vercel
  - [ ] CNAME for www subdomain
  - [ ] TXT record for SPF (email)
  - [ ] TXT record for DKIM (email)
  - [ ] TXT record for DMARC (email)
  - [ ] TXT record for Google verification
- [ ] Wait for DNS propagation (24-48 hours)

### SSL/TLS
- [ ] Vercel automatic SSL (included)
- [ ] Verify HTTPS redirects work
- [ ] Test SSL certificate validity
- [ ] Enable HSTS headers

### Email Configuration
- [ ] Configure production SMTP (SendGrid/Mailgun recommended)
- [ ] Verify sender domain
- [ ] Set up SPF record
- [ ] Set up DKIM signing
- [ ] Set up DMARC policy
- [ ] Test email delivery
- [ ] Check spam score (mail-tester.com)
- [ ] Add unsubscribe mechanism

### Third-Party Services
- [ ] hCaptcha account setup
- [ ] Get production site keys
- [ ] Test CAPTCHA works
- [ ] Google Search Console setup
- [ ] Submit sitemap.xml
- [ ] Google Analytics 4 (optional)

## Deployment Steps

### 1. GitHub Repository
- [x] Repository created: novyrix/Afribit-Africa
- [x] Code pushed to main branch
- [x] All secrets in .gitignore
- [ ] Create production branch (optional)
- [ ] Set up branch protection rules

### 2. Vercel Deployment
- [ ] Sign up/login to Vercel
- [ ] Import GitHub repository
- [ ] Configure project settings:
  - Framework: Next.js
  - Root Directory: ./
  - Build Command: `npm run build`
  - Output Directory: .next
  - Install Command: `npm install`
  - Node Version: 18.x or 20.x
- [ ] Add environment variables (from checklist above)
- [ ] Deploy to production
- [ ] Verify deployment successful

### 3. Custom Domain
- [ ] Add domain in Vercel dashboard
- [ ] Configure DNS settings
- [ ] Verify domain ownership
- [ ] Enable automatic HTTPS
- [ ] Test domain accessibility

### 4. BTCPay Webhook
- [ ] Update webhook URL in BTCPay
- [ ] Test webhook delivery
- [ ] Verify webhook signature validation
- [ ] Test donation flow end-to-end

## Post-Deployment

### Testing
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] About page displays team/timeline
- [ ] Programs page shows all programs
- [ ] Program detail pages load
- [ ] Contact form submits successfully
- [ ] Contact form sends admin email
- [ ] Newsletter signup works
- [ ] Newsletter sends welcome email
- [ ] Donation modal opens
- [ ] BTCPay invoice creation works
- [ ] Payment QR code displays
- [ ] Payment status updates via webhook
- [ ] Donor receives confirmation email
- [ ] Admin receives donation notification
- [ ] Sitemap.xml accessible
- [ ] Robots.txt accessible
- [ ] Open Graph tags work (test with Facebook Debugger)
- [ ] Twitter Cards work (test with Twitter Card Validator)

### Performance
- [ ] Run Lighthouse audit
  - [ ] Performance: 90+
  - [ ] Accessibility: 90+
  - [ ] Best Practices: 95+
  - [ ] SEO: 100
- [ ] Run PageSpeed Insights
- [ ] Test on slow 3G network
- [ ] Verify Core Web Vitals
- [ ] Check bundle size

### Security
- [ ] Run npm audit (0 vulnerabilities)
- [ ] Verify HTTPS works
- [ ] Test CORS configuration
- [ ] Check for exposed secrets
- [ ] Test rate limiting (if implemented)
- [ ] Verify CSP headers (if implemented)
- [ ] Test form validation

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify structured data (Google Rich Results Test)
- [ ] Check meta tags (view page source)
- [ ] Test social media previews
- [ ] Verify canonical URLs
- [ ] Check robots.txt

### Monitoring
- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure Vercel Analytics
- [ ] Set up Google Analytics (optional)
- [ ] Configure uptime monitoring (UptimeRobot, Pingdom)
- [ ] Set up email alerts for errors
- [ ] Monitor database performance

## Post-Launch Tasks

### Week 1
- [ ] Monitor error logs daily
- [ ] Check email deliverability
- [ ] Verify donation flow works
- [ ] Monitor site performance
- [ ] Respond to contact form submissions
- [ ] Check Google Search Console for crawl errors
- [ ] Test on multiple devices/browsers

### Week 2-4
- [ ] Review analytics data
- [ ] Optimize slow pages
- [ ] Address any user feedback
- [ ] Monitor donation conversion rate
- [ ] Check newsletter growth
- [ ] Review and respond to contact forms

### Monthly
- [ ] Review Google Analytics
- [ ] Check Search Console performance
- [ ] Update content as needed
- [ ] Review and update programs
- [ ] Send newsletter to subscribers
- [ ] Backup database
- [ ] Run security audit
- [ ] Update dependencies

## Rollback Plan

### If Deployment Fails
1. Check Vercel build logs
2. Verify environment variables
3. Test database connection
4. Revert to previous deployment
5. Fix issues locally
6. Redeploy

### If Site Has Issues After Deploy
1. Monitor error logs
2. Identify problematic feature
3. Hot-fix or rollback
4. Test fix locally
5. Redeploy with fix

## Success Criteria

### Must Have (Launch Blockers)
- [x] Website loads without errors
- [x] All pages accessible
- [ ] Donation flow works end-to-end
- [ ] Forms submit successfully
- [ ] Emails send correctly
- [x] HTTPS enabled
- [x] Mobile responsive
- [x] SEO meta tags present

### Should Have (Post-Launch)
- [ ] Lighthouse score 90+
- [ ] Indexed by Google (within 7 days)
- [ ] Analytics tracking
- [ ] Error monitoring
- [ ] Backup system

### Nice to Have (Future)
- [ ] Blog section
- [ ] User authentication
- [ ] Donation receipts (PDF)
- [ ] Multi-language support
- [ ] Advanced analytics

## Emergency Contacts

### Technical Issues
- **Vercel Support**: support@vercel.com
- **BTCPay Support**: Community Slack/GitHub
- **Database Host**: (Your MySQL provider)
- **Email Provider**: (SendGrid/Mailgun support)

### Domain/DNS
- **Domain Registrar**: (Your registrar support)
- **DNS Provider**: (Cloudflare/etc support)

## Notes

- **First Deployment**: Expect 5-10 minutes for DNS propagation
- **SSL Certificate**: Automatic, issued within minutes
- **Database Connection**: Use connection pooling (Prisma handles this)
- **Webhook Testing**: Use BTCPay test mode first
- **Email Testing**: Send to yourself first
- **Monitoring**: Set up alerts for downtime/errors

## Deployment Complete! 🎉

Once all checklist items are complete, your Afribit Africa website will be live and accessible at https://afribit.africa.

**Next Steps**:
1. Announce launch on social media
2. Share with partners and stakeholders
3. Monitor performance and user feedback
4. Iterate based on analytics
5. Plan content updates and new features

---

**Deployment Date**: _____________
**Deployed By**: _____________
**Vercel URL**: _____________
**Production URL**: https://afribit.africa
**Status**: ⏳ Pending / ✅ Complete
