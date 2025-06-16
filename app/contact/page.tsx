import ContactHero from "@/components/contact/contact-hero"
import ContactInfo from "@/components/contact/contact-info"
import ContactForm from "@/components/contact/contact-form"
import ContactMap from "@/components/contact/contact-map"
import ContactFAQ from "@/components/contact/contact-faq"
// import BookingHero from "@/components/contact/booking-hero"
import FooterSection from "@/components/footer-section"

export const metadata = {
  title: "Contact Us | Dr. Yogita Physiotherapy",
  description: "Get in touch with Dr. Yogita for appointments, inquiries, or directions to our clinic.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      {/* <BookingHero /> */}
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
      <ContactFAQ />
      <FooterSection />
    </main>
  )
}
