"use client"

import { Container } from "@/components/layout/Container"
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingUp, Users, Zap, Heart } from "lucide-react"

interface StatItemProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2000 // 2 seconds
      const increment = end / (duration / 16) // 60 FPS

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-bitcoin">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  )
}

function StatItem({ icon, value, label, suffix, prefix }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center group cursor-default"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-bitcoin/10 group-hover:bg-bitcoin transition-all duration-300 group-hover:scale-110">
        <div className="text-bitcoin group-hover:text-white transition-colors">{icon}</div>
      </div>
      <AnimatedCounter value={value} suffix={suffix} prefix={prefix} />
      <div className="text-muted-foreground mt-3 text-sm md:text-base font-medium">{label}</div>
    </motion.div>
  )
}

export function StatisticsSection() {
  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 2000,
      label: "Bitcoin Transactions",
      suffix: "+",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 200,
      label: "Merchants Onboarded",
      suffix: "+",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: 5,
      label: "Active Programs",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      value: 1000,
      label: "Community Members",
      suffix: "+",
    },
  ]

  return (
    <section className="section-lg bg-white border-y">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real change, measurable results. See how we&apos;re transforming communities through Bitcoin.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  )
}
