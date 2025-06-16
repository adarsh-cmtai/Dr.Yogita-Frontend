"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Check, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export interface ServicePageProps {
  title: string
  description: string
  image: string
  benefits: string[]
  longDescription?: string
  process?: {
    title: string
    description: string
  }[]
}

export default function ServicePageTemplate({
  title,
  description,
  image,
  benefits,
  longDescription,
  process,
}: ServicePageProps) {
  return (
    <div className="pt-20 bg-rose-50/30">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-pink-50 opacity-70"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">{title}</h1>
              <p className="text-lg text-gray-600 mb-6">{description}</p>
              <Link href="/booking">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-medium flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-blue-200 rounded-2xl blur-lg opacity-70 -z-10"></div>
              <div className="rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Benefits of {title}</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="bg-pink-100 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-pink-500" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      {longDescription && (
        <section className="py-16 bg-blue-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">About {title}</h2>
                <div dangerouslySetInnerHTML={{ __html: longDescription }} />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {process && process.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our {title} Process</h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex mb-8 relative"
                >
                  <div className="mr-6 relative">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    {index < process.length - 1 && (
                      <div className="absolute top-12 bottom-0 left-1/2 w-0.5 bg-pink-200 -translate-x-1/2"></div>
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Experience the Benefits?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Book your {title} session today and take the first step towards better health and wellness.
              </p>
              <Link href="/booking">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-md text-lg font-medium">
                  Book Your Session Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
