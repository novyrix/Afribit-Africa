# Deployment Guide
## Afribit Website - Production Deployment

---

## 📋 Prerequisites

### Required Accounts & Services
1. **Hosting Platform** (Choose one):
   - Vercel (Recommended for Next.js)
   - Netlify
   - AWS Amplify
   - Custom VPS (Node.js hosting)

2. **Database:**
   - MySQL 8.0+ (PlanetScale, AWS RDS, or similar)

3. **BTCPay Server:**
   - Self-hosted instance or managed service
   - Store ID and API key

4. **Email Service:**
   - SMTP provider (SendGrid, Mailgun, AWS SES, etc.)

5. **Domain & DNS:**
   - Custom domain (e.g., afribit.org)
   - SSL certificate (usually provided by hosting)

---

## 🔧 Environment Configuration

### Step 1: Create Production Environment File

Create a `.env.production` file with the following variables:

```env
# ===============================================
# DATABASE CONFIGURATION
# ===============================================
DATABASE_URL="mysql://username:password@host:3306/database_name"

# Example for PlanetScale:
# DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/afribit?sslaccept=strict"

# ===============================================
# BTCPAY SERVER CONFIGURATION
# ===============================================
BTCPAY_URL="https://your-btcpay-instance.com"
BTCPAY_STORE_ID="your-store-id-here"
BTCPAY_API_KEY="your-api-key-here"
BTCPAY_WEBHOOK_SECRET="your-webhook-secret-here"

# How to get BTCPay credentials:
# 1. Login to BTCPay Server
# 2. Go to Store Settings → Access Tokens
# 3. Create new API key with permissions:
#    - View invoices
#    - Create invoice
#    - Modify invoices
# 4. Store ID is in the URL: /stores/{STORE_ID}/

# ===============================================
# EMAIL CONFIGURATION (SMTP)
# ===============================================
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
SMTP_FROM="noreply@afribit.org"

# Alternative providers:
# - SendGrid: smtp.sendgrid.net:587
# - Mailgun: smtp.mailgun.org:587
# - AWS SES: email-smtp.us-east-1.amazonaws.com:587
# - Gmail: smtp.gmail.com:587 (not recommended for production)

# ===============================================
# HCAPTCHA CONFIGURATION
# ===============================================
NEXT_PUBLIC_HCAPTCHA_SITE_KEY="your-hcaptcha-site-key"
HCAPTCHA_SECRET_KEY="your-hcaptcha-secret-key"

# Get hCaptcha keys:
# 1. Sign up at https://www.hcaptcha.com/
# 2. Add your domain
# 3. Get site key (public) and secret key (private)

# ===============================================
# APPLICATION CONFIGURATION
# ===============================================
NEXT_PUBLIC_BASE_URL="https://afribit.org"
NODE_ENV="production"

# ===============================================
# OPTIONAL: ANALYTICS
# ===============================================
# NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"  # Google Analytics
# PLAUSIBLE_DOMAIN="afribit.org"     # Plausible Analytics
```

---

## 🗄️ Database Setup

### Step 1: Run Prisma Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations (recommended)
npx prisma migrate deploy
```

### Step 2: Seed Database (Optional)

If you have seed data:

```bash
npx prisma db seed
```

### Step 3: Verify Database Connection

```bash
# Open Prisma Studio to verify
npx prisma studio
```

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel:**
- Built for Next.js
- Automatic deployments from Git
- Free SSL certificates
- Edge network (CDN)
- Serverless functions for API routes

**Steps:**

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Configure Environment Variables:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.production`
   - Ensure they're marked as "Production"

5. **Configure Domain:**
   - Go to Domains tab
   - Add custom domain (afribit.org)
   - Update DNS records as instructed

6. **Redeploy:**
```bash
vercel --prod
```

**Vercel Configuration File (`vercel.json`):**

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

### Option 2: Netlify

**Steps:**

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Initialize:**
```bash
netlify init
```

4. **Deploy:**
```bash
netlify deploy --prod
```

5. **Configure:**
   - Add environment variables in Netlify Dashboard
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

**Netlify Configuration (`netlify.toml`):**

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### Option 3: Custom VPS (Docker)

**Dockerfile:**

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Docker Compose (`docker-compose.yml`):**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.production
    restart: unless-stopped
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: afribit
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql_data:
```

**Deploy:**

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop
docker-compose down
```

---

## 🔐 BTCPay Server Configuration

### Step 1: Create Store

1. Login to BTCPay Server
2. Create a new store (if not exists)
3. Configure Bitcoin wallet

### Step 2: Generate API Key

1. Go to Store Settings → Access Tokens
2. Click "Generate Key"
3. Select permissions:
   - ✅ View invoices
   - ✅ Create invoice
   - ✅ Modify invoices
   - ✅ Modify stores webhooks
4. Copy the API key (save securely)

### Step 3: Configure Webhook

1. Go to Store Settings → Webhooks
2. Create new webhook
3. **Payload URL:** `https://afribit.org/api/donations/webhook`
4. **Secret:** Generate random string (save to `BTCPAY_WEBHOOK_SECRET`)
5. **Events to send:**
   - Invoice created
   - Invoice payment settled
   - Invoice expired
   - Invoice invalid

### Step 4: Test Integration

```bash
# Test invoice creation
curl -X POST https://afribit.org/api/donations/create-invoice \
  -H "Content-Type: application/json" \
  -d '{"amount": 25, "donorName": "Test Donor", "email": "test@example.com"}'
```

