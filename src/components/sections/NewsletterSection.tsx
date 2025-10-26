"use client"

import { Container } from "@/components/layout/Container"
import { NewsletterForm } from "@/components/forms/NewsletterForm"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"

export function NewsletterSection() {
  return (
    <section className="section-lg bg-bitcoin text-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/10">
            <Mail className="w-8 h-8" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          
          <p className="text-xl mb-8 opacity-90">
            Get the latest news about Bitcoin adoption in Kenya, program updates, and community success stories delivered to your inbox.
          </p>

          <div className="max-w-md mx-auto">
            <NewsletterForm inline showName={false} />
          </div>

          <p className="text-sm mt-4 opacity-75">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
