import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Online Physiotherapy Consultation | Dr. Yogita Physiotherapy",
  description: "Virtual physiotherapy consultation to identify pain causes, with guided movements, posture checks, and personalized plans from home.",
}

export default function OnlinePhysioConsultationPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Online Physiotherapy Consultation"
        description="Experience expert physiotherapy from the comfort of your home. This virtual consultation helps identify the root cause of your pain through guided movements, posture checks, and your health history. Ideal for busy professionals, elderly patients, and anyone unable to visit a clinic."
        image="/Online/image 8.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है
        benefits={[
          "One-on-one expert guidance from home",
          "Saves time, travel, and waiting",
          "Personalized assessment and plan",
          "Ideal for early diagnosis and mild to moderate pain",
          "Follow-up support and tracking available",
        ]}
        longDescription={`
          <p>Online physiotherapy consultations are designed to provide personalized care without needing a physical visit. Through secure video calls, I assess your pain, posture, daily activities, and any previous reports or X-rays.</p>
          
          <p>Based on this, I create a custom plan of exercises, ergonomic corrections, and lifestyle advice to help you recover faster and safely at home. These sessions are interactive, private, and easy to attend from any device. A great first step before starting therapy or when traveling.</p>
        `}
        process={[
          {
            title: "Book an Appointment",
            description:
              "Book an appointment through the website or WhatsApp.",
          },
          {
            title: "Join Video Session",
            description:
              "Join the video session via a secure Zoom or Google Meet link.",
          },
          {
            title: "Live Assessment",
            description:
              "Postural and movement assessment conducted live.",
          },
          {
            title: "Customized Plan",
            description:
              "Customized plan shared with exercises and daily tips.",
          },
          {
            title: "Follow-Up Guidance",
            description:
              "Follow-up guidance provided through messages or email if needed.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}