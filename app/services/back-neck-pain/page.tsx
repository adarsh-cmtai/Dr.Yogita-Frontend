import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Back & Neck Pain Relief Program | Dr. Yogita Physiotherapy",
  description: "Our online Back & Neck Pain Relief Program offers guided exercises and posture correction to alleviate pain from prolonged sitting, poor posture, or stress.",
}

export default function BackNeckPainReliefPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Back & Neck Pain Relief Program"
        description="Persistent back or neck pain from long sitting, poor posture, or stress? This program offers structured virtual sessions with simple, effective exercises and posture correction to relieve pain and restore movement—right from your home."
        image="/services/Back & Neck Pain.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है
        benefits={[
          "Fast, drug-free pain relief",
          "Builds strength and improves posture",
          "Prevents recurrence with daily habits",
          "Flexible home-based sessions",
          "Personalized care for lasting result.",
        ]}
        longDescription={`
          <p>This specialized online program is designed to address common back and neck issues caused by prolonged sitting, incorrect posture, or muscle imbalances. After an initial consultation, I create a customized therapy plan that includes daily corrective exercises, workstation ergonomics, stretching routines, and lifestyle tips.</p>
          
          <p>Each session is live and guided, ensuring correct movements and faster relief. The program is suitable for desk workers, homemakers, and anyone suffering from tension, stiffness, or recurring back/neck pain.</p>
        `}
        process={[
          {
            title: "Book a Consultation",
            description:
              "Book a consultation to identify the cause of pain.",
          },
          {
            title: "Personalized Therapy Plan",
            description:
              "Receive a personalized therapy plan based on your needs.",
          },
          {
            title: "Live Guided Sessions",
            description:
              "Join live sessions for guided exercises and corrections.",
          },
          {
            title: "Daily Practice with Support",
            description:
              "Practice daily movements with video/PDF support.",
          },
          {
            title: "Track Improvement & Follow-Up",
            description:
              "Track your improvement and get follow-up support.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}