# Donation API Documentation

This document describes the three donation API endpoints that integrate with BTCPay Server for Bitcoin donations.

## API Endpoints

### 1. Create Donation Invoice

**Endpoint:** `POST /api/donations/create-invoice`

**Description:** Creates a new BTCPay invoice for a donation and saves it to the database.

**Request Body:**
```json
{
  "amount": 50,
  "currency": "USD",
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "program": "bitcoin-education",
  "message": "Keep up the great work!",
  "isAnonymous": false
}
```

**Request Schema:**
- `amount` (required): Number, minimum 1
- `currency` (optional): "USD" or "BTC", defaults to "USD"
- `donorName` (optional): String, minimum 2 characters
- `donorEmail` (optional): Valid email address
- `program` (optional): String, program slug (e.g., "bitcoin-education")
- `message` (optional): String, max 500 characters
- `isAnonymous` (optional): Boolean, defaults to false

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "donationId": "uuid-here",
    "invoiceId": "btcpay-invoice-id",
    "checkoutLink": "https://btcpay.afribit.africa/i/abc123",
    "amount": 50,
    "currency": "USD"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "path": ["amount"],
      "message": "Minimum donation is $1"
    }
  ]
}
```

**Status Codes:**
- `200`: Success
- `400`: Validation error
- `404`: Program not found
- `500`: Server error

---

### 2. Check Donation Status

**Endpoint:** `GET /api/donations/check-status/[invoiceId]`

**Description:** Checks the status of a donation invoice from BTCPay and updates the database.

**URL Parameters:**
- `invoiceId`: BTCPay invoice ID

**Example:**
```
GET /api/donations/check-status/abc123def456
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "donationId": "uuid-here",
    "invoiceId": "abc123def456",
    "status": "COMPLETED",
    "btcpayStatus": "Settled",
    "amount": "50.00000000",
    "currency": "USD",
    "createdAt": 1729929600000,
    "expirationTime": 1729933200000,
    "checkoutLink": "https://btcpay.afribit.africa/i/abc123",
    "program": "bitcoin-education"
  }
}
```

**Donation Statuses:**
- `PENDING`: Invoice created, awaiting payment
- `PROCESSING`: Payment detected, being confirmed
- `COMPLETED`: Payment settled successfully
- `FAILED`: Invoice expired or invalid
- `EXPIRED`: Invoice expired without payment

**BTCPay Statuses:**
- `New`: Invoice created
- `Processing`: Payment being confirmed
- `Settled`: Payment confirmed and settled
- `Expired`: Invoice expired
- `Invalid`: Invoice invalid

**Status Codes:**
- `200`: Success
- `400`: Missing invoice ID
- `404`: Invoice or donation not found
- `500`: Server error

---

### 3. Webhook Handler

**Endpoint:** `POST /api/donations/webhook`

**Description:** Handles webhook events from BTCPay Server to update donation status in real-time.

**Security:** 
- Requires valid HMAC SHA256 signature in `btcpay-sig` header
- Signature verified using `BTCPAY_WEBHOOK_SECRET`

**Headers:**
```
btcpay-sig: sha256=<hmac-signature>
```

**Request Body (Example):**
```json
{
  "type": "InvoiceSettled",
  "invoiceId": "abc123def456",
  "storeId": "your-store-id",
  "timestamp": 1729929600
}
```

**Handled Event Types:**
- `InvoiceSettled`: Payment confirmed → Status: `COMPLETED`
- `InvoiceProcessing`: Payment processing → Status: `COMPLETED`
- `InvoicePaymentSettled`: Payment confirmed → Status: `PROCESSING`
- `InvoiceReceivedPayment`: Payment detected → Status: `PROCESSING`
- `InvoiceExpired`: Invoice expired → Status: `FAILED`
- `InvoiceInvalid`: Invoice invalid → Status: `FAILED`

**Response (Success):**
```json
{
  "success": true,
  "message": "Webhook processed successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid signature"
}
```

**Status Codes:**
- `200`: Success
- `401`: Invalid signature or missing signature
- `404`: Donation not found
- `500`: Server error

---

## Database Updates

### Donation Record Updates

When a donation status changes to `COMPLETED`:
1. Donation `status` field is updated
2. `completedAt` timestamp is set
3. Program's `raised` amount is incremented
4. TODO: Confirmation email sent to donor (Task 7)

### Program Updates

When a donation is completed and linked to a program:
```typescript
await prisma.program.update({
  where: { slug: donation.program },
  data: {
    raised: {
      increment: parseFloat(donation.amount.toString())
    }
  }
})
```

---

## Environment Variables Required

```env
# BTCPay Server Configuration
BTCPAY_HOST=https://btcpay.afribit.africa
BTCPAY_API_KEY=your-api-key-here
BTCPAY_STORE_ID=your-store-id-here
BTCPAY_WEBHOOK_SECRET=your-webhook-secret-here

