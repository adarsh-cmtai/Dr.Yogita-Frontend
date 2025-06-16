"use client"

import Image from "next/image"
import Link from "next/link"
import { Gift, Sparkles, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function GiftPage() {
  const giftBenefits = [
    "Personalized for your loved ones",
    "Easy and instant delivery",
    "Perfect for any occasion",
    "Eco-friendly digital gifting",
    "Multiple themes to choose from",
    "Can include a heartfelt message"
  ]

  const giftSteps = [
    {
      title: "Choose a Gift Theme",
      description: "Pick from our curated collection of digital gift templates tailored for birthdays, anniversaries, festivals and more."
    },
    {
      title: "Personalize Your Message",
      description: "Add a custom message, photo, or video to make the gift truly special and unique."
    },
    {
      title: "Send Instantly",
      description: "Deliver via email, WhatsApp, or download as a shareable link — quick and effortless!"
    }
  ]

  return (
    <div className="pt-20 bg-yellow-50/30">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-yellow-100 opacity-70"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Send the Perfect Gift, Instantly</h1>
              <p className="text-lg text-gray-600 mb-6">Make someone smile with a thoughtful digital gift that's quick, personal, and beautiful.</p>
              <Link href="/gifts/start">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-medium flex items-center">
                  <Gift className="mr-2 h-5 w-5" />
                  Create a Gift
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-2xl blur-lg opacity-70 -z-10"></div>
              <div className="rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/gift image.webp"
                  alt="Digital Gift"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Digital Gifts?</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftBenefits.map((benefit, index) => (
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
                    <Heart className="h-5 w-5 text-pink-500" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-yellow-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {giftSteps.map((step, index) => (
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
                  {index < giftSteps.length - 1 && (
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-100 to-pink-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Send Joy in Just a Few Clicks</h2>
              <p className="text-lg text-gray-600 mb-8">
                Start creating a memorable gift today — no wrapping paper needed!
              </p>
              {/* <Link href="/gifts/start">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-md text-lg font-medium">
                  Start Gifting <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link> */}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
