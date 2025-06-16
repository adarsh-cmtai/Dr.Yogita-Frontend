import { notFound, redirect } from "next/navigation"
import {
  getServiceBySlug,
  getAllServiceSlugs,
  getAllServices,
} from "@/lib/services"
import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceBenefits from "@/components/services/service-benefits"
import ServiceProcess from "@/components/services/service-process"
import ServiceFAQ from "@/components/services/service-faq"
import RelatedServices from "@/components/services/related-services"
import ServiceCTA from "@/components/services/service-cta"
import FooterSection from "@/components/footer-section"

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: "Service Not Found | Dr. Yogita Physiotherapy",
    }
  }

  return {
    title: `${service.title} | Dr. Yogita Physiotherapy`,
    description: service.description,
  }
}

// Generate static paths for all services
export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Main page component
export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    const allServices = await getAllServices()
    const closestService = allServices.find(
      (s) =>
        s.slug.startsWith(params.slug) ||
        s.slug.replace(/-/g, "") === params.slug.replace(/-/g, "")
    )

    if (closestService) {
      redirect(`/services/${closestService.slug}`)
    }

    notFound()
  }

  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      <ServiceDetailHero service={service} />
      <ServiceBenefits service={service} />
      <ServiceProcess service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices currentSlug={params.slug} />
      <ServiceCTA />
      <FooterSection />
    </main>
  )
}
