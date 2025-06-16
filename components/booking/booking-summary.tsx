"use client"

import { useBooking } from "@/contexts/booking-context"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"

export function BookingSummary() {
  const { selectedDate, selectedTime, selectedService } = useBooking()

  if (!selectedService) return null

  return (
    <div className="border border-pink-100 rounded-lg p-6 bg-pink-50/50">
      <h3 className="text-lg font-medium mb-4">Booking Summary</h3>

      <div className="space-y-4">
        <div className="bg-white rounded-md p-4 border border-pink-100">
          <h4 className="font-medium text-pink-700 mb-2">{selectedService.title}</h4>
          <p className="text-sm text-gray-600">{selectedService.shortDescription}</p>
        </div>

        <div className="bg-white rounded-md p-4 border border-pink-100 space-y-3">
          {selectedDate ? (
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-pink-500 mr-2" />
              <span>{format(selectedDate, "MMMM d, yyyy")}</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-400">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>No date selected</span>
            </div>
          )}

          {selectedTime ? (
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-pink-500 mr-2" />
              <span>{selectedTime}</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-400">
              <Clock className="h-5 w-5 mr-2" />
              <span>No time selected</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