# Site URL (for redirects)
NEXT_PUBLIC_SITE_URL=https://afribit.africa
```

---

## BTCPay Server Webhook Setup

1. Go to BTCPay Server → Store Settings → Webhooks
2. Click "Create Webhook"
3. Set Payload URL: `https://afribit.africa/api/donations/webhook`
4. Set Secret: Same as `BTCPAY_WEBHOOK_SECRET`
5. Select events:
   - Invoice Settled
   - Invoice Processing
   - Invoice Payment Settled
   - Invoice Received Payment
   - Invoice Expired
   - Invoice Invalid
6. Save webhook

---

## Usage Flow

### Frontend Flow:
1. User fills donation form with amount, email, program, etc.
2. Frontend calls `POST /api/donations/create-invoice`
3. Backend creates BTCPay invoice and returns `checkoutLink`
4. Frontend redirects user to `checkoutLink` (BTCPay checkout page)
5. User completes Bitcoin payment on BTCPay
6. Frontend polls `GET /api/donations/check-status/[invoiceId]` for status updates
7. BTCPay sends webhook to `POST /api/donations/webhook` (background)
8. Frontend shows success message when status is `COMPLETED`

### Backend Flow:
1. `create-invoice`: Validates input → Creates BTCPay invoice → Saves to DB → Returns checkout link
2. `check-status`: Queries BTCPay → Updates DB if status changed → Updates program totals → Returns current status
3. `webhook`: Verifies signature → Maps event to status → Updates DB → Updates program totals → Logs completion

---

## Error Handling

All endpoints return consistent error format:
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

Common errors:
- Missing BTCPay credentials: "BTCPay client not configured"
- Invalid program: "Program not found"
- Validation errors: "Validation failed" with `details` array
- Webhook verification: "Invalid signature"

---

## Testing

### Test Create Invoice:
```bash
curl -X POST http://localhost:3000/api/donations/create-invoice \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10,
    "currency": "USD",
    "donorEmail": "test@example.com",
    "program": "bitcoin-education"
  }'
```

### Test Check Status:
```bash
curl http://localhost:3000/api/donations/check-status/YOUR_INVOICE_ID
```

### Test Webhook (with signature):
```bash
# Note: Signature must be valid HMAC SHA256
curl -X POST http://localhost:3000/api/donations/webhook \
  -H "Content-Type: application/json" \
  -H "btcpay-sig: sha256=YOUR_SIGNATURE" \
  -d '{
    "type": "InvoiceSettled",
    "invoiceId": "YOUR_INVOICE_ID"
  }'
```

---

## Next Steps (Task 3 - Donation Components)

Now that the API routes are complete, the next task is to build the frontend components:

1. **DonationModal.tsx**: Main modal with donation form
2. **QRCodeDisplay.tsx**: Display Bitcoin/Lightning QR codes
3. **PaymentMethodSelector.tsx**: Toggle between payment methods
4. **InvoiceStatus.tsx**: Poll status and show payment progress
5. **DonationSuccessScreen.tsx**: Show success message
6. **ImpactCalculator.tsx**: Interactive donation impact slider

These components will use the API routes created in this task.
