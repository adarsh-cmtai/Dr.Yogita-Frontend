import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "CoreCare: In-Clinic Physiotherapy Consultation | Dr. Yogita Physiotherapy",
  description: "A personalized, one-on-one assessment and treatment session at our clinic for pain, posture, or mobility issues. Get hands-on diagnosis and therapy.",
}

export default function InClinicPhysiotherapyPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="CoreCare: In-Clinic Physiotherapy Consultation"
        description="A personalized, one-on-one assessment and treatment session conducted at our clinic. This service is ideal for individuals seeking hands-on diagnosis, therapy, and guidance for chronic or acute pain, posture issues, or mobility problems."
        image="/Offline/image 8.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है (e.g., in-clinic-physiotherapy.jpg)
        benefits={[
          "Accurate hands-on diagnosis and physical examination",
          "Immediate pain relief through manual therapy",
          "Customized treatment plans based on your lifestyle",
          "Better understanding of posture, alignment, and daily habits",
          "Real-time correction and feedback on movement or posture",
        ]}
        longDescription={`
          <p>Our In-Clinic Physiotherapy Consultation allows you to meet Dr. Yogita in person for a comprehensive evaluation of your musculoskeletal condition. Using evidence-based methods, manual assessment, and clinical experience, we identify the root cause of your pain or movement issues and tailor a treatment plan accordingly.</p>
          
          <p>This session may include hands-on therapy, postural assessment, and exercise guidance to help you achieve your health and mobility goals.</p>
        `}
        process={[
          {
            title: "Book Your Appointment",
            description:
              "Book your in-clinic appointment via call or our website.",
          },
          {
            title: "Visit the Clinic",
            description:
              "Visit the clinic at your scheduled time for your consultation.",
          },
          {
            title: "Detailed Assessment",
            description:
              "Undergo a detailed physical and functional assessment with Dr. Yogita.",
          },
          {
            title: "Receive Initial Treatment",
            description:
              "Receive your first hands-on treatment session on the spot.",
          },
          {
            title: "Get Your Action Plan",
            description:
              "Receive a personalized plan of action and follow-up recommendations.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}