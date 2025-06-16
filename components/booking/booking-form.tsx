"use client"

import type React from "react"
import { useState } from "react"
import { useBooking } from "@/contexts/booking-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { sendBookingEmails } from "@/app/actions/send-booking-email"
import { formatDate } from "@/lib/utils"

export function BookingForm() {
  const { selectedDate, selectedTime, selectedService, addAppointment } = useBooking()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailStatus, setEmailStatus] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !selectedService) return

    setIsSubmitting(true)

    // Create the appointment
    const appointment = {
      date: selectedDate.toISOString(),
      time: selectedTime,
      service: selectedService.slug,
      name,
      email,
      phone,
      notes,
    }

    try {
      // Add the appointment to our local state
      addAppointment(appointment)

      // Send email notifications
      const emailResult = await sendBookingEmails({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        serviceName: selectedService.title,
        appointmentDate: formatDate(selectedDate),
        appointmentTime: selectedTime,
        notes: notes,
      })

      if (emailResult.success) {
        setEmailStatus({
          success: true,
          message: "Confirmation emails have been sent to your inbox.",
        })
      } else {
        setEmailStatus({
          success: false,
          message:
            "Your booking is confirmed, but we couldn't send confirmation emails. Please save your booking details.",
        })
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error during booking:", error)
      setEmailStatus({
        success: false,
        message: "There was an error processing your booking. Please try again or contact us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="border border-green-200 bg-green-50 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Booking Confirmed!</h3>
        <p className="text-gray-600 mb-4">Thank you for booking your appointment with Dr. Yogita Physiotherapy.</p>

        {emailStatus && (
          <div
            className={`p-4 mb-6 rounded-md ${emailStatus.success ? "bg-blue-50 border border-blue-200" : "bg-amber-50 border border-amber-200"}`}
          >
            <div className="flex items-center">
              {emailStatus.success ? (
                <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />
              )}
              <p className={`text-sm ${emailStatus.success ? "text-blue-700" : "text-amber-700"}`}>
                {emailStatus.message}
              </p>
            </div>
            {emailStatus.success && (
              <p className="text-xs text-blue-600 mt-2 pl-7">
                Please check your inbox and spam folder if you don't see the email shortly.
              </p>
            )}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-md p-4 mb-6 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Service:</div>
            <div className="text-right font-medium">{selectedService?.title}</div>
            <div className="text-gray-500">Date:</div>
            <div className="text-right font-medium">{selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}</div>
            <div className="text-gray-500">Time:</div>
            <div className="text-right font-medium">{selectedTime}</div>
            <div className="text-gray-500">Name:</div>
            <div className="text-right font-medium">{name}</div>
            <div className="text-gray-500">Email:</div>
            <div className="text-right font-medium">{email}</div>
            <div className="text-gray-500">Phone:</div>
            <div className="text-right font-medium">{phone}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => window.location.reload()}>
            Book Another Appointment
          </Button>
          <Button variant="outline" className="border-pink-200 text-pink-700 hover:bg-pink-50">
            Print Confirmation
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-pink-200 focus:border-pink-400"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-pink-200 focus:border-pink-400"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-pink-200 focus:border-pink-400"
            required
          />
        </div>

        <div>
          <Label htmlFor="notes">Additional Notes (Optional)</Label>
          <Input
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border-pink-200 focus:border-pink-400"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-6"
        disabled={!selectedDate || !selectedTime || !name || !email || !phone || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Confirm Booking"
        )}
      </Button>
    </form>
  )
}