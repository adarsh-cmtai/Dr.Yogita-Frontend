import { getServiceBySlug } from "@/lib/services"
import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceBenefits from "@/components/services/service-benefits"
import ServiceProcess from "@/components/services/service-process"
import ServiceFAQ from "@/components/services/service-faq"
import RelatedServices from "@/components/services/related-services"
import ServiceCTA from "@/components/services/service-cta"
import FooterSection from "@/components/footer-section"

export const metadata = {
  title: "Back Pain Relief | Dr. Yogita Physiotherapy",
  description:
    "Our comprehensive back pain relief program combines manual therapy, targeted exercises, and education to address the root causes of your pain.",
}

export default function BackPainReliefPage() {
  const service = getServiceBySlug("back-pain-relief")

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      <ServiceDetailHero service={service} />
      <ServiceBenefits service={service} />
      <ServiceProcess service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices currentSlug="back-pain-relief" />
      <ServiceCTA />
      <FooterSection />
    </main>
  )
}
