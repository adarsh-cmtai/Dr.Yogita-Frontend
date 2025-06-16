import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Holistic Healing with Bach Flower Remedies | Dr. Yogita Physiotherapy",
  description: "Gentle therapy using personalized Bach Flower Remedies to support emotional balance, manage stress, anxiety, and emotional overwhelm.",
}

export default function BachFlowerRemediesPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Holistic Healing with Bach Flower Remedies"
        description="This gentle, non-invasive therapy supports emotional balance and mental well-being using personalized Bach Flower Remedies. Ideal for stress, anxiety, emotional overwhelm, or physical symptoms triggered by unresolved emotions."
        image="/Online/image 3.webp" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है
        benefits={[
          "Promotes emotional resilience and peace",
          "Supports recovery from trauma, anxiety, and sadness",
          "Complements physical healing and stress-related pain",
          "Safe and gentle for all ages, with no side effects",
          "Builds mind-body balance through natural remedies",
        ]}
        longDescription={`
          <p>Bach Flower Remedies are natural extracts from flowers that work on emotional imbalances, helping to restore inner harmony. As a certified practitioner, I provide personalized online consultations where we explore emotional stressors that may be affecting your health.</p>
          
          <p>Whether it’s chronic worry, fear, burnout, low self-esteem, or emotional trauma, a custom blend of remedies is prepared to support you. These remedies can complement physiotherapy or stand alone as a healing tool. Safe for all age groups, including children and pregnant women, they gently promote emotional healing over time.</p>
        `}
        process={[
          {
            title: "Holistic Wellness Consultation",
            description:
              "Book a holistic wellness consultation online to begin your journey.",
          },
          {
            title: "Discuss Emotional State",
            description:
              "Discuss your emotional state and stress triggers in a supportive environment.",
          },
          {
            title: "Personalized Bach Remedy Prescription",
            description:
              "Receive a personalized Bach Remedy prescription tailored to your needs.",
          },
          {
            title: "Guidance and Tracking",
            description:
              "Guidance on usage and tracking emotional response to the remedies.",
          },
          {
            title: "Optional Follow-Up",
            description:
              "Optional follow-up to adjust the remedy blend if needed for optimal results.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}