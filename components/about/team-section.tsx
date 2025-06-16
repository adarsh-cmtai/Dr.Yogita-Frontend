"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Facebook, Twitter, Linkedin } from "lucide-react"

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Dr. Rajiv Kumar",
      role: "Senior Physiotherapist",
      image: "/indian-man-headshot.png",
      specialization: "Sports Injuries & Rehabilitation",
      experience: "15+ years",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Dr. Yogita",
      role: "Founder & Chief Physiotherapist",
      image: "/dr-yogita-headshot.png",
      specialization: "Musculoskeletal Disorders",
      experience: "22+ years",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Dr. Priya Sharma",
      role: "Physiotherapist",
      image: "/indian-woman-professional-headshot.png",
      specialization: "Neurological Rehabilitation",
      experience: "8+ years",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Dr. Ananya Patel",
      role: "Yoga Therapist",
      image: "/indian-yoga-instructor-headshot.png",
      specialization: "Therapeutic Yoga & Breathing",
      experience: "10+ years",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
  ]

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of experienced professionals is dedicated to providing the highest quality care to help you achieve
            your health goals.
          </p>
          <div className="w-20 h-1 bg-pink-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-pink-300">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-700">
                    <span className="font-semibold">Specialization:</span> {member.specialization}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Experience:</span> {member.experience}
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.facebook}
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                    aria-label={`${member.name}'s Facebook`}
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
