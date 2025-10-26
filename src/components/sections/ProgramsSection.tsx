"use client"

import { Container } from "@/components/layout/Container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { programs } from "@/data/programs"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, GraduationCap, Bike, Recycle, TrendingUp, Smartphone } from "lucide-react"

const iconMap = {
  GraduationCap,
  Bike,
  Recycle,
  TrendingUp,
  Smartphone,
}

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const percentage = Math.min((raised / goal) * 100, 100)
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Raised</span>
        <span className="font-semibold text-bitcoin">
          ${raised.toLocaleString()} / ${goal.toLocaleString()}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-bitcoin rounded-full"
        />
      </div>
      <p className="text-xs text-muted-foreground text-right">
        {percentage.toFixed(1)}% funded
      </p>
    </div>
  )
}

export function ProgramsSection() {
  return (
    <section className="section-lg bg-gray-50">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Programs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Five key initiatives driving Bitcoin adoption and community development in Kibera
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {programs.map((program, index) => {
            const Icon = iconMap[program.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 group">
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    {Icon && (
                      <div className="absolute top-4 right-4 bg-bitcoin p-3 rounded-full">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-bitcoin transition-colors">
                      {program.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {program.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="grow">
                    {program.goal && program.raised && (
                      <ProgressBar raised={program.raised} goal={program.goal} />
                    )}
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full group-hover:bg-bitcoin group-hover:text-white group-hover:border-bitcoin transition-all"
                    >
                      <Link href={`/programs#${program.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* View All Programs CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="bg-bitcoin hover:bg-bitcoin-dark">
            <Link href="/programs">
              View All Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
