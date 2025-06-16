"use client"

import { motion } from "framer-motion"

export default function VisionMissionSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Vision & Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The guiding principles that drive our commitment to your well-being and define Dr. Yogita's path forward.
          </p>
          <div className="w-20 h-1 bg-pink-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Vision Section Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 bg-white p-6 md:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-pink-600 mb-4 text-center md:text-left">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed text-center md:text-left">
              To create a world where every individual—regardless of location or lifestyle—has access to expert physiotherapy care that is personalized, effective, and empowering. I envision a future where people no longer live with chronic pain or depend on temporary fixes, but instead take control of their health through knowledge, movement, and holistic healing.
            </p>
          </motion.div>

          {/* Mission Section Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:w-1/2 bg-white p-6 md:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-pink-600 mb-4 text-center md:text-left">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed text-center md:text-left">
              My mission is to provide professional, compassionate, and result-driven physiotherapy—online and offline—to help people relieve pain, improve posture, and restore mobility. I am committed to educating individuals about the root causes of their discomfort and guiding them through simple, customized exercises that bring lasting relief. By combining my 22+ years of experience with modern technology and psychological insight, I aim to reach more people—especially working professionals—and support them in living stronger, pain-free, and more confident lives.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}