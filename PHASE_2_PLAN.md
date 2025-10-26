# 🚀 Phase 2: BTCPay Integration & Site Improvements - Implementation Plan

## 📋 Overview

This document outlines the next phase of development focusing on:
1. **BTCPay Server Integration** - Complete donation system
2. **Additional Pages** - About, Programs, Blog
3. **UX Enhancements** - Animations, loading states, error handling
4. **SEO & Performance** - Meta tags, image optimization, caching
5. **Email System** - Transactional emails for forms and donations

---

## 📦 Required Packages to Install

### BTCPay Server Integration
```bash
npm install btcpay-greenfield-node-client  # Official BTCPay API client
npm install qrcode                          # QR code generation
npm install qrcode.react                    # React QR code component
```

### Email System
```bash
npm install nodemailer                      # Email sending
npm install @react-email/components         # Email templates (React)
npm install @react-email/render             # Render React to HTML
```

### Additional UI Enhancements
```bash
npm install embla-carousel-react            # Better carousel (optional upgrade)
npm install react-intersection-observer     # Scroll animations
npm install usehooks-ts                     # Useful React hooks
```

### SEO & Analytics
```bash
npm install next-sitemap                    # Automatic sitemap generation
npm install next-seo                        # SEO management
npm install react-ga4                       # Google Analytics 4
```

### Development Tools
```bash
npm install -D @types/nodemailer            # Nodemailer types
npm install -D @types/qrcode                # QRCode types
```

---

## ✅ Phase 2 TODO List

### 🎯 **PRIORITY 1: Donate Page with BTCPay Integration**

#### Task 1.1: Install BTCPay Dependencies ✅
```bash
npm install btcpay-greenfield-node-client qrcode qrcode.react
```

#### Task 1.2: Create BTCPay API Utilities
- [ ] Create `src/lib/btcpay.ts` - BTCPay client configuration
- [ ] Create API wrapper functions:
  - [ ] `createInvoice(amount, currency, metadata)`
  - [ ] `getInvoiceStatus(invoiceId)`
  - [ ] `getStoreStats()`
- [ ] Add error handling and retries
- [ ] Type definitions for BTCPay responses

#### Task 1.3: Create Donation API Routes
- [ ] `POST /api/donations/create-invoice` - Create new invoice
- [ ] `GET /api/donations/check-status/[invoiceId]` - Check payment status
- [ ] `POST /api/donations/webhook` - Handle BTCPay webhooks
- [ ] Save donation records to `donations` table
- [ ] Send confirmation emails on successful payment

#### Task 1.4: Build Donation Components
- [ ] `DonationModal.tsx` - Main donation modal with tabs
- [ ] `DonationTiers.tsx` - Preset donation amounts with impact
- [ ] `PaymentMethodSelector.tsx` - Bitcoin/Lightning toggle
- [ ] `QRCodeDisplay.tsx` - Display payment QR code
- [ ] `InvoiceStatus.tsx` - Real-time payment status checker
- [ ] `DonationSuccessScreen.tsx` - Thank you screen
- [ ] `ImpactCalculator.tsx` - Interactive impact calculator

#### Task 1.5: Create Donate Page (`/donate`)
- [ ] Hero section with total raised progress
- [ ] Donation tiers grid (with real BTCPay data)
- [ ] Impact stories section
- [ ] Recent donations feed (optional, privacy-aware)
- [ ] FAQ accordion for donation questions
- [ ] Bitcoin education section (why Bitcoin?)
- [ ] Integrate DonationModal component

#### Task 1.6: Update Homepage with Live Stats
- [ ] Fetch real donation data from BTCPay API
- [ ] Update StatisticsSection with live totals
- [ ] Add donation progress bar in hero section
- [ ] Link "Donate Now" buttons to modal

---

### 📄 **PRIORITY 2: Essential Pages**

#### Task 2.1: About Page (`/about`)
- [ ] Mission & Vision section
- [ ] Kibera Background (why we work there)
- [ ] Impact Timeline (milestones)
- [ ] Team Section (if applicable)
- [ ] Partner Logos Grid
- [ ] Bitcoin Philosophy section
- [ ] Location/Map integration (optional)
- [ ] Add metadata and SEO

#### Task 2.2: Programs Page (`/programs`)
- [ ] Programs overview section
- [ ] Individual program cards (detailed)
- [ ] Filter by category
- [ ] Each program section:
  - [ ] Description and goals
  - [ ] Current funding status
  - [ ] Impact metrics
  - [ ] Photo gallery
  - [ ] Testimonials related to program
  - [ ] "Donate to this program" button
