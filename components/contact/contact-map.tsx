"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

export default function ContactMap() {
  return (
    <section id="map" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Find Us</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our clinic is conveniently located in Sector 14, Gurgaon, with easy access from major roads and public
            transportation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="border-pink-100 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video w-full">
                <iframe
                  src="https://maps.app.goo.gl/BgF92meVaAmqerJV6"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dr. Yogita Physiotherapy Clinic Location"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>View Larger Map</span>
            </Button>
            <Button
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50 flex items-center gap-2"
            >
              <Navigation className="h-5 w-5" />
              <span>Get Directions</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
