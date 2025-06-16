"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Linkedin } from 'lucide-react';


export default function FooterSection() {
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false)

  // Trigger the WhatsApp chat when the footer button is clicked
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const phoneNumber = '7827952450'; // Make sure to include the country code if needed, e.g., '917827952450' for India
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };


  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5 text-pink-500" />,
      text: "+91 7827952450",
      type: "phone",
    },
    {
      icon: <Mail className="h-5 w-5 text-pink-500" />,
      text: "connect@yogitas.com",
      type: "email",
    },
    {
      icon: <MapPin className="h-5 w-5 text-pink-500" />,
      text: "509 sector 31, Gurgaon, Haryana",
      type: "address",
    },
   {
  icon: <Clock className="h-5 w-5 text-pink-500" />,
  text: "Mon-Sat: 10AM–2PM, 5PM–7PM",
  type: "hours",
}

  ];


  // Restored About in quickLinks
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // { name: "Blog", href: "/Blog" },
    // { name: "Centers", href: "/centers" },
    // { name: "Testimonials", href: "/testimonials" },
    { name: "Blog", href: "/blog" },
    { name: "Book Now", href: "/booking" },
  ]

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <Image src="/Yogita Image.jpeg" alt="Dr. Yogita Physiotherapy" width={180} height={60} style={{ borderRadius: "50%" }} />
            </div>
            <p className="text-gray-600 mb-6">
              Dedicated to providing expert physiotherapy care with a personalized approach for over 23 years.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/p/DFVMC3oylcq/?img_index=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>

              <Link
                href="https://www.facebook.com/people/Yogita-Kumari/61556403582849/#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>

              <Link
                href="https://www.linkedin.com/in/dr-yogita-kumari-1055b3269/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
                <Link
                href="https://www.youtube.com/in/dr-yogita-kumari-1055b3269/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-600 hover:text-pink-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Contact Information</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 mt-1">{item.icon}</span>
                  <span className="text-gray-600">
                    {item.type === 'phone' ? (
                      <a href={`tel:${item.text.replace(/\s+/g, '')}`} className="cursor-pointer">
                        {item.text}
                      </a>
                    ) : item.type === 'email' ? (
                      <a href={`mailto:${item.text}`} className="cursor-pointer">
                        {item.text}
                      </a>
                    ) : (
                      item.text
                    )}
                  </span>
                </li>
              ))}
            </ul>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Get in Touch</h3>
            <p className="text-gray-600 mb-6">
              Have questions or want to book an appointment? Reach out to us directly.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white w-full flex items-center justify-center"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Chat
              </Button>

            </motion.div>
          </motion.div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="text-center text-gray-500 text-sm">
           <p>
  &copy; {new Date().getFullYear()}{" "}
  <a href="https://www.cmtai.in/" target="_blank" rel="noopener noreferrer">
    CMT AI
  </a>. All rights reserved.
</p>

          </div>
        </div>
      </div>
    </footer>
  )
}
