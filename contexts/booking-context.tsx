"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { addDays, isAfter, isBefore, isSameDay, parseISO, startOfDay } from "date-fns"
import type { Service } from "@/lib/services"

type TimeSlot = {
  time: string
  available: boolean
}

type Appointment = {
  id: string
  date: string
  time: string
  service: string
  name: string
  email: string
  phone: string
  notes?: string
}

type BookingContextType = {
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  selectedTime: string | undefined
  setSelectedTime: (time: string | undefined) => void
  selectedService: Service | undefined
  setSelectedService: (service: Service | undefined) => void
  availableTimeSlots: TimeSlot[]
  appointments: Appointment[]
  addAppointment: (appointment: Omit<Appointment, "id">) => void
  isDateAvailable: (date: Date) => boolean
  isLoading: boolean
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

const DEFAULT_TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
]

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    time: "9:00 AM",
    service: "back-pain-relief",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
  },
  {
    id: "2",
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    time: "11:00 AM",
    service: "posture-correction",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
  },
  {
    id: "3",
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    time: "2:00 PM",
    service: "online-therapy",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "555-123-4567",
  },
]

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined)
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimeSlots([])
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const bookedSlots = appointments
        .filter((apt) => isSameDay(parseISO(apt.date), selectedDate))
        .map((apt) => apt.time)

      const slots = DEFAULT_TIME_SLOTS.map((time) => ({
        time,
        available: !bookedSlots.includes(time),
      }))

      setAvailableTimeSlots(slots)
      setIsLoading(false)
    }, 500)
  }, [selectedDate, appointments])

  useEffect(() => {
    setSelectedTime(undefined)
  }, [selectedDate])

  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment = {
      ...appointment,
      id: `appointment-${Date.now()}`,
    }
    setAppointments((prev) => [...prev, newAppointment])
    return newAppointment
  }

  const isDateAvailable = (date: Date) => {
    if (isBefore(date, startOfDay(new Date()))) return false
    if (isAfter(date, addDays(new Date(), 60))) return false
    if (date.getDay() === 0) return false

    const bookedSlots = appointments
      .filter((apt) => isSameDay(parseISO(apt.date), date))
      .map((apt) => apt.time)

    return bookedSlots.length < DEFAULT_TIME_SLOTS.length
  }

  return (
    <BookingContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedService,
        setSelectedService,
        availableTimeSlots,
        appointments,
        addAppointment,
        isDateAvailable,
        isLoading,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}