# 🌍 Afribit Africa - Modern Website

> Empowering African communities through Bitcoin education, merchant onboarding, and sustainable development.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.18-2D3748?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL database (Bluehost)
- BTCPay Server account

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Generate Prisma Client
npm run db:generate

# Run database migrations (requires remote MySQL access)
npm run db:migrate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## 📦 Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Prisma ORM** - Type-safe database client

### UI Components
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations
- **GSAP** - Advanced animations

### Forms & Validation
- **React Hook Form** - Performant forms
- **Zod** - Schema validation

### Integrations
- **BTCPay Server** - Bitcoin donations
- **Nodemailer** - Email sending
- **hCaptcha** - Spam protection
- **Google Analytics 4** - Website analytics

### Security
- **rate-limiter-flexible** - Rate limiting
- **sanitize-html** - XSS prevention
- **Environment variables** - Secure credentials

### SEO
- **next-seo** - SEO metadata
- **next-sitemap** - Automatic sitemap generation

## 🗂️ Project Structure

```
afribit-website/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   ├── globals.css      # Global styles + brand colors
│   │   ├── about/           # About page
│   │   ├── programs/        # Programs page
│   │   ├── donate/          # Donation page
│   │   ├── contact/         # Contact page
│   │   └── blog/            # Blog listing & posts
│   ├── components/          # Reusable React components
│   │   ├── ui/              # UI primitives
│   │   ├── layout/          # Layout components
│   │   └── forms/           # Form components
│   ├── lib/                 # Utility functions
│   │   ├── prisma.ts        # Prisma client
│   │   ├── btcpay.ts        # BTCPay integration
│   │   ├── email.ts         # Email sending
│   │   └── utils.ts         # Helper functions
│   └── types/               # TypeScript types
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── public/                  # Static assets
│   ├── images/              # Images
│   ├── videos/              # Videos
│   └── logos/               # Brand assets
├── scripts/                 # Utility scripts
│   └── test-db.ts           # Database connection test
└── .env.local               # Environment variables (not in git)
```

## 🎨 Brand Colors

The website uses Afribit's official color palette:

```css
--bitcoin-orange: #F7931A  /* Primary CTA, accents */
--afribit-red: #FF0201     /* Alerts, important actions */
--afribit-green: #0E622F   /* Success states, sustainability */
```

Use in Tailwind:
```tsx
<button className="bg-bitcoin hover:bg-bitcoin-dark">
  Donate Now
</button>
```

## 🗄️ Database

### Models

- **User** - Admin access management
- **ContactSubmission** - Contact form entries
- **Subscriber** - Newsletter subscribers
- **Post** - Blog posts and news
- **Donation** - BTCPay donation tracking
- **Program** - Fundraising initiatives
- **Testimonial** - Success stories
- **Statistic** - Homepage statistics
- **PageView** - Basic analytics

### Commands

```bash
# Test database connection
npm run test-db

# Generate Prisma Client
npm run db:generate

# Create migration
npm run db:migrate

# Push schema without migration
npm run db:push

# Open Prisma Studio (visual database editor)
npm run db:studio
```

## 🔐 Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="mysql://user:password@host:3306/database"

# BTCPay Server
BTCPAY_HOST="https://btcpay.afribit.africa"
BTCPAY_STORE_ID="your-store-id"
BTCPAY_API_KEY="your-api-key"
NEXT_PUBLIC_BTCPAY_STORE_ID="your-store-id"

# Email (SMTP)
SMTP_HOST="mail.afribit.africa"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="info@afribit.africa"
SMTP_PASSWORD="your-password"
EMAIL_FROM="info@afribit.africa"

# hCaptcha
NEXT_PUBLIC_HCAPTCHA_SITE_KEY="your-site-key"
HCAPTCHA_SECRET_KEY="your-secret-key"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Application
NEXT_PUBLIC_SITE_URL="https://afribit.africa"
```

## 🚧 Development

### Available Scripts

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test-db      # Test database connection
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma Client
npm run db:studio    # Open Prisma Studio
```

### Adding New Features

1. **Create Component**: `src/components/YourComponent.tsx`
2. **Add Page**: `src/app/your-page/page.tsx`
3. **Update Schema**: Edit `prisma/schema.prisma`, then run migrations
4. **Add API Route**: `src/app/api/your-route/route.ts`

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy!

3. **Add Environment Variables in Vercel**:
   - Copy all variables from `.env.local`
   - Add to Vercel project settings
   - Redeploy

### Database Access

**Important**: Enable remote MySQL access in Bluehost:
1. Login to cPanel
2. Go to "Remote MySQL"
3. Add Vercel's IP ranges or your IP address

## 📱 Features

### Implemented
- ✅ Modern, responsive design
- ✅ Brand colors and typography
- ✅ Database schema with Prisma
- ✅ Environment configuration

### In Progress
- 🔄 Homepage with hero video
- 🔄 About page
- 🔄 Programs page
- 🔄 Donate page with BTCPay
- 🔄 Contact form
- 🔄 Blog/News system

### Planned
- ⏳ Admin dashboard
- ⏳ Newsletter system
- ⏳ Multi-language support
- ⏳ Advanced analytics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 📞 Contact

**Afribit Africa**
- Website: [afribit.africa](https://afribit.africa)
- Email: info@afribit.africa
- BTCPay: [btcpay.afribit.africa](https://btcpay.afribit.africa)

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Vercel** - Hosting platform
- **Prisma** - Database ORM
- **BTCPay Server** - Bitcoin payment processor
- **Radix UI** - Component primitives
- **Tailwind CSS** - Styling framework

---

Built with ❤️ and ₿ for African communities

