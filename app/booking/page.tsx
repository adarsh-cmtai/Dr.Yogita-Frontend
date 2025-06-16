// app/booking/page.tsx
import { Suspense } from "react"; // Import Suspense
import { BookingProvider } from "@/contexts/booking-context";
import BookingPageContent from "@/components/booking/booking-page-content";
import FooterSection from "@/components/footer-section";

export const metadata = {
  title: "Book an Appointment | Dr. Yogita Physiotherapy",
  description:
    "Schedule your physiotherapy appointment with Dr. Yogita. Choose from available dates and times for your treatment.",
};

// A simple loading component for the fallback
function BookingLoading() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <p className="text-xl text-gray-600">Loading booking options...</p>
      {/* You can add a spinner here */}
    </div>
  );
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <main className="min-h-screen bg-rose-50/30 pt-20">
        <Suspense fallback={<BookingLoading />}> {/* Wrap BookingPageContent */}
          <BookingPageContent />
        </Suspense>
        <FooterSection />
      </main>
    </BookingProvider>
  );
}