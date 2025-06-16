"use client"; // MUST be the very first line

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation"; // For App Router
// import { BookingCalendar } from "@/components/booking/booking-calendar";
// import { BookingForm } from "@/components/booking/booking-form";
// import { BookingSummary } from "@/components/booking/booking-summary";
// import { BookingServiceSelector } from "@/components/booking/booking-service-selector";
import { useBooking } from "@/contexts/booking-context";
import { getServiceBySlug, Service } from "@/lib/services"; // Ensure Service type is defined
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactInfo from "@/components/contact/contact-info";
import ContactForm from "@/components/contact/contact-form";
import ContactMap from "@/components/contact/contact-map";
// import ContactFAQ from "@/components/contact/contact-faq";

export default function BookingPageContent() {
  const searchParams = useSearchParams(); // This will now correctly suspend if needed
  const {
    selectedDate,
    selectedTime,
    selectedService,
    setSelectedService,
  } = useBooking();

  const [step, setStep] = useState(1);
  // The `isMounted` state can still be useful for other client-only effects,
  // but Suspense handles the initial `searchParams` availability.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // This effect will run after mount and after searchParams are resolved by Suspense
    if (isMounted && searchParams) {
      const serviceSlugFromUrl = searchParams.get("service");
      if (serviceSlugFromUrl) {
        const service = getServiceBySlug(serviceSlugFromUrl);
        if (service) {
          if (!selectedService || selectedService.slug !== service.slug) {
            setSelectedService(service as Service);
            // Optional: if (step === 1) setStep(2);
          }
        } else {
          console.warn(`Service with slug "${serviceSlugFromUrl}" not found from URL.`);
        }
      }
    }
  }, [isMounted, searchParams, setSelectedService, selectedService, step]);

  const steps = [
    { number: 1, title: "Select Service" },
    { number: 2, title: "Choose Date & Time" },
    { number: 3, title: "Your Information" },
  ];

  const nextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && (!selectedDate || !selectedTime)) return;
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // With Suspense in the parent, this immediate return might not be strictly necessary
  // for the useSearchParams issue, but it doesn't hurt for other client-only logic
  // that might run before full hydration if you had any.
  if (!isMounted) {
     return null; // Or your loading spinner if you prefer it here instead of Suspense fallback
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Book Your Appointment
          </h1>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule your physiotherapy session with Dr. Yogita. Choose from
            available dates and times for your treatment.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Steps indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-center">
              {steps.map((s, i) => (
                <div key={s.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      step >= s.number
                        ? "bg-pink-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    } transition-colors duration-300`}
                  >
                    {step > s.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      s.number
                    )}
                  </div>
                  <div className="hidden sm:block ml-3 mr-3 md:mr-6 lg:mr-10">
                    <p
                      className={`text-sm font-medium ${
                        step >= s.number
                          ? "text-gray-800"
                          : "text-gray-400"
                      }`}
                    >
                      {s.title}
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`hidden sm:block w-12 md:w-16 lg:w-20 h-1 ${
                        step > s.number ? "bg-pink-500" : "bg-gray-200"
                      } ${
                        i < steps.length - 1 ? "mr-3 md:mr-6 lg:mr-10" : ""
                      } transition-colors duration-300`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-pink-100 mb-16">
            {/* --- UNCOMMENTED MAIN BOOKING FLOW --- */}
            {/* <div className="p-6 md:p-8">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookingServiceSelector />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookingCalendar />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <BookingForm />
                    </div>
                    <div>
                      <BookingSummary />
                    </div>
                  </div>
                </motion.div>
              )}
            </div> */}
            {/* --- END UNCOMMENTED MAIN BOOKING FLOW --- */}

            {/* --- UNCOMMENTED NAVIGATION BUTTONS --- */}
            {/* <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-pink-100 flex justify-between items-center">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-pink-200 text-pink-700 hover:bg-pink-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {step < steps.length && (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                  disabled={
                    (step === 1 && !selectedService) ||
                    (step === 2 && (!selectedDate || !selectedTime))
                  }
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div> */}
            {/* --- END UNCOMMENTED NAVIGATION BUTTONS --- */}
          </div>
        </div>

        <div className="mt-16 space-y-12">
          <ContactInfo />
          <ContactForm />
          <ContactMap />
          {/* <ContactFAQ /> */}
        </div>
      </div>
    </section>
  );
}