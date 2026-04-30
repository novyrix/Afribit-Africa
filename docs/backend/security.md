# Security Controls

Per-route and per-layer security controls implemented in the Afribit backend.

---

## Global Controls

| Control | Implementation | Location |
|---------|---------------|----------|
| Input validation | Zod schemas on every POST body | Each `route.ts` |
| Error sanitization | Generic errors returned to client, full error logged server-side | Each `route.ts` catch block |
| Secrets in env vars | No hardcoded credentials | `.env.local` / Vercel |
| TypeScript strict | `strict: true` in `tsconfig.json` | — |
| Sentry monitoring | Unhandled errors captured | `NEXT_PUBLIC_SENTRY_DSN` |

---

## Route-Level Controls

### POST /api/contact
- **hCaptcha** server-side verification before any DB write
- **Zod** validates all fields including min/max lengths
- IP address and user-agent logged to `contact_submissions`
- Admin email notification does not expose raw DB record to client

### POST /api/newsletter
- **Zod** validates email format
- Duplicate subscription returns error (no info leak about whether user exists for ACTIVE status)
- Re-activation of UNSUBSCRIBED email does not expose prior status details

### POST /api/donations/create-invoice
- **Zod** validates amount (min 1, positive only — enforced server-side)
- Program existence verified before any BTCPay call
- `donorEmail` never returned in response — only `invoiceId` and `checkoutUrl`
- Anonymous donations strip donor identity before BTCPay metadata

### GET /api/donations/check-status
- Only returns `status` and `invoiceId` — no financial amounts or donor details in response

### POST /api/donations/webhook
- **HMAC signature** (`btcpay-sig`) verified using `crypto.timingSafeEqual` — immune to timing attacks
- Raw body read as text before parsing — signature verified on unmodified body
- Returns `401` on missing or invalid signature before any processing
- Non-invoice event types silently ignored (no error, no processing)

---

## OWASP Top 10 Checklist

| # | Risk | Status | Implementation |
|---|------|--------|---------------|
| A01 | Broken Access Control | Partial | Admin routes must use NextAuth session check — implement per-route |
| A02 | Cryptographic Failures | ✅ | HMAC via `crypto.timingSafeEqual`, all secrets in env vars |
| A03 | Injection | ✅ | Zod + Prisma parameterized queries; `sanitize-html` on rich text |
| A04 | Insecure Design | ✅ | hCaptcha on all public forms, server-side amount validation |
| A05 | Security Misconfiguration | ✅ | No stack traces in responses, secrets in env only |
| A06 | Vulnerable Components | Ongoing | Run `npm audit` on each feature branch |
| A07 | Auth Failures | Partial | Rate limiting available via `rate-limiter-flexible` — add to high-traffic routes |
| A08 | Software Integrity | ✅ | BTCPay webhook HMAC enforced |
| A09 | Logging Failures | ✅ | Structured `console.error` + Sentry DSN |
| A10 | SSRF | ✅ | All external URLs from env vars only |

---

## Outstanding Security Tasks

- [ ] Add `rate-limiter-flexible` middleware to `/api/contact` and `/api/newsletter`
- [ ] Implement NextAuth session guard on any future admin-only routes
- [ ] Add `Content-Security-Policy` headers in `next.config.ts`
- [ ] Run `npm audit` and document findings

## Merchant Verification Phase 1

- Phase 1 verification ships as local operator scripts, not a public or admin HTTP route.
- `npm run osm:check` is read-only against OSM and the local database.
- `npm run osm:sync-verifications` writes only to Afribit's own database and does not push changes to OSM.
- This keeps the verification workflow private until authenticated admin routes exist.