- [ ] Individual program routes:
  - [ ] `/programs/bitcoin-education`
  - [ ] `/programs/boda-boda-compliance`
  - [ ] `/programs/waste-management`
  - [ ] `/programs/business-accelerator`
  - [ ] `/programs/equipment-scaling`

#### Task 2.3: Blog/News System (`/blog`)
- [ ] Blog listing page with filters
- [ ] Individual blog post page (`/blog/[slug]`)
- [ ] Category pages (`/blog/category/[category]`)
- [ ] Search functionality (optional)
- [ ] Pagination
- [ ] Related posts
- [ ] Social sharing buttons
- [ ] Table of contents for long posts
- [ ] Author info section
- [ ] Reading time estimate

---

### 📧 **PRIORITY 3: Email System**

#### Task 3.1: Install Email Dependencies
```bash
npm install nodemailer @react-email/components @react-email/render
```

#### Task 3.2: Create Email Templates
- [ ] `WelcomeEmail.tsx` - Newsletter welcome
- [ ] `ContactFormNotification.tsx` - Admin notification
- [ ] `ContactFormConfirmation.tsx` - User confirmation
- [ ] `DonationConfirmation.tsx` - Thank you email
- [ ] `DonationReceipt.tsx` - Official receipt with transaction details

#### Task 3.3: Email Utility Functions
- [ ] Create `src/lib/email.ts` - Nodemailer configuration
- [ ] Create `sendEmail(to, subject, html)` function
- [ ] Test email sending with SMTP credentials
- [ ] Add email queue (optional, for reliability)

#### Task 3.4: Integrate Emails
- [ ] Update contact form API to send emails
- [ ] Update newsletter API to send welcome email
- [ ] Donation webhook sends confirmation email
- [ ] Add unsubscribe functionality

---

### 🎨 **PRIORITY 4: UX/UI Improvements**

#### Task 4.1: Loading States
- [ ] Create `LoadingSpinner.tsx` component
- [ ] Create `LoadingSkeleton.tsx` components for cards
- [ ] Add loading states to:
  - [ ] Form submissions
  - [ ] Page transitions
  - [ ] Image loading
  - [ ] Data fetching

#### Task 4.2: Error Handling
- [ ] Create `ErrorBoundary.tsx` component
- [ ] Create `ErrorPage.tsx` for 404/500
- [ ] Add try-catch blocks to all API routes
- [ ] User-friendly error messages
- [ ] Error logging (console for now, Sentry later)

#### Task 4.3: Animation Enhancements
- [ ] Add page transition animations
- [ ] Parallax scrolling effects (subtle)
- [ ] Hover effects on cards and buttons
- [ ] Progress bar animations
- [ ] Number count-up on scroll (already done for stats)
- [ ] Fade-in animations for sections

#### Task 4.4: Accessibility Improvements
- [ ] Add skip-to-content link
- [ ] Ensure all images have alt text
- [ ] Add ARIA labels to interactive elements
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Improve color contrast where needed

---

### 🔍 **PRIORITY 5: SEO & Performance**

#### Task 5.1: Install SEO Packages
```bash
npm install next-sitemap next-seo
```

#### Task 5.2: SEO Optimization
- [ ] Create `src/lib/seo.ts` - SEO utilities
- [ ] Add proper meta tags to all pages
- [ ] Open Graph images for social sharing
- [ ] Twitter Card metadata
- [ ] JSON-LD structured data:
  - [ ] Organization schema
  - [ ] Nonprofit schema
  - [ ] Donation schema
  - [ ] Article schema (blog posts)
- [ ] Generate `robots.txt`
- [ ] Generate `sitemap.xml` (automated with next-sitemap)
- [ ] Add canonical URLs

#### Task 5.3: Performance Optimization
- [ ] Image optimization:
  - [ ] Convert large images to WebP
  - [ ] Add responsive images with srcset
  - [ ] Implement lazy loading
  - [ ] Add blur placeholders
- [ ] Code splitting:
  - [ ] Dynamic imports for heavy components
  - [ ] Route-based code splitting (automatic)
- [ ] Caching:
  - [ ] Add cache headers to API routes
  - [ ] Enable Next.js ISR (Incremental Static Regeneration)
- [ ] Bundle size optimization:
  - [ ] Analyze bundle with `@next/bundle-analyzer`
  - [ ] Remove unused dependencies

#### Task 5.4: Analytics Integration
```bash
npm install react-ga4
```
- [ ] Create `src/lib/analytics.ts`
- [ ] Initialize Google Analytics 4
- [ ] Track page views
- [ ] Track custom events:
  - [ ] Donation initiated
  - [ ] Donation completed
  - [ ] Form submissions
  - [ ] Button clicks (CTAs)
  - [ ] Newsletter signups

