import FooterSection from "@/components/footer-section"
import ServicePageTemplate from "@/components/services/service-page-template"

export const metadata = {
  title: "OrthoCare: Joint & Muscle Physiotherapy | Dr. Yogita Physiotherapy",
  description: "Focused clinic-based program for orthopedic conditions affecting joints and muscles. Relieve discomfort and restore movement for arthritis, frozen shoulder, ligament injuries, or chronic knee pain.",
}

export default function OrthoCarePhysiotherapyPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="OrthoCare: Joint & Muscle Physiotherapy"
        description="A focused clinic-based program for treating orthopedic conditions affecting joints and muscles. Whether it’s arthritis, frozen shoulder, ligament injuries, or chronic knee pain, this service is designed to relieve discomfort and restore functional movement through personalized therapy."
        image="/Online/image 7.jpg" // सुनिश्चित करें कि यह इमेज आपके public/services फ़ोल्डर में मौजूद है (e.g., orthocare-joint-muscle.jpg)
        benefits={[
          "Reduces joint and muscle pain naturally",
          "Improves mobility and strength",
          "Enhances functional activities like walking, climbing stairs, lifting",
          "Prevents further injury or degeneration",
          "Supports long-term joint and muscle health",
        ]}
        longDescription={`
          <p>“OrthoCare” is a specialized orthopedic physiotherapy service aimed at managing and rehabilitating joint and muscle-related disorders. It includes a combination of manual therapy, electrotherapy, therapeutic exercises, and postural training.</p>
          
          <p>This service is ideal for patients suffering from stiffness, swelling, or pain in the shoulders, knees, hips, or spine due to injuries, overuse, or age-related degeneration, helping them return to an active and pain-free lifestyle.</p>
        `}
        process={[
          {
            title: "In-Depth Orthopedic Assessment",
            description:
              "A thorough in-depth assessment of your specific orthopedic concerns and medical history.",
          },
          {
            title: "Diagnosis-Based Treatment Planning",
            description:
              "Development of a personalized treatment plan based on the clinical diagnosis and your functional goals.",
          },
          {
            title: "Hands-On & Modality-Assisted Therapy",
            description:
              "Application of hands-on manual therapy techniques combined with machine-assisted modalities (like electrotherapy) as needed.",
          },
          {
            title: "Guided Exercise & Progress Monitoring",
            description:
              "Supervised therapeutic exercise sessions with continuous monitoring of your progress and technique.",
          },
          {
            title: "Ongoing Joint Care & Posture Advice",
            description:
              "Receive ongoing advice for joint care, ergonomic adjustments, and postural corrections to maintain long-term health.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}