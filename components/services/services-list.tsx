"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getAllServices } from "@/lib/services"
import { ArrowRight, SpadeIcon as Spine, ArrowUpRight, MonitorSmartphone, BatteryCharging } from "lucide-react"
import ServiceFilters from "./service-filters"

export default function ServicesList() {
  const allServices = getAllServices()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredServices, setFilteredServices] = useState(allServices)

  // Extract all unique categories
  const allCategories = Array.from(new Set(allServices.flatMap((service) => service.categories))).sort()

  // Handle category selection/deselection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([])
  }

  // Filter services when selected categories change
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredServices(allServices)
    } else {
      setFilteredServices(
        allServices.filter((service) => selectedCategories.some((category) => service.categories.includes(category))),
      )
    }
  }, [selectedCategories, allServices])

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "spine":
        return <Spine className="h-10 w-10 text-pink-500" />
      case "arrow-up-right":
        return <ArrowUpRight className="h-10 w-10 text-pink-500" />
      case "monitor-smartphone":
        return <MonitorSmartphone className="h-10 w-10 text-pink-500" />
      case "battery-charging":
        return <BatteryCharging className="h-10 w-10 text-pink-500" />
      default:
        return <ArrowRight className="h-10 w-10 text-pink-500" />
    }
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Specialized Physiotherapy Services</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive range of physiotherapy services is designed to address various conditions and help you
            achieve optimal health and mobility.
          </p>
        </motion.div>

        {/* Service Filters */}
        <ServiceFilters
          categories={allCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          onClearFilters={clearFilters}
        />

        {/* No results message */}
        {filteredServices.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-600 mb-4">No services match your selected filters.</p>
            <Button variant="outline" onClick={clearFilters} className="border-pink-200 text-pink-600 hover:bg-pink-50">
              Clear Filters
            </Button>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="h-full"
              >
                <Card className="border border-pink-100 overflow-hidden h-full transition-all duration-300 hover:shadow-lg group">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hoveredIndex === index ? "scale-110" : "scale-100"
                      }`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-semibold text-white mb-2">{service.title}</h3>
                      <div className="w-12 h-0.5 bg-pink-400 mb-2 transition-all duration-300 group-hover:w-20"></div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-6 transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                      {getIconComponent(service.icon)}
                    </div>
                    <p className="text-gray-600 mb-6">{service.shortDescription}</p>

                    {/* Service categories */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.categories.slice(0, 3).map((category) => (
                        <span key={category} className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded-full">
                          {category}
                        </span>
                      ))}
                      {service.categories.length > 3 && (
                        <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                          +{service.categories.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="mt-auto">
                      <Link href={`/services/${service.slug}`}>
                        <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full group-hover:shadow-md transition-shadow">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
