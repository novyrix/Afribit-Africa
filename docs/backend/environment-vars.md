# Environment Variables

All environment variables used by the backend. **Never commit real values.** Use `.env.local` for local development, Vercel dashboard for production.

---

## Database

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | Neon PostgreSQL pooled connection URL | `postgresql://user:pass@host/db?sslmode=require` |
| `DATABASE_URL_UNPOOLED` | Direct connection (used by Prisma for migrations) | `postgresql://user:pass@host/db?sslmode=require` |

Local compatibility note:

- Merchant operations scripts also accept the legacy `afribit_DATABASE_URL_UNPOOLED` variable while the repository finishes consolidating env naming.

---

## BTCPay Server

| Variable | Purpose | Example |
|----------|---------|---------|
| `BTCPAY_HOST` | BTCPay instance URL | `https://pay.afribit.africa` |
| `BTCPAY_API_KEY` | Greenfield API key | `852c4c...` |
| `BTCPAY_STORE_ID` | Store ID in BTCPay | `DSVtab2...` |
| `BTCPAY_WEBHOOK_SECRET` | HMAC secret for webhook signature verification | random 32-byte hex |
| `NEXT_PUBLIC_BTCPAY_STORE_ID` | Store ID exposed to client (for checkout redirects) | same as above |

---

## Email (SMTP)

| Variable | Purpose | Example |
|----------|---------|---------|
| `SMTP_HOST` | Mail server hostname | `mail.afribit.africa` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_SECURE` | Use TLS (`true`/`false`) | `false` |
| `SMTP_USER` | SMTP login username | `info@afribit.africa` |
| `SMTP_PASSWORD` | SMTP password | — |
| `EMAIL_FROM` | From address for outgoing emails | `info@afribit.africa` |
| `EMAIL_FROM_NAME` | Display name for outgoing emails | `Afribit Africa` |
| `ADMIN_EMAIL` | Recipient for admin notifications | `admin@afribit.africa` |
| `RESEND_API_KEY` | Resend.com API key (backup sender) | `re_...` |

---

## hCaptcha

| Variable | Purpose | Example |
|----------|---------|---------|
| `HCAPTCHA_SECRET` | Server-side secret for token verification | `ES_98...` |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | Public site key for the widget | `8f1c36...` |

---

## Auth (NextAuth)

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXTAUTH_SECRET` | JWT signing secret | random 32-byte base64 |
| `NEXTAUTH_URL` | App canonical URL (required in production) | `https://afribit.africa` |
| `GOOGLE_CLIENT_ID` | Google OAuth app client ID | `988784...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth app client secret | `GOCSPX-...` |

---

## Rate Limiting

| Variable | Purpose | Default |
|----------|---------|---------|
| `RATE_LIMIT_MAX` | Max requests per window | `100` |
| `RATE_LIMIT_WINDOW_MS` | Window duration in ms | `900000` (15 min) |

---

## Monitoring

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error reporting DSN | `https://...@sentry.io/...` |
| `SENTRY_AUTH_TOKEN` | Token for Sentry CLI / source maps upload | `sntryu_...` |
| `SENTRY_ORG` | Sentry organization slug | `afribit-africa` |
| `SENTRY_PROJECT` | Sentry project slug | `afribit` |

---

## App

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_NAME` | Site display name | `Afribit Africa` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in emails and redirects | `https://afribit.africa` |
| `NODE_ENV` | Runtime environment | `production` / `development` |
