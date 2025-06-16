"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Sparkles } from "lucide-react"
import Image from "next/image"

export default function EbookSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-r from-pink-50 to-sky-50">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <motion.div
                  className="p-8 md:p-12 flex flex-col justify-center"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-2">
                    <span className="inline-block bg-pink-100 text-pink-600 rounded-full px-3 py-1 text-sm font-medium">
                      ₹51 Only
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Myths Unraveled: Physical Therapy for Busy Professionals
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Discover the truth about physiotherapy and learn practical techniques to manage pain and improve
                    your well-being, even with a busy schedule.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white group">
                      Download Now
                      <Download className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                      <Sparkles className="ml-1 h-4 w-4 text-yellow-300 animate-pulse" />
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="relative h-64 md:h-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-64 md:w-56 md:h-72 animate-float">
                      <Image
                        src="/physiotherapy-ebook-cover.jpg"
                        alt="E-Book Cover"
                        fill
                        className="object-contain drop-shadow-2xl"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
