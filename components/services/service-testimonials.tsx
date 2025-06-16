"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"

export default function ServiceTestimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      service: "Back Pain Relief",
      image: "/indian-woman-professional-headshot.png",
      quote:
        "After suffering from chronic back pain for years, Dr. Yogita's back pain relief program has been life-changing. Her personalized approach and expertise helped me regain mobility and live pain-free.",
    },
    {
      name: "Rahul Mehta",
      service: "Posture Correction",
      image: "/indian-man-headshot.png",
      quote:
        "The posture correction program has transformed not just my physical appearance but also eliminated my chronic neck pain. Dr. Yogita's attention to detail and personalized exercises made all the difference.",
    },
    {
      name: "Ananya Patel",
      service: "Online Therapy",
      image: "/indian-yoga-instructor-headshot.png",
      quote:
        "Even through online sessions, Dr. Yogita was able to accurately assess my condition and provide effective treatment. The convenience of therapy from home without compromising on quality has been incredible.",
    },
  ]

  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1)
  }

  useEffect(() => {
    // Auto-advance slides
    timeoutRef.current = setTimeout(nextSlide, 5000)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our patients who have experienced the transformative power of our specialized physiotherapy
            services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div>
                          <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                          <div>
                            <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                            <p className="text-sm text-pink-500">{testimonial.service}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 bg-white shadow-md border-pink-100 z-10"
            onClick={() => {
              prevSlide()
              if (timeoutRef.current) clearTimeout(timeoutRef.current)
              timeoutRef.current = setTimeout(nextSlide, 5000)
            }}
          >
            <ChevronLeft className="h-5 w-5 text-pink-500" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 bg-white shadow-md border-pink-100 z-10"
            onClick={() => {
              nextSlide()
              if (timeoutRef.current) clearTimeout(timeoutRef.current)
              timeoutRef.current = setTimeout(nextSlide, 5000)
            }}
          >
            <ChevronRight className="h-5 w-5 text-pink-500" />
          </Button>
        </div>
      </div>
    </section>
  )
}
