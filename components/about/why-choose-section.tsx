"use client"

import { motion } from "framer-motion"
import { Award, Clock, Users, ThumbsUp, Stethoscope, HeartPulse } from "lucide-react"

export default function WhyChooseSection() {
  const reasons = [
    {
      icon: <Award className="h-10 w-10 text-pink-500" />,
      title: "Expertise & Experience",
      description: "Over 23 years of specialized experience in treating various musculoskeletal conditions.",
    },
    {
      icon: <Clock className="h-10 w-10 text-pink-500" />,
      title: "Personalized Attention",
      description: "Customized treatment plans tailored to your specific needs and recovery goals.",
    },
    {
      icon: <Users className="h-10 w-10 text-pink-500" />,
      title: "Dedicated Team",
      description: "A team of specialized physiotherapists committed to your complete recovery.",
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-pink-500" />,
      title: "Proven Results",
      description: "Thousands of satisfied patients who have regained mobility and pain-free living.",
    },
    {
      icon: <Stethoscope className="h-10 w-10 text-pink-500" />,
      title: "Evidence-Based Approach",
      description: "Treatment protocols based on the latest research and medical evidence.",
    },
    {
      icon: <HeartPulse className="h-10 w-10 text-pink-500" />,
      title: "Holistic Care",
      description: "Addressing not just symptoms but the root cause for long-term wellness.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Dr. Yogita</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to providing exceptional care and helping you achieve optimal health and wellness.
          </p>
          <div className="w-20 h-1 bg-pink-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
