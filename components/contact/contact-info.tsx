"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactInfo() {
  const [appointmentUrl, setAppointmentUrl] = useState<string>("#");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/settings/appointment_url` || 
  "http://localhost:5001/api/settings/appointment_url"

  useEffect(() => {
    const fetchAppointmentUrl = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch the URL');
        }
        const data = await res.json();
        if (data.value) {
          setAppointmentUrl(data.value);
        }
      } catch (error) {
        console.error("Error fetching appointment URL:", error);
      }
    };

    fetchAppointmentUrl();
  }, []);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const event = new CustomEvent("openWhatsAppChat")
    document.dispatchEvent(event)
  }

  const contactDetails = [
    {
      icon: <Phone className="h-6 w-6 text-pink-500" />,
      title: "Phone",
      details: ["+91 7827952450", "+91 7827952450"],
      action: {
        text: "Call Now",
        href: "tel:+917827952450",
      },
    },
    {
      icon: <Mail className="h-6 w-6 text-pink-500" />,
      title: "Email",
      details: ["connect@yogitas.com", "enquiry2physio@gmail.com"],
      action: {
        text: "Send Email",
        href: "mailto:enquiry2physio@gmail.com",
      },
    },
    {
      icon: <MapPin className="h-6 w-6 text-pink-500" />,
      title: "Location",
      details: ["509 sector 31, Gurgaon", "Haryana, India - 122001"],
      action: {
        text: "Get Directions",
        href: "#map",
      },
    },
    {
      icon: <Clock className="h-6 w-6 text-pink-500" />,
      title: "Working Hours",
      details: ["Monday - Saturday: 10AM - 7PM", "Sunday: Closed"],
      action: {
        text: "Book Appointment",
        href: appointmentUrl,
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
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-pink-200 text-pink-600 hover:bg-pink-50 transition-colors"
                    >
                      <Link href={item.action.href}>{item.action.text}</Link>
                    </Button>
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
