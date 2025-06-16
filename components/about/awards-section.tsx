"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AwardsSection() {
  const awards = [
    {
      title: "Certification of Attending Conference",
      organization: "International Spine & Spinal Injuries Conference",
      year: "2004",
      image: "/About/isic.png",
    },
    {
      title: "Certification of Participation",
      organization: "Indian Association of Physiotherapists",
      year: "2019",
      image: "/About/Bachelor's of Psychology.jpg",
    },
    {
      title: "Certification of Participation",
      organization: "Indian Society for Pain Research and Therapy",
      year: "2003",
      image: "/About/Pain Research and Therapy.avif",
    },
    {
      title: "Certification of Participation",
      organization: "Federation of Indian Manual Therapists",
      year: "2004",
      image: "/About/Federation of Indian Manual Therapists.webp",
    },
    {
      title: "Certification of Membership",
      organization: "The Indian Association Of Physiotherapists",
      year: "2006",
      image: "/About/Indian Association Of Physiotherapists.jpeg",
    },
    {
      title: "Certification of Attending Workshp",
      organization: "A.I.I.M.S Physiotherapists' Forum",
      year: "2003",
      image: "/About/A.I.I.M.S Physiotherapists' Forum.webp",
    },
  ]

  const mediaFeatures = [
    { name: "Times of India", logo: "/media-logo-toi.png" },
    { name: "Hindustan Times", logo: "/media-logo-ht.png" },
    { name: "NDTV", logo: "/media-logo-ndtv.png" },
    { name: "Dainik Bhaskar", logo: "/media-logo-db.png" },
    { name: "Healthline", logo: "/media-logo-healthline.png" },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Awards & Recognition</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dr. Yogita's commitment to excellence has been recognized through various awards and media features.
          </p>
          <div className="w-20 h-1 bg-pink-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="min-w-[300px] min-h-[300px] relative w-full max-w-sm">
                  <Image
                    src={award.image || "/placeholder.svg"}
                    alt={award.title}
                    fill
                    className="object-contain rounded"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{award.title}</h3>
              <p className="text-pink-600 font-medium mb-1">{award.organization}</p>
              <p className="text-gray-500">{award.year}</p>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Featured In</h3>
          <p className="text-gray-600">Dr. Yogita has been featured in leading publications and media outlets.</p>
        </motion.div> */}

        {/* <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {mediaFeatures.map((media, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={media.logo || "/placeholder.svg"}
                alt={media.name}
                width={120}
                height={60}
                className="h-12 w-auto"
              />
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  )
}