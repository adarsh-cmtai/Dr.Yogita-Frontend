import ServiceHero from "@/components/services/service-hero"
import ServicesList from "@/components/services/services-list"
import ServiceApproach from "@/components/services/service-approach"
import ServiceTestimonials from "@/components/services/service-testimonials"
import ServiceCTA from "@/components/services/service-cta"
import FooterSection from "@/components/footer-section"
import ServiceComparison from "@/components/services/service-comparison"

export const metadata = {
  title: "Our Services | Dr. Yogita Physiotherapy",
  description:
    "Explore our range of specialized physiotherapy services designed to help you live a pain-free life. Filter by category to find the perfect treatment for your needs.",
  keywords:
    "physiotherapy services, back pain relief, posture correction, online therapy, chronic fatigue relief, physical therapy, rehabilitation",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      <ServiceHero />
      <ServicesList />
      <ServiceApproach />
      <ServiceComparison />
      <ServiceTestimonials />
      <ServiceCTA />
      <FooterSection />
    </main>
  )
}
