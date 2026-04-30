# Frontend Contracts

This file documents what the frontend can consume from the backend. It is maintained by **BackendDev** and read by **FrontendDev**. If a contract changes, update this file before touching any UI.

---

## Content Layer (Server Components — no fetch needed)

These functions are safe to call directly in RSC page components. Import from `src/lib/content/`.

### Merchants

```ts
import { listMerchants, listFeaturedMerchants, getMerchantBySlug } from '@/lib/content/merchants'

// Returns all ACTIVE merchants
const merchants = await listMerchants()
// Returns MerchantProfile[]

// Returns featured=true merchants
const featured = await listFeaturedMerchants()

// Returns single merchant or undefined
const merchant = await getMerchantBySlug('fridah-fresh-produce')
```

**`MerchantProfile` shape** (see `src/types/index.ts`):
```ts
{
  id: string
  slug: string
  name: string
  category: string
  summary: string
  neighborhood: string | null
  city: string | null
  country: string | null
  latitude: number | null
  longitude: number | null
  paymentMethods: string[]
  services: string[]
  featured: boolean
  programSlug: string | null
  // ... more fields in types/index.ts
}
```

---

### Programs

```ts
import { listPrograms, findProgramBySlug } from '@/lib/content/programs'

const programs = await listPrograms()     // ProgramCard[]
const program = await findProgramBySlug('business-accelerator') // ProgramCard | undefined
```

---

### Statistics

```ts
import { listHomepageStatistics } from '@/lib/content/statistics'
const stats = await listHomepageStatistics() // Statistic[]
// Each: { key, value, label, icon, order }
```

---

### Testimonials

```ts
import { listTestimonials } from '@/lib/content/testimonials'
const testimonials = await listTestimonials() // Testimonial[]
```

---

## API Routes (Client Components — use fetch)

### POST /api/contact
```ts
const res = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: string,        // min 2 chars
    email: string,       // valid email
    phone?: string,
    subject?: string,    // min 3 chars
    message: string,     // min 10 chars
    hCaptchaToken: string
  })
})
// Success: { success: true, message: string }
// Error 400: { success: false, error: string }
```

---

### POST /api/newsletter
```ts
const res = await fetch('/api/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: string, name?: string })
})
// Success: { success: true, message: string }
// Error 400: { success: false, error: string }
```

---

### POST /api/donations/create-invoice
```ts
const res = await fetch('/api/donations/create-invoice', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: number,        // positive, min 1
    currency?: 'USD'|'BTC',
    donorName?: string,
    donorEmail?: string,
    program?: string,      // program slug
    message?: string,      // max 500 chars
    isAnonymous?: boolean
  })
})
// Success: { success: true, data: { invoiceId, checkoutUrl, status, donationId } }
// Error 400: validation | Error 404: program not found | Error 500: BTCPay failed
```

---

### GET /api/donations/check-status
```ts
const res = await fetch(`/api/donations/check-status?invoiceId=${id}`)
// Success: { success: true, data: { status: string, invoiceId: string } }
// status values: 'New' | 'Processing' | 'Settled' | 'Expired' | 'Invalid'
```

---

## Environment Variables Available Client-Side

These are safe to read in Client Components via `process.env.NEXT_PUBLIC_*`:

| Variable | Use |
|----------|-----|
| `NEXT_PUBLIC_BTCPAY_STORE_ID` | BTCPay checkout (donation flow) |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | hCaptcha widget on contact/newsletter forms |
| `NEXT_PUBLIC_SITE_NAME` | Display name in page titles |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for OG tags |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error tracking (auto-initialized) |

---

## Admin API Routes (Not Yet Implemented)

These routes are planned. FrontendDev must wait for BackendDev to implement and document them before building admin UI forms.

| Route | Purpose | Status |
|-------|---------|--------|
| `GET /api/admin/merchants` | List all merchants (any status) | Pending |
| `POST /api/admin/merchants` | Create merchant | Pending |
| `PATCH /api/admin/merchants/[id]` | Update merchant | Pending |
| `DELETE /api/admin/merchants/[id]` | Archive merchant | Pending |
| `GET /api/admin/donations` | List donations with filters | Pending |
| `GET /api/admin/subscribers` | List subscribers | Pending |
| `GET /api/admin/contacts` | List contact submissions | Pending |
| `PATCH /api/admin/contacts/[id]` | Mark as responded | Pending |
| `GET /api/admin/programs` | List programs | Pending |
| `PATCH /api/admin/programs/[id]` | Update program | Pending |
| `GET /api/admin/statistics` | List statistics | Pending |
| `PATCH /api/admin/statistics/[key]` | Update statistic value | Pending |
