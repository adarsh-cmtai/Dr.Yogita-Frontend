import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Women’s Health Physiotherapy (Virtual) | Dr. Yogita Physiotherapy",
  description: "Virtual physiotherapy for women focusing on back pain, pelvic health, hormonal changes, and postnatal recovery in a supportive home environment.",
}

export default function WomensHealthPhysiotherapyPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Women’s Health Physiotherapy (Virtual)"
        description="Tailored for women at all stages of life, this virtual physiotherapy service focuses on back pain, pelvic health, hormonal changes, postural issues, and recovery from childbirth—all in a safe, supportive environment from home."
        image="/services/Women’s Health Physiotherapy.png" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है
        benefits={[
          "Safe, judgment-free space for women’s concerns",
          "Helps with post-pregnancy recovery and pelvic health",
          "Reduces back, neck, and hormonal pain",
          "Improves posture, core strength, and energy",
          "Ideal for busy moms and working women at home",
        ]}
        longDescription={`
          <p>Women experience unique physical challenges through different life phases—pregnancy, postnatal recovery, hormonal shifts, and menopause. This virtual program provides specialized physiotherapy care to support women's physical health, focusing on areas like pelvic floor strengthening, postural alignment, back and neck pain relief, and fatigue management.</p>
          
          <p>Whether you're recovering from childbirth, struggling with menstrual-related pain, or managing menopausal symptoms, the sessions are gentle, guided, and personalized. The goal is to help women feel stronger, more balanced, and pain-free in their bodies through expert care that respects their pace and comfort.</p>
        `}
        process={[
          {
            title: "Private Consultation",
            description:
              "Book a private consultation to discuss concerns and health history.",
          },
          {
            title: "Detailed Assessment",
            description:
              "Receive a detailed assessment of posture, core, and pelvic health.",
          },
          {
            title: "Customized Therapy Plan",
            description:
              "Start your customized therapy plan with guided home exercises.",
          },
          {
            title: "Lifestyle & Movement Guidance",
            description:
              "Receive lifestyle and movement guidance suited to your stage of life.",
          },
          {
            title: "Recovery Tracking & Support",
            description:
              "Track your recovery and make progress with ongoing support.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}