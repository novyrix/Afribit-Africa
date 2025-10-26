"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Send } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters").optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null)
  const hCaptchaRef = useRef<HCaptcha>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    if (!hCaptchaToken) {
      toast.error("Please complete the captcha verification")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          hCaptchaToken,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(result.message || "Message sent successfully!")
        form.reset()
        setHCaptchaToken(null)
        hCaptchaRef.current?.resetCaptcha()
      } else {
        toast.error(result.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      toast.error("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleHCaptchaVerify = (token: string) => {
    setHCaptchaToken(token)
  }

  const handleHCaptchaExpire = () => {
    setHCaptchaToken(null)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field (Optional) */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+254 700 000 000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Subject Field */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="What is this about?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us how we can help you..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* hCaptcha */}
        <div className="flex justify-center">
          <HCaptcha
            ref={hCaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "8f1c3650-7f0c-461c-95f2-a8344cfac1f2"}
            onVerify={handleHCaptchaVerify}
            onExpire={handleHCaptchaExpire}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          variant="gradient"
          className="w-full"
          loading={isSubmitting}
          disabled={!hCaptchaToken}
        >
          {isSubmitting ? (
            'Sending Message...'
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
