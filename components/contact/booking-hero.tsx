"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function BookingHero() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/contact/contact-hero-bg.jpg"
          alt="Contact Dr. Yogita Physiotherapy"
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
            Get In Touch
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/90 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We're here to answer your questions and help you start your journey to pain-free living.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a
              href="#contact-form"
              className="bg-white text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-md font-medium transition-colors duration-300"
            >
              Send a Message
            </a>
            <a
              href="#contact-info"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors duration-300"
            >
              Contact Information
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
