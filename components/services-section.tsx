"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SpadeIcon as Spine, ArrowUpRight, MonitorSmartphone, BatteryCharging } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      title: "Pain Relief & Recovery (Online & Offline)",
      description: "Targeted therapy to reduce back, neck, and joint pain effectively, available both virtually and in-person.",
      icon: <Spine className="h-10 w-10 text-pink-500" />,
    },
    {
      title: "Posture & Spine Care (Online & Offline)",
      description: "Personalized programs to improve posture and prevent spine-related issues, accessible through virtual consultations or face-to-face sessions.",
      icon: <ArrowUpRight className="h-10 w-10 text-pink-500" />,
    },
    {
      title: "Virtual Physiotherapy Consultation and Session",
      description: "Receive expert physiotherapy care from the comfort of your home. Tailored assessments and treatments, all delivered virtually for your convenience.",
      icon: <MonitorSmartphone className="h-10 w-10 text-pink-500" />,
    },
    {
      title: " Strength & Wellness Programs (Online & Offline)",
      description: "Build strength, improve flexibility, and enhance overall well-being through in-person sessions or virtual support.",
      icon: <BatteryCharging className="h-10 w-10 text-pink-500" />,
    },
  ]

  const [flipped, setFlipped] = useState<number | null>(null)

  const handleFlip = (index: number) => {
    if (flipped === index) {
      setFlipped(null)
    } else {
      setFlipped(index)
    }
  }

  return (
    <section className="py-20 bg-rose-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Services We Offer</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our specialized physiotherapy services are designed to address your unique needs and help you achieve
            optimal health and wellness.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="perspective-1000"
            >
              <div
                className={`relative w-full h-80 transition-transform duration-500 transform-style-3d cursor-pointer ${flipped === index ? "rotate-y-180" : ""
                  }`}
                onClick={() => handleFlip(index)}
              >
                {/* Front of card */}
                <Card
                  className={`absolute w-full h-full backface-hidden ${flipped === index ? "invisible" : ""
                    } hover:shadow-lg transition-shadow duration-300 card-hover border-pink-100`}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                    <div className="mb-6">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                    <div className="w-12 h-0.5 bg-pink-300 mx-auto mb-8"></div>

                    <Button variant="outline" className="border-pink-400 text-pink-600 hover:bg-pink-50">
                      To Know More
                    </Button>
                  </CardContent>

                </Card>

                {/* Back of card */}
                <Card
                  className={`absolute w-full h-full backface-hidden rotate-y-180 ${flipped === index ? "" : "invisible"
                    } border-pink-300 bg-gradient-to-br from-pink-50 to-white`}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-between h-full text-center">
                    <h3 className="text-xl font-semibold text-pink-600 mb-4">{service.title}</h3>
                    <p className="text-gray-700 mb-6">{service.description}</p>
                    <Link href="/booking">
                      <Button variant="outline" className="border-pink-400 text-pink-600 hover:bg-pink-50">
                        Know More
                      </Button>
                    </Link>

                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
