"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ClipboardCheck, UserCheck, TrendingUp, Heart } from "lucide-react"

export default function ServiceApproach() {
  const approaches = [
    {
      title: "Personalized Assessment",
      description:
        "We begin with a comprehensive evaluation to understand your unique condition, history, and goals before creating a tailored treatment plan.",
      icon: <ClipboardCheck className="h-10 w-10 text-pink-500" />,
    },
    {
      title: "Patient-Centered Care",
      description:
        "Your needs and preferences guide our approach. We listen carefully and involve you in every decision about your treatment journey.",
      icon: <UserCheck className="h-10 w-10 text-pink-500" />,
    },
    {
      title: "Evidence-Based Methods",
      description:
        "Our treatment techniques are grounded in the latest research and clinical evidence, ensuring you receive the most effective care.",
      icon: <TrendingUp className="h-10 w-10 text-pink-500" />,
    },
    {
      title: "Holistic Perspective",
      description:
        "We consider all aspects of your health and lifestyle, addressing not just symptoms but the underlying causes of your condition.",
      icon: <Heart className="h-10 w-10 text-pink-500" />,
    },
  ]

  return (
    <section id="approach" className="py-20 bg-rose-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/services/Our Approach.avif"
                alt="Our Approach to Physiotherapy"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Approach</h2>
              <div className="w-24 h-1 bg-pink-400 mb-6"></div>
              <p className="text-gray-600 mb-8">
                Dr. Yogita's approach to physiotherapy combines clinical expertise with compassionate care. We believe
                in treating the whole person, not just the symptoms, and empowering you with the knowledge and tools for
                long-term health.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
              {approaches.map((approach, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-pink-100 hover:border-pink-200 transition-colors duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">{approach.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{approach.title}</h3>
                          <p className="text-gray-600">{approach.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
