import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Posture Correction Therapy | Dr. Yogita Physiotherapy",
  description: "Online posture correction therapy with targeted exercises, ergonomic changes, and daily habits for long-term spine health.",
}

export default function PostureCorrectionTherapyPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Posture Correction Therapy"
        description="Struggling with rounded shoulders, slouching, or a hunched back from long screen time? This online therapy focuses on correcting posture with targeted exercises, ergonomic changes, and daily movement habits for long-term spine health."
        image="/Online/image 6.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है
        benefits={[
          "Improved spinal alignment and reduced pain",
          "Enhanced body awareness and confidence",
          "Prevention of long-term damage from poor posture",
          "Customized for desk jobs, teens, or sedentary lifestyles",
          "No equipment needed—easy to follow at home",
        ]}
        longDescription={`
          <p>Poor posture can lead to neck pain, back stiffness, fatigue, and even reduced confidence. This online posture correction therapy is tailored for people who spend hours sitting—working professionals, students, or mobile users.</p>
          
          <p>We begin with a posture screening to identify misalignments. Based on the findings, you’ll receive a series of guided exercises, workspace adjustments, and sitting-standing techniques to restore natural alignment. It’s gentle, effective, and designed to create lifelong posture awareness.</p>
        `}
        process={[
          {
            title: "Book a Posture Screening",
            description:
              "Book a posture screening session to identify key areas for improvement.",
          },
          {
            title: "Personalized Analysis",
            description:
              "Get a personalized analysis of your posture and movement habits.",
          },
          {
            title: "Guided Corrective Exercises",
            description:
              "Receive live instruction on corrective exercises tailored to your needs.",
          },
          {
            title: "Ergonomic Guidance",
            description:
              "Implement ergonomic tips at your desk or home setup for better posture.",
          },
          {
            title: "Progress Tracking & Reviews",
            description:
              "Follow regular reviews to track your posture improvement and make adjustments.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}