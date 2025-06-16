"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getRelatedServices } from "@/lib/services"

interface RelatedServicesProps {
  currentSlug: string
}

export default function RelatedServices({ currentSlug }: RelatedServicesProps) {
  const relatedServices = getRelatedServices(currentSlug, 3)

  return (
    <section className="py-20 bg-rose-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Related Services</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore other specialized physiotherapy services that might benefit your health and wellness journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                </div>
                <div className="px-6 pb-6">
                  <Link href={`/services/${service.slug}`}>
                    <button className="flex items-center text-pink-500 font-medium group-hover:text-pink-600 transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
