"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import type { Service } from "@/lib/services"

interface ServiceSpecificTestimonialProps {
  service: Service
}

export default function ServiceSpecificTestimonial({ service }: ServiceSpecificTestimonialProps) {
  // Sample testimonials specific to each service type
  const testimonials: Record<string, { name: string; quote: string; image: string }> = {
    "back-pain-relief": {
      name: "Priya Sharma",
      quote:
        "After suffering from chronic back pain for years, Dr. Yogita's back pain relief program has been life-changing. Her personalized approach and expertise helped me regain mobility and live pain-free.",
      image: "/indian-woman-professional-headshot.png",
    },
    "posture-correction": {
      name: "Rahul Mehta",
      quote:
        "The posture correction program has transformed not just my physical appearance but also eliminated my chronic neck pain. Dr. Yogita's attention to detail and personalized exercises made all the difference.",
      image: "/indian-man-headshot.png",
    },
    "online-therapy": {
      name: "Ananya Patel",
      quote:
        "Even through online sessions, Dr. Yogita was able to accurately assess my condition and provide effective treatment. The convenience of therapy from home without compromising on quality has been incredible.",
      image: "/indian-yoga-instructor-headshot.png",
    },
    "chronic-fatigue-relief": {
      name: "Vikram Singh",
      quote:
        "Dr. Yogita's chronic fatigue program gave me my life back. Her holistic approach addressed not just the physical symptoms but also the lifestyle factors contributing to my fatigue. I now have energy I haven't felt in years.",
      image: "/indian-man-portrait.png",
    },
  }

  const testimonial = testimonials[service.slug] || {
    name: "Happy Patient",
    quote: "Dr. Yogita's expertise and personalized care have made a significant difference in my recovery journey.",
    image: "/thoughtful-artist.png",
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Patient Success Story</h2>
          <div className="w-20 h-1 bg-pink-400 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-pink-100 shadow-lg overflow-hidden">
            <CardContent className="p-8 relative">
              <Quote className="absolute top-6 left-6 h-24 w-24 text-pink-100 -z-10" />

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-pink-100">
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
                  <p className="text-gray-700 italic mb-4 text-lg">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-pink-500">{service.title} Patient</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
