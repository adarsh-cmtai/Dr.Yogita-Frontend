"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useBooking } from "@/contexts/booking-context"
import { getAllServices } from "@/lib/services"
import Image from "next/image"
import { Check } from "lucide-react"

export function BookingServiceSelector() {
  const { selectedService, setSelectedService } = useBooking()
  const services = getAllServices()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredServices = services.filter((service) => service.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search services..."
          className="w-full p-3 pl-10 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
              selectedService?.slug === service.slug
                ? "border-pink-500 ring-2 ring-pink-200"
                : "border-gray-200 hover:border-pink-200"
            }`}
            onClick={() => setSelectedService(service)}
          >
            <div className="relative h-40">
              <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
              {selectedService?.slug === service.slug && (
                <div className="absolute top-2 right-2 bg-pink-500 text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">{service.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{service.shortDescription}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No services found matching your search.</p>
        </div>
      )}
    </div>
  )
}
