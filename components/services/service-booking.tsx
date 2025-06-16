"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Service } from "@/lib/services"
import Link from "next/link"

interface ServiceBookingProps {
  service: Service
}

export default function ServiceBooking({ service }: ServiceBookingProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Book Your Appointment</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready to start your journey to recovery? Book your {service.title.toLowerCase()} appointment with Dr.
            Yogita.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for booking your appointment. We've sent a confirmation email with all the details.
                </p>
                <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => setIsSubmitted(false)}>
                  Book Another Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-8">
                Use our new interactive booking system to select your preferred date and time.
              </p>
              <Link href={`/booking?service=${service.slug}`} passHref>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white py-6 px-8 text-lg">
                  Book Now with Calendar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
