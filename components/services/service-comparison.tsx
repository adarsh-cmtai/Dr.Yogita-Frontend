"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import Link from "next/link"
import { getAllServices } from "@/lib/services"

export default function ServiceComparison() {
  const services = getAllServices()
  const [selectedServices, setSelectedServices] = useState<string[]>(services.slice(0, 2).map((s) => s.slug))

  const toggleService = (slug: string) => {
    if (selectedServices.includes(slug)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== slug))
      }
    } else {
      if (selectedServices.length < 3) {
        setSelectedServices([...selectedServices, slug])
      } else {
        setSelectedServices([...selectedServices.slice(1), slug])
      }
    }
  }

  // Comparison criteria
  const criteria = [
    { name: "In-person Sessions", key: "inPerson" },
    { name: "Remote Sessions", key: "remote" },
    { name: "Suitable for Acute Pain", key: "acutePain" },
    { name: "Suitable for Chronic Pain", key: "chronicPain" },
    { name: "Exercise Program", key: "exerciseProgram" },
    { name: "Manual Therapy", key: "manualTherapy" },
    { name: "Home Care Instructions", key: "homeCare" },
  ]

  // Mock data for comparison
  const serviceData: Record<string, Record<string, boolean>> = {
    "back-pain-relief": {
      inPerson: true,
      remote: false,
      acutePain: true,
      chronicPain: true,
      exerciseProgram: true,
      manualTherapy: true,
      homeCare: true,
    },
    "posture-correction": {
      inPerson: true,
      remote: true,
      acutePain: false,
      chronicPain: true,
      exerciseProgram: true,
      manualTherapy: true,
      homeCare: true,
    },
    "online-therapy": {
      inPerson: false,
      remote: true,
      acutePain: false,
      chronicPain: true,
      exerciseProgram: true,
      manualTherapy: false,
      homeCare: true,
    },
    "chronic-fatigue-relief": {
      inPerson: true,
      remote: true,
      acutePain: false,
      chronicPain: true,
      exerciseProgram: true,
      manualTherapy: false,
      homeCare: true,
    },
  }

  return (
    <section className="py-20 bg-rose-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Compare Our Services</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Not sure which service is right for you? Compare our different treatment options to find the perfect match
            for your needs.
          </p>
        </motion.div>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Select services to compare (up to 3):</h3>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <Button
                key={service.slug}
                variant={selectedServices.includes(service.slug) ? "default" : "outline"}
                className={
                  selectedServices.includes(service.slug)
                    ? "bg-pink-500 hover:bg-pink-600 text-white"
                    : "border-pink-200 text-pink-600 hover:bg-pink-50"
                }
                onClick={() => toggleService(service.slug)}
              >
                {service.title}
              </Button>
            ))}
          </div>
        </div>

        <Card className="border-pink-100 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-pink-50">
                    <th className="p-4 text-left font-semibold text-gray-700 border-b border-r border-pink-100">
                      Features
                    </th>
                    {selectedServices.map((slug) => {
                      const service = services.find((s) => s.slug === slug)
                      return (
                        <th
                          key={slug}
                          className="p-4 text-center font-semibold text-gray-700 border-b border-r border-pink-100 min-w-[200px]"
                        >
                          {service?.title}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion, index) => (
                    <tr key={criterion.key} className={index % 2 === 0 ? "bg-white" : "bg-pink-50/30"}>
                      <td className="p-4 border-b border-r border-pink-100 font-medium">{criterion.name}</td>
                      {selectedServices.map((slug) => (
                        <td
                          key={`${slug}-${criterion.key}`}
                          className="p-4 border-b border-r border-pink-100 text-center"
                        >
                          {serviceData[slug][criterion.key] ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-400 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 border-r border-pink-100"></td>
                    {selectedServices.map((slug) => {
                      const service = services.find((s) => s.slug === slug)
                      return (
                        <td key={`${slug}-action`} className="p-4 border-r border-pink-100 text-center">
                          <Link href={`/services/${slug}`}>
                            <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full">Learn More</Button>
                          </Link>
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
