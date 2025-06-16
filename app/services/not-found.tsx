import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getAllServices } from "@/lib/services"
import FooterSection from "@/components/footer-section"

export default function NotFound() {
  const services = getAllServices()

  return (
    <main className="min-h-screen bg-rose-50/30 pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Service Not Found</h1>
          <p className="text-xl text-gray-700 mb-8">We couldn't find the physiotherapy service you're looking for.</p>

          <Link
            href="/services"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-12"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to all services
          </Link>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Services</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all"
                >
                  <h3 className="font-medium text-lg text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{service.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  )
}
