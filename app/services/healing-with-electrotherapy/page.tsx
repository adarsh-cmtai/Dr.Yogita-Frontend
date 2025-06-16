import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Healing with Electrotherapy | Dr. Yogita Physiotherapy",
  description: "Experience targeted pain relief and faster recovery with IFT, TENS, Ultrasound, and Muscle Stimulators. Non-invasive treatments for pain, inflammation, and tissue healing.",
}

export default function ElectrotherapyHealingPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Healing with Electrotherapy"
        description="Experience targeted pain relief and faster recovery through advanced electrotherapy modalities such as IFT, TENS, Ultrasound, and Muscle Stimulators. These non-invasive treatments reduce inflammation, relieve pain, and enhance tissue healing in a safe and comfortable clinical environment."
        image="/Offline/image 7.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है (e.g., electrotherapy-healing.jpg)
        benefits={[
          "Non-invasive and drug-free pain relief",
          "Reduces muscle tension and joint stiffness",
          "Accelerates tissue repair and recovery",
          "Improves blood circulation and reduces swelling",
          "Complements manual therapy for holistic care",
        ]}
        longDescription={`
          <p>Our “Healing with Electrotherapy” service combines traditional physiotherapy expertise with modern equipment to support recovery from various musculoskeletal conditions. Whether you're dealing with chronic pain, acute injuries, nerve irritation, or post-operative swelling, electrotherapy can be a valuable part of your personalized treatment plan.</p>
          
          <p>Each session is tailored to your specific needs after assessment to ensure optimal outcomes in a safe and comfortable clinical environment.</p>
        `}
        process={[
          {
            title: "Initial Assessment",
            description:
              "An initial assessment is conducted to determine the suitability and type of electrotherapy for your condition.",
          },
          {
            title: "Modality Selection",
            description:
              "The appropriate electrotherapy modality (TENS, IFT, Ultrasound, Muscle Stimulator, etc.) is selected based on your needs.",
          },
          {
            title: "Controlled Application",
            description:
              "The selected electrotherapy is applied by trained hands in a controlled and safe clinical setting.",
          },
          {
            title: "Comfort & Effectiveness Monitoring",
            description:
              "Continuous monitoring is done throughout the session to ensure your comfort and the treatment's effectiveness.",
          },
          {
            title: "Integrated Follow-Up",
            description:
              "Electrotherapy is integrated with other therapies as needed, and follow-up plans are discussed for comprehensive care.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}