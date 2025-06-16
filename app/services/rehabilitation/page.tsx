import ServicePageTemplate from "@/components/services/service-page-template"
import FooterSection from "@/components/footer-section"

export const metadata = {
  title: "Rehabilitation Services | Dr. Yogita Physiotherapy",
  description:
    "Comprehensive rehabilitation programs to help you recover from injuries, surgeries, and medical conditions.",
}

export default function RehabilitationPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Rehabilitation"
        description="Our rehabilitation programs are designed to help you recover from injuries, surgeries, and medical conditions, restoring your function and improving your quality of life."
        image="/services/rehabilitation-service.jpg"
        benefits={[
          "Faster recovery from injuries and surgeries",
          "Improved strength, flexibility, and endurance",
          "Enhanced coordination and balance",
          "Reduced pain and discomfort",
          "Increased independence in daily activities",
          "Prevention of secondary complications",
        ]}
        longDescription={`
          <p>Rehabilitation is a specialized process that helps individuals recover from injuries, surgeries, or medical conditions that have affected their physical function. The goal of rehabilitation is to restore movement and function, reduce pain, and improve overall quality of life.</p>
          
          <p>At Dr. Yogita Physiotherapy Clinic, our rehabilitation programs are comprehensive and individualized, addressing the unique needs of each patient. We work with people of all ages and abilities, from athletes recovering from sports injuries to older adults managing chronic conditions.</p>
          
          <p>Our approach to rehabilitation combines therapeutic exercises, manual therapy, modalities, and education to help you achieve your recovery goals. We focus not just on treating the immediate symptoms but on addressing the underlying causes and preventing future issues.</p>
          
          <p>Whether you're recovering from a joint replacement, managing a neurological condition, or rehabilitating after a sports injury, our expert team will guide you through every step of your recovery journey.</p>
        `}
        process={[
          {
            title: "Comprehensive Evaluation",
            description:
              "We conduct a detailed assessment of your condition, including range of motion, strength, balance, and functional abilities.",
          },
          {
            title: "Goal Setting",
            description:
              "Together, we establish clear, achievable goals for your rehabilitation program based on your needs and aspirations.",
          },
          {
            title: "Personalized Program Development",
            description:
              "We create a tailored rehabilitation program that incorporates various therapeutic approaches to address your specific condition.",
          },
          {
            title: "Progressive Treatment",
            description:
              "Your program evolves as you progress, with exercises and activities becoming more challenging to continue improving your function.",
          },
          {
            title: "Functional Training",
            description:
              "We incorporate activities that mimic your daily tasks or sport-specific movements to ensure your rehabilitation translates to real-world function.",
          },
          {
            title: "Ongoing Assessment & Adjustment",
            description:
              "We regularly evaluate your progress and adjust your program as needed to ensure optimal outcomes.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}
