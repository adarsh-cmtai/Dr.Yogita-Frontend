import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "Lifespan PhysioCare: Pediatric to Geriatric Physiotherapy | Dr. Yogita Physiotherapy",
  description: "Age-specific physiotherapy for children, teens, and elderly. Managing developmental delays, postural issues, or age-related mobility challenges.",
}

export default function LifespanPhysioCarePage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Lifespan PhysioCare: Pediatric to Geriatric Physiotherapy"
        description="A comprehensive age-specific physiotherapy service for children, teens, and elderly clients. Whether managing developmental delays, postural issues, or age-related mobility challenges, this program ensures every stage of life receives the right therapeutic care and attention."
        image="/services/Pediatric to Geriatric Physiotherapy.webp" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है (e.g., lifespan-physiocare.jpg)
        benefits={[
          "Encourages healthy development in children",
          "Manages screen/posture issues in adolescents",
          "Improves strength, balance, and independence in seniors",
          "Prevents injuries and enhances mobility",
          "Builds confidence across all age groups",
        ]}
        longDescription={`
          <p>“Lifespan PhysioCare” is tailored to the unique needs of three vital age groups—children, adolescents, and seniors. For kids, the focus is on motor development, balance, and coordination. For teens, it’s postural correction, sports injury prevention, and screen-time management.</p>
          
          <p>For seniors, therapy addresses fall prevention, joint flexibility, and muscle strength. Each session is crafted to align with age-related physical demands and capabilities, promoting overall well-being at every stage of life.</p>
        `}
        process={[
          {
            title: "Age-Appropriate Assessment",
            description:
              "An initial age-appropriate assessment and detailed medical history intake for the specific age group (child, teen, or senior).",
          },
          {
            title: "Customized Goal Setting",
            description:
              "Customized goal-setting tailored to individual needs (e.g., play-based for kids, functional improvements for adults and seniors).",
          },
          {
            title: "Targeted Therapy Sessions",
            description:
              "Delivery of targeted therapy sessions using safe, effective, and age-appropriate techniques.",
          },
          {
            title: "Caregiver Guidance",
            description:
              "Providing guidance and education to parents, guardians, or caregivers when needed to support therapy at home.",
          },
          {
            title: "Progress Checks & Home Exercises",
            description:
              "Periodic progress checks to monitor improvements and provision of take-home exercises to maintain gains.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}