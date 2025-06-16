"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function TimelineSection() {
  const timelineEvents = [
     {
    year: "2003",
    title: "Bachelor of Physiotherapy (BPT)",
    description:
      "Completed BPT from Delhi University. Registered MIAP (L-15524).",
    image: "/About/Education 1.jpg",
  },
  {
    year: "2008",
    title: "Bachelor of Science in Psychology",
    description: "Completed B.Sc. in Psychology.",
    image: "/About/Psychology Degree.jpeg",
  },
  {
    year: "2011",
    title: "Master of Science in Psychology",
    description: "Completed M.Sc. in Psychology.",
    image: "/About/Postgraduate Studies.jpg",
  },
  {
    year: "2012",
    title: "PG Diploma in Personnel Management and Industrial Relations",
    description:
      "Completed Postgraduate Diploma in Personnel Management and Industrial Relations.",
    image: "/About/HR & Management Diploma.jpg",
  },
  {
    year: "2014",
    title: "Master of Physiotherapy (MPT)",
    description: "Completed MPT with specialization.",
    image: "/About/Master of Physiotherapy.jpg",
  },
  {
    year: "2024",
    title: " Bach Remedy (UK) Certified",
    description:
      "Achieved UK certification in Bach Flower Remedies, showcasing skills in natural healing.",
    image: "/About/Bach Remedy Certification.webp",
  },
  ];


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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Professional Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dr. Yogita's path to becoming a leading physiotherapist in Delhi NCR has been marked by continuous learning,
            innovation, and dedication to patient care.
          </p>
          <div className="w-20 h-1 bg-pink-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200 hidden md:block"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8`}
              >
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <div
                    className={`bg-white rounded-lg shadow-lg p-6 ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                      } relative`}
                  >
                    <div className="absolute top-6 h-4 w-4 rounded-full bg-pink-500 hidden md:block right-0 md:right-auto md:left-auto transform translate-x-1/2 md:translate-x-0 md:translate-y-0"></div>
                    <span className="inline-block bg-pink-100 text-pink-600 rounded-full px-3 py-1 text-sm font-medium mb-2">
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-start">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
