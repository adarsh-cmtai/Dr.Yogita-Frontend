"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProfileSection() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-pink-100 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full z-0"></div>
            <div className="relative z-10">
              <Image
                src="/Yogita Image.jpeg"
                alt="Dr. Yogita"
                width={500}
                height={600}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Dr. Yogita</h1>
            <div className="w-20 h-1 bg-pink-500 mb-6"></div>
            <p className="text-xl text-pink-600 font-medium mb-6">Chief Physiotherapist | Ortho Specialist</p>
            <p className="text-gray-600 mb-6">
              With over 23 years of distinguished experience, Dr. Yogita Kumari is a leading physiotherapist specializing
               in back pain management, posture correction, and mobility restoration.
                Her work at renowned institutions like AIIMS Delhi, ISIC Delhi, and 
                Chiranjivi Hospital Gurgaon has helped thousands of patients overcome
                 chronic pain and mobility challenges through advanced, personalized 
                 treatments.
            </p>
            <p className="text-gray-600 mb-6">
            Dr. Yogita's patient-centered approach, rooted in 
            compassion and clinical expertise, enables her to design
             customized treatment plans that deliver lasting results.
              In addition to her in-person practice, she also offers online 
              consultations, extending her reach to patients who need expert 
              guidance remotely. Her commitment to long-term patient well-being,
               both physically and mentally, has earned her the deep trust and 
               gratitude of her patients, helping them regain their strength,
                mobility, and quality of life.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-pink-50 px-4 py-2 rounded-full">
                <span className="text-pink-600 font-medium">Back & Neck Pain Relief</span>
              </div>
              <div className="bg-pink-50 px-4 py-2 rounded-full">
                <span className="text-pink-600 font-medium">Posture Correction & Ergonomic Guidance</span>
              </div>
              <div className="bg-pink-50 px-4 py-2 rounded-full">
                <span className="text-pink-600 font-medium">Mobility & Flexibility Restoration</span>
              </div>
               <div className="bg-pink-50 px-4 py-2 rounded-full">
                <span className="text-pink-600 font-medium">Online Physiotherapy Sessions</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-pink-500 hover:bg-pink-600">
                <Link href="/booking">Book a Consultation</Link>
              </Button>
              {/* <Button asChild variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
                <Link href="/booking">Contact Me</Link>
              </Button> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
