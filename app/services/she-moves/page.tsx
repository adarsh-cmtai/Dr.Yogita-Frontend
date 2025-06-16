import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "SheMoves: Women’s Health & Postnatal Physiotherapy | Dr. Yogita Physiotherapy",
  description: "Specialized physiotherapy for pregnancy, postpartum recovery, and hormonal transitions. Focus on pelvic floor health, postnatal healing, and core strengthening.",
}

export default function WomensHealthPhysiotherapyPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="SheMoves: Women’s Health & Postnatal Physiotherapy"
        description="Specialized physiotherapy designed to support women through key life stages—pregnancy, postpartum recovery, and hormonal transitions. This in-clinic care focuses on pelvic floor health, postnatal healing, core strengthening, and managing pain related to women’s physiological changes."
        image="/Offline/image 1.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है (e.g., shemoves-womens-health.jpg)
        benefits={[
          "Speeds up postnatal recovery",
          "Improves pelvic floor strength and bladder control",
          "Helps manage hormonal aches and joint pains",
          "Corrects postural issues from pregnancy or work",
          "Supports emotional well-being and body confidence",
        ]}
        longDescription={`
          <p>“SheMoves” is a focused women’s health physiotherapy service for mothers, working women, and older adults dealing with pelvic, back, or joint concerns. We address postnatal recovery, urinary incontinence, abdominal separation (diastasis recti), and other musculoskeletal challenges common to women.</p>
          
          <p>Each session respects a woman’s physical, emotional, and hormonal well-being, helping her return to strength, comfort, and confidence.</p>
        `}
        process={[
          {
            title: "Gentle Evaluation & Confidential Consultation",
            description:
              "A gentle evaluation and confidential consultation to understand your specific needs and concerns.",
          },
          {
            title: "Pelvic, Abdominal & Spinal Assessment",
            description:
              "Comprehensive assessment of pelvic, abdominal, and spinal function to identify areas for treatment.",
          },
          {
            title: "Customized Therapy & Lifestyle Advice",
            description:
              "Receive a customized therapy plan including targeted exercises and practical lifestyle advice.",
          },
          {
            title: "Manual Techniques & Guided Corrections",
            description:
              "Benefit from manual techniques and guided postural corrections tailored to your body and recovery stage.",
          },
          {
            title: "Education for Self-Care & Wellness",
            description:
              "Receive education on self-care strategies and long-term wellness to empower your health journey.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}