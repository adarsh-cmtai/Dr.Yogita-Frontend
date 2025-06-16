"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Search } from "lucide-react"

export default function BlogHero() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://media.istockphoto.com/id/1226292156/vector/fitness-trainer-online.jpg?s=612x612&w=0&k=20&c=wq7eXTJ6B5AqFMKErp0xhS4fVEEFxKOTI-_17xdddng="
          alt="Health tips and blog"
          fill
          className="object-cover brightness-[0.7] filter"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/40 to-blue-900/40 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Health Tips & Insights
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/90 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Expert advice, practical tips, and evidence-based information to help you live a healthier, pain-free life.
          </motion.p>

          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for health tips..."
                className="w-full px-5 py-4 pr-12 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-600 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
