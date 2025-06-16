import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Customized Home Exercise Plan | Dr. Yogita Physiotherapy",
  description: "Tailor-made home exercise routines designed for your body, pain level, and fitness goals, with professional guidance.",
}

export default function CustomizedHomeExercisePlanPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Customized Home Exercise Plan"
        description="This service offers a tailor-made exercise routine designed to suit your body, pain level, and fitness goals—all from the comfort of your home, with professional guidance and zero equipment stress."
        image="/Offline/image 4.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है
        benefits={[
          "100% tailored to your pain points, fitness level, and space",
          "Eliminates guesswork and prevents injury",
          "Saves time and builds consistency",
          "Great for busy professionals, elderly, or post-recovery clients",
          "Builds strength, flexibility, and confidence over time",
        ]}
        longDescription={`
          <p>Not every body is the same—and neither should every exercise plan be. Whether you're dealing with back pain, recovering from injury, managing lifestyle diseases, or simply aiming to stay active, this program gives you a safe, customized routine.</p>
          
          <p>After an initial assessment, you’ll receive a structured home exercise plan tailored to your condition, space, and time availability. The exercises are physiotherapist-approved, easy to follow, and regularly updated as you progress. This is ideal for beginners, seniors, working professionals, or anyone who finds gym routines overwhelming or unsafe.</p>
        `}
        process={[
          {
            title: "Consultation Call",
            description:
              "Book a consultation call for health and fitness assessment.",
          },
          {
            title: "Customized Routine",
            description:
              "Receive a customized home exercise routine (video + PDF).",
          },
          {
            title: "Online Walkthrough Session",
            description:
              "Attend an online walkthrough session for corrections and tips.",
          },
          {
            title: "Progress Tracking & Support",
            description:
              "Get support for progress tracking and weekly changes.",
          },
          {
            title: "Optional Follow-Up Sessions",
            description:
              "Optional follow-up sessions for advanced modifications.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}