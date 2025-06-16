"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import type { Service } from "@/lib/services"

interface ServiceBenefitsProps {
  service: Service
}

export default function ServiceBenefits({ service }: ServiceBenefitsProps) {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Benefits of {service.title}</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how our specialized {service.title.toLowerCase()} program can help improve your quality of life and
            overall well-being.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-rose-50/50 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <CheckCircle className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
