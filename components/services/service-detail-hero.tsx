"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Service } from "@/lib/services"

interface ServiceDetailHeroProps {
  service: Service
}

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-pink-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:text-pink-500 transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link href="/services" className="hover:text-pink-500 transition-colors">
                  Services
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-pink-500">{service.title}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{service.title}</h1>
              <div className="w-20 h-1 bg-pink-400 mb-6"></div>
              <p className="text-lg text-gray-600 mb-8">{service.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#benefits">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
                    Explore Benefits
                  </button>
                </Link>
                <Link href="#contact">
                  <button className="border border-pink-500 text-pink-500 hover:bg-pink-50 px-6 py-3 rounded-md font-medium transition-colors">
                    Book Consultation
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="bg-pink-50 p-4 rounded">
                  <div className="text-pink-500 font-bold text-xl mb-1">Expert Care</div>
                  <div className="text-gray-600">Personalized treatment plans for optimal results</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
