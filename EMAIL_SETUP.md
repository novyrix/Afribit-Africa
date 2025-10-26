# Email System Setup Guide

## Overview

The Afribit Africa website includes a comprehensive email notification system for:
- **Donation confirmations** - Sent to donors when payments complete
- **Contact form notifications** - Sent to admins when users submit contact forms
- **Newsletter welcomes** - Sent to new newsletter subscribers
- **Admin notifications** - Sent to admins for new donations

## Email Templates

All email templates are located in `src/lib/email-templates.ts` and include:

### 1. Donation Confirmation Email
- **Trigger**: When BTCPay webhook confirms payment completion
- **Recipient**: Donor (if email provided)
- **Content**: 
  - Thank you message
  - Donation details (amount, currency, program)
  - Impact metrics calculation
  - Transaction ID
  - Links to see programs in action

### 2. Contact Form Notification
- **Trigger**: When user submits contact form
- **Recipient**: Admin email (configured in `.env`)
- **Content**:
  - Sender details (name, email, phone)
  - Subject line
  - Message content
  - Timestamp

### 3. Newsletter Welcome Email
- **Trigger**: When user subscribes to newsletter
- **Recipient**: New subscriber
- **Content**:
  - Welcome message
  - What to expect (monthly updates, Bitcoin education, impact reports)
  - Links to explore website
  - Unsubscribe option

### 4. Admin Donation Notification
- **Trigger**: When donation is completed
- **Recipient**: Admin email
- **Content**:
  - Donation amount and currency
  - Donor information (or "Anonymous")
  - Program selection
  - Transaction details

## SMTP Configuration

### Required Environment Variables

Add these to your `.env.local` file:

```env
# SMTP Server Settings
SMTP_HOST="smtp.gmail.com"              # Your SMTP host
SMTP_PORT="587"                          # SMTP port (587 for TLS, 465 for SSL)
SMTP_SECURE="false"                      # Set to "true" for port 465
SMTP_USER="your-email@gmail.com"         # SMTP username
SMTP_PASSWORD="your-app-password"        # SMTP password (use app-specific password)
SMTP_FROM="noreply@afribit.africa"       # From email address
ADMIN_EMAIL="admin@afribit.africa"       # Admin notification recipient
```

### Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Afribit Website"
   - Copy the 16-character password
3. **Configure `.env.local`**:
   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_SECURE="false"
   SMTP_USER="your-gmail@gmail.com"
   SMTP_PASSWORD="your-16-char-app-password"
   SMTP_FROM="your-gmail@gmail.com"
   ADMIN_EMAIL="admin@afribit.africa"
   ```

### Other SMTP Providers

#### SendGrid
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
```

#### Mailgun
```env
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
SMTP_USER="postmaster@your-domain.mailgun.org"
SMTP_PASSWORD="your-mailgun-smtp-password"
```

#### AWS SES
```env
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_PORT="587"
SMTP_USER="your-ses-smtp-username"
SMTP_PASSWORD="your-ses-smtp-password"
```

#### Custom SMTP Server
```env
SMTP_HOST="mail.your-domain.com"
SMTP_PORT="587"
SMTP_USER="noreply@your-domain.com"
SMTP_PASSWORD="your-smtp-password"
```

## Email Utility Functions

### `sendEmail(options)`

Located in `src/lib/email.ts`, this function handles all email sending:

```typescript
import { sendEmail } from '@/lib/email';

await sendEmail({
  to: 'recipient@example.com',
  subject: 'Email Subject',
  html: '<h1>HTML Content</h1>',
  text: 'Plain text fallback (optional)',
});
```

