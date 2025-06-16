import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Hands-On Relief: Manual Therapy & Mobilisation | Dr. Yogita Physiotherapy",
  description: "Specialized hands-on treatment to reduce pain, restore mobility, and improve joint function. Ideal for stiffness, muscle tightness, and chronic pain.",
}

export default function ManualTherapyMobilisationPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Hands-On Relief: Manual Therapy & Mobilisation"
        description="A specialized hands-on treatment technique designed to reduce pain, restore mobility, and improve joint function. Manual therapy and joint mobilisation are ideal for conditions like stiffness, muscle tightness, joint restrictions, and chronic pain."
        image="/services/Manual Therapy & Mobilisation.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है (e.g., manual-therapy-mobilisation.jpg)
        benefits={[
          "Improves joint flexibility and alignment",
          "Relieves muscle tightness and stiffness",
          "Enhances blood circulation and lymphatic drainage",
          "Promotes relaxation and functional recovery",
          "Helps avoid dependency on painkillers",
        ]}
        longDescription={`
          <p>“Hands-On Relief” offers focused manual therapy and mobilisation techniques delivered by Dr. Yogita to treat joint, muscle, and soft tissue dysfunctions. Using skilled, therapeutic hand movements, this service helps release tension, improve circulation, enhance joint mobility, and support your body’s natural healing.</p>
          
          <p>It is best suited for individuals with restricted movement, pain, or postural imbalances, providing a direct approach to alleviate discomfort and restore optimal function.</p>
        `}
        process={[
          {
            title: "In-Person Assessment",
            description:
              "An in-person assessment is conducted to identify restricted or painful areas in your joints and muscles.",
          },
          {
            title: "Customized Hands-On Therapy",
            description:
              "Receive a customized hands-on therapy session utilizing various manual techniques tailored to your condition.",
          },
          {
            title: "Gentle Joint Mobilisation",
            description:
              "Experience gentle joint mobilisation techniques applied based on your pain tolerance and specific needs.",
          },
          {
            title: "Integration with Movement",
            description:
              "Manual therapy is integrated with targeted stretches and movement retraining to enhance long-term benefits.",
          },
          {
            title: "Progress Tracking & Adjustment",
            description:
              "Regular progress tracking is performed, and therapy is adjusted as needed to ensure optimal recovery.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}