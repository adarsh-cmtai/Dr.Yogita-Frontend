import { getServiceBySlug } from "@/lib/services"
import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceBenefits from "@/components/services/service-benefits"
import ServiceProcess from "@/components/services/service-process"
import ServiceFAQ from "@/components/services/service-faq"
import RelatedServices from "@/components/services/related-services"
import ServiceCTA from "@/components/services/service-cta"
import FooterSection from "@/components/footer-section"

export const metadata = {
  title: "Online Therapy | Dr. Yogita Physiotherapy",
  description:
    "Our online physiotherapy sessions bring expert care directly to you, wherever you are, using secure video technology.",
}

export default function OnlineTherapyPage() {
  const service = getServiceBySlug("online-therapy")

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      <ServiceDetailHero service={service} />
      <ServiceBenefits service={service} />
      <ServiceProcess service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices currentSlug="online-therapy" />
      <ServiceCTA />
      <FooterSection />
    </main>
  )
}
