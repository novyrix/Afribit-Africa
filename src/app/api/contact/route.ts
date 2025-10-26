import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'
import { contactFormNotification } from '@/lib/email-templates'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  hCaptchaToken: z.string().min(1, 'Please complete the captcha'),
})

// Verify hCaptcha token
async function verifyHCaptcha(token: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET
  
  if (!secret) {
    console.error('HCAPTCHA_SECRET not configured')
    return false
  }

  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `response=${token}&secret=${secret}`,
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('hCaptcha verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Verify hCaptcha
    const isHCaptchaValid = await verifyHCaptcha(validatedData.hCaptchaToken)
    
    if (!isHCaptchaValid) {
      return NextResponse.json(
        { success: false, error: 'Captcha verification failed' },
        { status: 400 }
      )
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject || 'General Inquiry',
        message: validatedData.message,
        status: 'PENDING',
      },
    })

    // Send admin notification email
    if (process.env.ADMIN_EMAIL) {
      const emailTemplate = contactFormNotification({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
        submittedAt: submission.createdAt,
      });

      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      }).catch(error => {
        console.error('Failed to send admin notification email:', error);
        // Don't fail the request if email fails
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. We will get back to you soon.',
      data: { id: submission.id },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
