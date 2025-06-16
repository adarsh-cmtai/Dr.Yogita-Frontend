"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Phone } from "lucide-react"

export default function ServiceCTA() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <motion.div
            className="w-full lg:w-2/3 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Recovery Journey?</h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl">
              Our expert physiotherapists are ready to help you achieve your health goals. Book a consultation today and
              take the first step towards a pain-free life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <button className="bg-white text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-md font-medium flex items-center transition-colors">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointment
                </button>
              </Link>
              <Link href="tel:+919876543210">
                <button className="bg-transparent border border-white hover:bg-white/10 px-6 py-3 rounded-md font-medium flex items-center transition-colors">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-pink-600 text-xl font-bold mb-2">First Consultation</h3>
              <p className="text-gray-600 mb-4">Comprehensive assessment and treatment plan</p>
              <div className="text-3xl font-bold text-gray-800 mb-4">₹1,200</div>
              <p className="text-gray-500 text-sm mb-6">60-minute session</p>
              <Link href="/contact" className="block">
                <button className="bg-pink-500 hover:bg-pink-600 text-white w-full py-3 rounded-md font-medium transition-colors">
                  Book Now
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
