"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactInfo() {
  // Trigger the WhatsApp chat when the contact info button is clicked
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Create a custom event to open the WhatsApp chat
    const event = new CustomEvent("openWhatsAppChat")
    document.dispatchEvent(event)
  }

  const contactDetails = [
    {
      icon: <Phone className="h-6 w-6 text-pink-500" />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 12345 67890"],
      action: {
        text: "Call Now",
        href: "tel:+919876543210",
      },
    },
    {
      icon: <Mail className="h-6 w-6 text-pink-500" />,
      title: "Email",
      details: ["dryogita@example.com", "info@dryogita.com"],
      action: {
        text: "Send Email",
        href: "mailto:dryogita@example.com",
      },
    },
    {
      icon: <MapPin className="h-6 w-6 text-pink-500" />,
      title: "Location",
      details: ["Sector 14, Gurgaon", "Haryana, India - 122001"],
      action: {
        text: "Get Directions",
        href: "#map",
      },
    },
    {
      icon: <Clock className="h-6 w-6 text-pink-500" />,
      title: "Working Hours",
      details: ["Monday - Saturday: 9AM - 7PM", "Sunday: Closed"],
      action: {
        text: "Book Appointment",
        href: "#",
      },
    },
  ]

  return (
    <section id="contact-info" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Information</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Multiple ways to reach us for appointments, inquiries, or directions to our clinic.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-pink-100 hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="bg-pink-50 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                  <div className="space-y-1 mb-6">
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <a href={item.action.href}>
                      <Button
                        variant="outline"
                        className="w-full border-pink-200 text-pink-600 hover:bg-pink-50 transition-colors"
                      >
                        {item.action.text}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-6 text-lg flex items-center gap-2"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="h-5 w-5" />
            <span>Chat on WhatsApp</span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