---

## 📧 Email Service Configuration

### SendGrid Setup

1. **Sign up:** https://sendgrid.com/
2. **Verify sender:** Settings → Sender Authentication
3. **Create API key:** Settings → API Keys
4. **Copy key** to `SMTP_PASSWORD`

### Mailgun Setup

1. **Sign up:** https://mailgun.com/
2. **Add domain:** Sending → Domains
3. **Verify DNS** records
4. **Get SMTP credentials:** Domain Settings → SMTP

### Test Email

```bash
# Test contact form
curl -X POST https://afribit.org/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test."
  }'
```

---

## 🌐 DNS Configuration

### Required DNS Records

**For Custom Domain (afribit.org):**

```
A Record:
  Host: @
  Value: [Your hosting IP or CNAME]
  TTL: 3600

CNAME Record (www):
  Host: www
  Value: afribit.org
  TTL: 3600

TXT Record (SPF for email):
  Host: @
  Value: v=spf1 include:_spf.sendgrid.net ~all
  TTL: 3600

CNAME (Email verification):
  As provided by email service
```

**Vercel DNS:**
```
CNAME:
  Host: @
  Value: cname.vercel-dns.com
```

---

## ✅ Post-Deployment Checklist

### Immediate Testing

- [ ] Site loads at production URL
- [ ] SSL certificate is valid (HTTPS)
- [ ] All pages render correctly
- [ ] No console errors in browser
- [ ] Mobile navigation works
- [ ] Forms validate correctly

### Functionality Testing

- [ ] **Contact Form:**
  - [ ] Submit form with valid data
  - [ ] Receive email notification
  - [ ] See success message
  - [ ] Verify validation errors work

- [ ] **Donation Flow:**
  - [ ] Click "Donate" button
  - [ ] Select donation amount
  - [ ] Create BTCPay invoice
  - [ ] See checkout link
  - [ ] Invoice status polling works
  - [ ] Webhook receives status updates

- [ ] **Newsletter:**
  - [ ] Subscribe with email
  - [ ] See success message
  - [ ] Email saved to database

### Performance Testing

- [ ] Run Lighthouse audit
  - Target: 90+ Performance
  - Target: 100 Accessibility
  - Target: 100 Best Practices
  - Target: 100 SEO

- [ ] Test page load speeds
  - Target: < 3s First Contentful Paint
  - Target: < 5s Largest Contentful Paint

### Security Testing

- [ ] HTTPS enforced (no HTTP access)
- [ ] Security headers configured
- [ ] CORS configured correctly
- [ ] Rate limiting on API routes
- [ ] Input validation working
- [ ] hCaptcha preventing spam

---

## 📊 Monitoring & Maintenance

### Error Monitoring

**Recommended Tools:**
- Sentry (error tracking)
- LogRocket (session replay)
- Vercel Analytics (built-in)

**Setup Sentry:**

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### Performance Monitoring

- Vercel Analytics (included)
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

### Database Monitoring

- PlanetScale Insights
- Prisma Studio (development)
- Database query logs

### Backup Strategy

**Database Backups:**
- Daily automated backups
- Weekly manual exports
- Store backups in S3 or similar

**Code Backups:**
- Git repository (GitHub)
- Tagged releases for each deployment

---

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          BTCPAY_URL: ${{ secrets.BTCPAY_URL }}
          BTCPAY_STORE_ID: ${{ secrets.BTCPAY_STORE_ID }}
          BTCPAY_API_KEY: ${{ secrets.BTCPAY_API_KEY }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🚨 Troubleshooting

### Build Fails

**Issue:** TypeScript errors during build

**Solution:**
```bash
# Check for errors locally
npm run build

# Fix TypeScript errors
npx tsc --noEmit
```

### Database Connection Issues

**Issue:** "Can't connect to database"

**Solution:**
```bash
# Test connection
npx prisma db pull

# Verify DATABASE_URL format
# mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

### BTCPay Invoice Creation Fails

**Issue:** 401 Unauthorized or 403 Forbidden

**Solution:**
- Verify `BTCPAY_API_KEY` is correct
- Check API key has proper permissions
- Verify `BTCPAY_STORE_ID` matches your store
- Test with BTCPay API directly

### Email Delivery Issues

**Issue:** Emails not being sent

**Solution:**
- Check SMTP credentials
- Verify sender email is authenticated
- Check spam folder
- Review email service logs
- Test with `nodemailer` directly

### SSL Certificate Issues

**Issue:** "Not Secure" warning

**Solution:**
- Verify DNS records point to hosting
- Wait for SSL provisioning (can take 24-48 hours)
- Check hosting platform SSL settings
- Ensure HTTPS redirect is enabled

---

## 📞 Support Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- BTCPay Server: https://docs.btcpayserver.org
- Vercel: https://vercel.com/docs

### Community
- Next.js Discord: https://nextjs.org/discord
- BTCPay Server Slack: https://chat.btcpayserver.org
- GitHub Issues: [Your repository]

---

## 🎉 Deployment Complete!

Your Afribit website is now live in production! 🚀

**Next Steps:**
1. Monitor error logs for 24-48 hours
2. Run Lighthouse audits
3. Test all forms and features
4. Share with team for feedback
5. Announce launch! 🎊

---

**Last Updated:** October 26, 2025  
**Version:** 1.0.0  
**Maintained By:** Afribit Development Team
