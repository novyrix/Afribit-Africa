# Backend API Routes

All route handlers live in `src/app/api/**/route.ts`.

## Merchant Verification Note

Merchant verification phase 1 does not add a new HTTP route yet.

The backend work shipped in this phase is database and operations tooling:

- `npm run db:phase1-verification`
- `npm run osm:check`
- `npm run osm:sync-verifications`

This keeps merchant verification private until authenticated admin routes are added.

---

## POST /api/contact

**Purpose**: Submit a contact form inquiry with hCaptcha verification.

**Request Body**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | min 2 chars |
| `email` | string | yes | valid email format |
| `phone` | string | no | optional contact number |
| `subject` | string | no | min 3 chars if provided |
| `message` | string | yes | min 10 chars |
| `hCaptchaToken` | string | yes | token from hCaptcha widget |

**Success Response** `200`:
```json
{ "success": true, "message": "Message sent successfully" }
```

**Error Responses**:
- `400` — Zod validation failed or hCaptcha invalid
- `500` — Internal server error

**Side Effects**: Creates `ContactSubmission` DB record, sends admin notification email to `ADMIN_EMAIL`

**Security**: hCaptcha server-side verification, Zod validation, IP/userAgent logged

---

## POST /api/newsletter

**Purpose**: Subscribe an email address to the Afribit newsletter.

**Request Body**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `email` | string | yes | valid email format |
| `name` | string | no | min 2 chars if provided |

**Success Response** `200`:
```json
{ "success": true, "message": "Successfully subscribed to our newsletter!" }
```

**Re-activation Response** `200`:
```json
{ "success": true, "message": "Welcome back! Your subscription has been reactivated." }
```

**Error Responses**:
- `400` — Validation failed or email already ACTIVE
- `500` — Internal server error

**Side Effects**: Creates or reactivates `Subscriber` DB record, sends welcome email

**Security**: Zod validation

---

## POST /api/donations/create-invoice

**Purpose**: Create a BTCPay Server invoice for a donation.

**Request Body**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `amount` | number | yes | positive, min 1 |
| `currency` | `"USD"` \| `"BTC"` | no | default `"USD"` |
| `donorName` | string | no | min 2 chars |
| `donorEmail` | string | no | valid email |
| `program` | string | no | program slug |
| `message` | string | no | max 500 chars |
| `isAnonymous` | boolean | no | default `false` |

**Success Response** `200`:
```json
{
  "success": true,
  "data": {
    "invoiceId": "string",
    "checkoutUrl": "string",
    "status": "New",
    "donationId": "uuid"
  }
}
```

**Error Responses**:
- `400` — Validation failed
- `404` — Program slug not found
- `500` — BTCPay invoice creation failed

**Side Effects**: Creates `Donation` DB record (status `PENDING`), creates BTCPay invoice

**Security**: Zod validation, program existence verified before invoice creation

---

## GET /api/donations/check-status

**Purpose**: Poll the status of a BTCPay invoice.

**Query Params**:
| Param | Type | Required |
|-------|------|----------|
| `invoiceId` | string | yes |

**Success Response** `200`:
```json
{
  "success": true,
  "data": {
    "status": "New | Processing | Settled | Expired | Invalid",
    "invoiceId": "string"
  }
}
```

**Error Responses**:
- `400` — Missing `invoiceId`
- `404` — Invoice not found
- `500` — BTCPay query failed

---

## POST /api/donations/webhook

**Purpose**: Receive BTCPay Server invoice lifecycle events and update donation status.

**Headers Required**:
| Header | Value |
|--------|-------|
| `btcpay-sig` | HMAC-SHA256 signature of raw body |

**Payload** (BTCPay standard):
```json
{
  "type": "InvoiceSettled | InvoiceExpired | InvoiceProcessing | ...",
  "invoiceId": "string",
  "afterExpiration": false
}
```

**Success Response** `200`:
```json
{ "success": true }
```

**Error Responses**:
- `401` — Missing or invalid HMAC signature
- `500` — Processing error

**Side Effects**:
- Updates `Donation.status` in DB to `COMPLETED`, `EXPIRED`, or `PROCESSING`
- On `InvoiceSettled`: sends confirmation email to donor (if email provided) and admin notification

**Security**: HMAC `btcpay-sig` verified with `crypto.timingSafeEqual` before any processing
