"use client"

import { Container } from "@/components/layout/Container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { YouTubeEmbed } from "@/components/ui/youtube-embed"
import { motion, AnimatePresence } from "framer-motion"
import { testimonials } from "@/data/testimonials"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote, Play } from "lucide-react"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Change every 6 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Community Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from real people whose lives have been transformed by Bitcoin
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    {/* Image/Video Side */}
                    <div className="relative h-64 md:h-auto min-h-[300px]">
                      {currentTestimonial.youtubeId ? (
                        <div className="h-full flex items-center">
                          <YouTubeEmbed 
                            videoId={currentTestimonial.youtubeId} 
                            title={`${currentTestimonial.name} - ${currentTestimonial.role}`}
                          />
                        </div>
                      ) : (
                        <>
                          <Image
                            src={currentTestimonial.image || "/Images/Hero section video background fallback.png"}
                            alt={currentTestimonial.name}
                            fill
                            className="object-cover"
                          />
                          {currentTestimonial.videoUrl && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors cursor-pointer group">
                              <div className="bg-bitcoin p-4 rounded-full group-hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-white" fill="white" />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Content Side */}
                    <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                      <Quote className="w-12 h-12 text-bitcoin mb-6" />
                      
                      <blockquote className="text-lg md:text-xl text-gray-700 mb-6 italic">
                        &quot;{currentTestimonial.quote}&quot;
                      </blockquote>

                      <div className="mt-auto">
                        <p className="font-semibold text-lg">{currentTestimonial.name}</p>
                        {currentTestimonial.role && (
                          <p className="text-bitcoin font-medium">{currentTestimonial.role}</p>
                        )}
                        {currentTestimonial.location && (
                          <p className="text-sm text-muted-foreground">{currentTestimonial.location}</p>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-white shadow-lg hover:bg-bitcoin hover:text-white"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-white shadow-lg hover:bg-bitcoin hover:text-white"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-bitcoin w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            {currentIndex + 1} / {testimonials.length}
          </p>
        </div>
      </Container>
    </section>
  )
}
