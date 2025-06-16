import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Recovery Redefined: Post-Surgery Rehabilitation | Dr. Yogita Physiotherapy",
  description: "Personalized rehab after orthopedic surgeries (knee replacement, spine, fracture repair). Regain strength, mobility, and confidence in-clinic.",
}

export default function PostSurgeryRehabilitationPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Recovery Redefined: Post-Surgery Rehabilitation"
        description="A personalized rehabilitation program designed to support recovery after orthopedic surgeries such as knee replacement, spine surgery, or fracture repair. This in-clinic service focuses on regaining strength, mobility, and confidence under expert supervision."
        image="/Offline/image 5.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है (e.g., post-surgery-rehabilitation.jpg)
        benefits={[
          "Faster and safer recovery after surgery",
          "Reduces stiffness, swelling, and post-op pain",
          "Strengthens weakened muscles and improves joint mobility",
          "Boosts confidence in movement and daily function",
          "Prevents complications and enhances surgical outcomes",
        ]}
        longDescription={`
          <p>“Recovery Redefined” offers structured and progressive post-surgery rehabilitation tailored to your specific surgery and recovery stage. Whether you’ve undergone joint replacement, ligament repair, or spinal procedures, we work with you one-on-one to restore function, minimize complications, and prevent re-injury.</p>
          
          <p>Sessions include pain management, mobility training, strengthening exercises, and gait correction, all under expert guidance to ensure you return to your daily activities safely and effectively.</p>
        `}
        process={[
          {
            title: "Clinical Evaluation",
            description:
              "A thorough clinical evaluation of your current post-surgical status and specific needs.",
          },
          {
            title: "Goal Setting",
            description:
              "Collaborative goal-setting in line with your surgeon’s recommendations and personal recovery objectives.",
          },
          {
            title: "Customized Rehab Protocol",
            description:
              "Development of a customized rehabilitation protocol with supervised exercises tailored to your surgery type and progress.",
          },
          {
            title: "Therapeutic Support",
            description:
              "Regular manual therapy or electrotherapy support as needed to manage pain, swelling, and enhance healing.",
          },
          {
            title: "Progress Tracking & Reassessment",
            description:
              "Periodic reassessment and progress tracking to adjust the rehabilitation plan and ensure optimal outcomes.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}