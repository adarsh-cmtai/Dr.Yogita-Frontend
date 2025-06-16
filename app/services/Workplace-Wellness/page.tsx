import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Workplace Wellness Program for Professionals | Dr. Yogita Physiotherapy",
  description: "Online program for desk-bound professionals to reduce work-related pain, improve ergonomics, and boost energy.",
}

export default function WorkplaceWellnessPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Workplace Wellness for Professionals"
        description="Designed for desk-bound professionals, this service helps reduce work-related pain and fatigue. Through simple movements, desk ergonomics, and stress relief practices, you’ll feel more energized, focused, and pain-free—even during long workdays."
        image="/services/Workplace Wellness.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है
        benefits={[
          "Reduces work-related neck, back, and eye strain",
          "Boosts energy and focus during long hours",
          "Teaches easy movement breaks at your desk",
          "Improves posture and prevents chronic issues",
          "Enhances mental well-being and productivity",
        ]}
        longDescription={`
          <p>Many working professionals suffer silently from neck stiffness, lower back pain, eye strain, or fatigue due to long hours at the desk. This online program focuses on preventive care through posture correction, chair setup, regular movement breaks, and guided stretches that you can do at your workstation.</p>
          
          <p>We also include stress management tips and screen detox strategies. It’s ideal for corporate employees, freelancers, entrepreneurs, or anyone spending 6+ hours at a desk. Whether you work from home or in-office, these sessions are easy to follow and create lasting health changes.</p>
        `}
        process={[
          {
            title: "Assessment Call",
            description:
              "Book an assessment call to discuss your routine and discomforts.",
          },
          {
            title: "Work Setup Analysis",
            description:
              "Share your work setup photos or videos for analysis.",
          },
          {
            title: "Personalized Plan",
            description:
              "Receive a personalized movement and desk setup plan.",
          },
          {
            title: "Live Guided Sessions",
            description:
              "Attend live sessions for guided desk stretches and posture training.",
          },
          {
            title: "Progress Tracking & Support",
            description:
              "Track weekly progress with ongoing support and reminders.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}