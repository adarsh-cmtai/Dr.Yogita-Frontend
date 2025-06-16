import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Stress & Posture Therapy for Working Adults | Dr. Yogita Physiotherapy",
  description: "Online therapy for working adults combining stress management and posture correction to alleviate work-related pain and improve well-being.",
}

export default function StressPostureTherapyPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Stress & Posture Therapy for Working Adults"
        description="This online therapy is designed for working adults who suffer from stress, poor posture, and work-related physical pain. It combines stress management techniques and posture correction to help you feel better, perform better, and live better."
        image="/services/Stress & Posture Therapy for Working Adults.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है
        benefits={[
          "Relieves tension in the neck, shoulders, and lower back",
          "Reduces stress and promotes mental relaxation",
          "Improves posture for better long-term spine health",
          "Boosts energy and focus during long work hours",
          "Provides practical, time-efficient exercises suitable for office environments",
        ]}
        longDescription={`
          <p>Long working hours, tight deadlines, and sedentary desk jobs can lead to poor posture, increased stress, and chronic pain. This service helps working adults by combining stress relief exercises with posture correction techniques to reduce pain, boost productivity, and improve mental clarity.</p>
          
          <p>Whether you're struggling with neck pain, back discomfort, or stress-induced fatigue, we offer a holistic approach that can be practiced right from your home or office. The program includes simple breathing techniques, posture assessments, movement exercises, and relaxation strategies—all customized to fit your busy schedule.</p>
        `}
        process={[
          {
            title: "Online Assessment",
            description:
              "Book an online assessment to identify pain and stress triggers.",
          },
          {
            title: "Personalized Plan",
            description:
              "Get a personalized plan that includes posture correction and stress-relief exercises.",
          },
          {
            title: "Guided Live Sessions",
            description:
              "Attend guided live sessions focused on relieving work-related stress.",
          },
          {
            title: "Integrate Quick Techniques",
            description:
              "Integrate quick, effective techniques to practice during work hours.",
          },
          {
            title: "Follow-Up & Evaluation",
            description:
              "Follow-up sessions for ongoing support and progress evaluation.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}