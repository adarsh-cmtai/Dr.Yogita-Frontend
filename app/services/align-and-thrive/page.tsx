import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Align & Thrive: Ergonomics, Posture & Lifestyle Correction | Dr. Yogita Physiotherapy",
  description: "In-clinic assessment for correcting posture, improving ergonomics, and building healthier habits. Ideal for professionals, students, and homemakers.",
}

export default function ErgonomicsPostureLifestylePage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Align & Thrive: Ergonomics, Posture & Lifestyle Correction"
        description="A detailed in-clinic assessment and guidance session focused on correcting posture, improving workstation ergonomics, and building healthier lifestyle habits. Ideal for professionals, students, and homemakers dealing with back, neck, or shoulder strain due to daily activities or desk jobs."
        image="/services/Ergonomics, Posture & Lifestyle Correction.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है (e.g., ergonomics-posture-lifestyle.jpg)
        benefits={[
          "Reduces chronic back, neck, and shoulder pain",
          "Enhances sitting and standing posture awareness",
          "Prevents strain and injury due to poor habits",
          "Increases productivity and physical energy",
          "Supports long-term musculoskeletal health",
        ]}
        longDescription={`
          <p>“Align & Thrive” combines posture analysis, ergonomic education, and lifestyle counseling to address the root causes of physical discomfort. Whether you're working long hours at a desk, using mobile devices extensively, or lifting improperly, this program helps you reset harmful patterns.</p>
          
          <p>It includes postural screening, desk setup recommendations, and simple corrections for sustainable well-being, empowering you to take control of your physical health.</p>
        `}
        process={[
          {
            title: "Postural & Ergonomic Evaluation",
            description:
              "Undergo a postural evaluation using visual and functional tools, along with an assessment of your daily ergonomic setup.",
          },
          {
            title: "Identify Stressors & Habits",
            description:
              "Identification of ergonomic and lifestyle stressors, as well as habitual patterns contributing to discomfort.",
          },
          {
            title: "Customized Correction Plan",
            description:
              "Receive a customized plan for workspace setup, movement correction, and daily postural adjustments.",
          },
          {
            title: "Practical Demonstration & Guidance",
            description:
              "Get a hands-on demonstration of daily postural adjustments, ergonomic best practices, and simple exercises.",
          },
          {
            title: "Guidance for Long-Term Habits",
            description:
              "Receive printed or digital guidance and resources to help you maintain healthy posture and ergonomic habits long-term.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}