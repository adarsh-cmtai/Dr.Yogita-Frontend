"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Home Banner.jpg"
          alt="Physiotherapy session"
          fill
          className="object-cover brightness-[0.65] filter"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 to-blue-900/50 mix-blend-multiply"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
              Trusted by 5000+ Patients in Delhi NCR
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-[#f0f0f0] mb-6 leading-tight text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-400 to-rose-500">
              Relieve Pain.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-cyan-500">
              Regain Power.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            22+ Years of Transforming Lives with Expert Physiotherapy and Personalized Care
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6 text-lg group relative overflow-hidden shadow-lg"
            >
              <Link href="/booking">
                <span className="relative z-10 cursor-pointer">
                  Book Free Consultation
                </span>
              </Link>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 group-hover:scale-105 transition-transform duration-300"></span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Link href="/services">
              {/* <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-black hover:bg-white/10 rounded-full px-6 py-6 text-lg backdrop-blur-sm"
              >
                Explore Services
              </Button> */}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