**Features**:
- Automatic plain text generation from HTML
- Error handling with detailed logging
- Graceful failure (doesn't crash if email fails)
- Configuration validation

### `verifyEmailConfig()`

Verifies SMTP configuration is correct:

```typescript
import { verifyEmailConfig } from '@/lib/email';

const isValid = await verifyEmailConfig();
if (isValid) {
  console.log('Email is configured correctly');
}
```

## API Integration

### Contact Form (`/api/contact`)

Automatically sends admin notification when form is submitted:

```typescript
if (process.env.ADMIN_EMAIL) {
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
  }).catch(error => {
    console.error('Failed to send admin notification:', error);
    // Request still succeeds even if email fails
  });
}
```

### Donation Webhook (`/api/donations/webhook`)

Sends two emails when donation completes:

1. **Donor confirmation** (if email provided):
```typescript
await sendEmail({
  to: donation.donorEmail,
  subject: donorEmailTemplate.subject,
  html: donorEmailTemplate.html,
});
```

2. **Admin notification**:
```typescript
await sendEmail({
  to: process.env.ADMIN_EMAIL,
  subject: adminEmailTemplate.subject,
  html: adminEmailTemplate.html,
});
```

### Newsletter Signup (`/api/newsletter`)

Sends welcome email to new subscribers:

```typescript
await sendEmail({
  to: subscriber.email,
  subject: emailTemplate.subject,
  html: emailTemplate.html,
});
```

## Testing

### Local Testing

1. **Configure `.env.local`** with valid SMTP credentials
2. **Start dev server**: `npm run dev`
3. **Test contact form**: Visit http://localhost:3000/contact
4. **Test newsletter**: Use newsletter form on homepage
5. **Test donations**: Complete a test donation (requires BTCPay setup)

### Email Preview

To preview email templates without sending:

```typescript
import { donationConfirmationEmail } from '@/lib/email-templates';

const template = donationConfirmationEmail({
  donorName: 'John Doe',
  amount: '100',
  currency: 'USD',
  program: 'bitcoin-education',
  invoiceId: 'test-invoice-123',
  isAnonymous: false,
});

console.log(template.html); // Preview HTML
```

### Error Handling

All email sends are wrapped in try-catch blocks and will not crash the application if email fails:

```typescript
await sendEmail({ ... }).catch(error => {
  console.error('Failed to send email:', error);
  // Application continues normally
});
```

## Production Considerations

### 1. Use Professional SMTP Service

For production, use a dedicated email service:
- **SendGrid** (recommended) - Free tier: 100 emails/day
- **Mailgun** - Free tier: 5,000 emails/month
- **AWS SES** - Very low cost, high deliverability
- **Postmark** - Excellent for transactional emails

### 2. Domain Verification

Configure SPF, DKIM, and DMARC records:

**SPF Record** (Add to DNS):
```
v=spf1 include:_spf.google.com ~all
```

**DKIM** (Configure with email provider)

**DMARC Record**:
```
v=DMARC1; p=none; rua=mailto:dmarc@afribit.africa
```

### 3. Email Rate Limits

Be aware of sending limits:
- Gmail: 500 emails/day
- SendGrid Free: 100 emails/day
- Mailgun Free: 5,000 emails/month

### 4. Email Deliverability

To improve deliverability:
- Use verified domain for `SMTP_FROM`
- Enable DKIM signing
- Monitor bounce rates
- Include unsubscribe links
- Avoid spam trigger words

### 5. Template Testing

Test emails across clients:
- Gmail (desktop & mobile)
- Outlook (desktop & mobile)
- Apple Mail
- Yahoo Mail

Use services like:
- [Litmus](https://litmus.com/)
- [Email on Acid](https://www.emailonacid.com/)
- [Mail Tester](https://www.mail-tester.com/)

### 6. Monitoring

Set up email monitoring:
- Track delivery rates
- Monitor bounce rates
- Log failed sends
- Alert on SMTP errors

### 7. Compliance

Ensure GDPR/CAN-SPAM compliance:
- Include physical address
- Provide unsubscribe mechanism
- Honor opt-out requests within 10 days
- Don't sell email lists

## Troubleshooting

### Email Not Sending

1. **Check environment variables**:
   ```bash
   echo $SMTP_USER
   echo $SMTP_HOST
   ```

2. **Verify SMTP credentials**:
   ```typescript
   import { verifyEmailConfig } from '@/lib/email';
   await verifyEmailConfig();
   ```

3. **Check logs** for detailed error messages

### Gmail "Less Secure Apps" Error

Use **App Passwords** instead of your regular password (see Gmail Setup above)

### SMTP Connection Timeout

- Verify `SMTP_HOST` and `SMTP_PORT`
- Check firewall settings
- Try different port (587 vs 465)

### Emails Going to Spam

- Configure SPF/DKIM/DMARC
- Use verified sending domain
- Avoid spam trigger words
- Include plain text version
- Test with [Mail Tester](https://www.mail-tester.com/)

### "Invalid Login" Error

- Double-check `SMTP_USER` and `SMTP_PASSWORD`
- Ensure 2FA is enabled (for Gmail)
- Use app-specific password
- Verify account is active

## Email Template Customization

### Modifying Templates

Edit `src/lib/email-templates.ts`:

```typescript
export function donationConfirmationEmail({ ... }) {
  return {
    subject: `Custom Subject`,
    html: `
      <!DOCTYPE html>
      <html>
        <!-- Your custom HTML -->
      </html>
    `,
  };
}
```

### Adding New Templates

1. **Create template function** in `src/lib/email-templates.ts`
2. **Import in API route**
3. **Call `sendEmail()`** with template

Example:
```typescript
export function customTemplate(data: CustomData) {
  return {
    subject: 'Custom Email',
    html: `<h1>Hello ${data.name}</h1>`,
  };
}
```

### Using External Templates

For advanced templates, consider:
- **MJML** - Responsive email framework
- **React Email** - React-based email templates
- **Foundation for Emails** - Framework by ZURB

## Support

For email system issues:
1. Check this documentation
2. Review console logs
3. Test SMTP credentials
4. Contact email provider support

## Dependencies

- **nodemailer**: ^6.9.7
- **@types/nodemailer**: ^6.4.14

Install with:
```bash
npm install nodemailer
npm install -D @types/nodemailer
```
