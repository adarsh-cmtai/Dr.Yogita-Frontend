"use client"
import { Calendar } from "@/components/ui/calendar"
import { useBooking } from "@/contexts/booking-context"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarIcon, Clock, Loader2 } from "lucide-react"

export function BookingCalendar() {
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    availableTimeSlots,
    isDateAvailable,
    isLoading,
  } = useBooking()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-pink-500" />
          <h3 className="text-lg font-medium">Select Date</h3>
        </div>
        <div className="border border-pink-100 rounded-md p-3 bg-white">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => !isDateAvailable(date)}
            className="rounded-md"
            classNames={{
              day_selected:
                "bg-pink-500 text-primary-foreground hover:bg-pink-500 hover:text-primary-foreground focus:bg-pink-500 focus:text-primary-foreground",
              day_today: "bg-pink-100 text-pink-900",
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-pink-500" />
          <h3 className="text-lg font-medium">Select Time</h3>
        </div>

        <div className="border border-pink-100 rounded-md p-4 bg-white min-h-[300px]">
          {!selectedDate ? (
            <div className="h-full flex items-center justify-center text-gray-500">Please select a date first</div>
          ) : isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-pink-500 animate-spin" />
            </div>
          ) : availableTimeSlots.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              No available time slots for this date
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <AnimatePresence>
                {availableTimeSlots.map((slot) => (
                  <motion.div
                    key={slot.time}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      className={cn(
                        "w-full py-3 px-4 rounded-md border text-center transition-all",
                        slot.available
                          ? selectedTime === slot.time
                            ? "border-pink-500 bg-pink-50 text-pink-700 shadow-sm"
                            : "border-gray-200 hover:border-pink-200 hover:bg-pink-50"
                          : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed",
                      )}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