---

### 🔒 **PRIORITY 6: Security Enhancements**

#### Task 6.1: Rate Limiting
```bash
npm install express-rate-limit  # If using custom server
# OR use Vercel's built-in rate limiting
```
- [ ] Add rate limiting to API routes
- [ ] Prevent brute force attacks on forms
- [ ] Add CAPTCHA to sensitive endpoints

#### Task 6.2: Input Validation
- [ ] Sanitize all user inputs
- [ ] Add XSS protection
- [ ] Validate file uploads (if any)
- [ ] Add CSRF protection

#### Task 6.3: Security Headers
- [ ] Add Content Security Policy (CSP)
- [ ] Add X-Frame-Options
- [ ] Add X-Content-Type-Options
- [ ] Configure CORS properly

---

### 📱 **PRIORITY 7: Mobile Optimization**

#### Task 7.1: Mobile-Specific Improvements
- [ ] Test on actual mobile devices
- [ ] Optimize touch targets (minimum 44x44px)
- [ ] Improve mobile menu UX
- [ ] Add pull-to-refresh (optional)
- [ ] Optimize for slow networks:
  - [ ] Progressive loading
  - [ ] Offline support (Service Worker)
  - [ ] Show network status

#### Task 7.2: PWA Features (Optional)
```bash
npm install next-pwa
```
- [ ] Add service worker
- [ ] Create `manifest.json`
- [ ] Add app icons
- [ ] Enable offline mode
- [ ] Add "Add to Home Screen" prompt

---

### 🧪 **PRIORITY 8: Testing**

#### Task 8.1: Manual Testing
- [ ] Test all forms (contact, newsletter, donation)
- [ ] Test all navigation links
- [ ] Test mobile responsiveness
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test payment flow with BTCPay testnet
- [ ] Test email delivery
- [ ] Test accessibility with screen reader

#### Task 8.2: Performance Testing
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Test page load times
- [ ] Test Time to Interactive (TTI)
- [ ] Test Core Web Vitals
- [ ] Optimize based on results

---

## 🎯 Implementation Order (Recommended)

### Week 1: BTCPay Integration
1. Install BTCPay dependencies
2. Create BTCPay API utilities
3. Build donation components
4. Create donate page
5. Test with BTCPay testnet
6. Integrate with homepage

### Week 2: Essential Pages
1. Build About page
2. Build Programs page (overview)
3. Build individual program pages
4. Add SEO metadata
5. Test all pages

### Week 3: Email & Blog System
1. Set up email system
2. Create email templates
3. Test email delivery
4. Build blog listing page
5. Build individual blog post page
6. Add blog CMS (or use Markdown files)

### Week 4: Polish & Optimization
1. Add loading states and error handling
2. SEO optimization (meta tags, sitemap)
3. Performance optimization
4. Analytics integration
5. Security hardening
6. Comprehensive testing
7. Bug fixes

---

## 📊 Success Metrics

### Phase 2 Complete When:
- ✅ Donation system fully functional with BTCPay
- ✅ All essential pages built (About, Programs, Blog)
- ✅ Email system working for all flows
- ✅ Lighthouse score > 90
- ✅ All forms tested and working
- ✅ Mobile responsive on all pages
- ✅ SEO metadata on all pages
- ✅ Analytics tracking implemented
- ✅ Zero critical bugs

---

## 🔗 Resources & Documentation

### BTCPay Server
- API Docs: https://docs.btcpayserver.org/API/Greenfield/v1/
- Node Client: https://github.com/btcpayserver/btcpayserver-greenfield-node-client

### Email
- Nodemailer Docs: https://nodemailer.com/
- React Email: https://react.email/

### SEO
- Next.js SEO: https://nextjs.org/learn/seo/introduction-to-seo
- Next Sitemap: https://github.com/iamvishnusankar/next-sitemap

### Analytics
- GA4 Setup: https://developers.google.com/analytics/devguides/collection/ga4

---

## 💡 Notes

- **BTCPay Testnet**: Use testnet for development, switch to mainnet for production
- **Email Testing**: Use Mailtrap or similar for testing emails before going live
- **Performance**: Prioritize Core Web Vitals (LCP, FID, CLS)
- **Security**: Never commit API keys or secrets to Git
- **Backups**: Regular database backups before major changes

---

## 🚀 Let's Get Started!

The first priority is the **BTCPay integration** and **Donate page** since that's the primary goal of the website. Let me know when you're ready to start, and we'll begin with:

1. Installing BTCPay dependencies
2. Setting up the API utilities
3. Building the donation modal
4. Creating the donate page

**Ready to proceed?** 🎯
