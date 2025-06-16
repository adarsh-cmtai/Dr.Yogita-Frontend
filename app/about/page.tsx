import ProfileSection from "@/components/about/profile-section"
import TimelineSection from "@/components/about/timeline-section"
import AwardsSection from "@/components/about/awards-section"
import WhyChooseSection from "@/components/about/why-choose-section"
// import TeamSection from "@/components/about/team-section"
import GallerySection from "@/components/about/gallery-section"
import TestimonialsSection from "@/components/testimonials-section"
import FooterSection from "@/components/footer-section"
import VisionMissionSection from "@/components/about/vision-mission-section"
import FaqSection from "@/components/about/faq-section"
import Approach from "@/components/about/approach-section"

export const metadata = {
  title: "About Dr. Yogita | Expert Physiotherapist",
  description: "Learn about Dr. Yogita's 22+ years of experience, qualifications, and approach to physiotherapy.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-rose-50/30">
      <ProfileSection />
      <TimelineSection />
<Approach />  
      <AwardsSection />
      <WhyChooseSection />
      {/* <TeamSection /> */}
      <GallerySection />
      <VisionMissionSection /> 
      <TestimonialsSection />
      <FaqSection />
      <FooterSection />
    </main>
  )
}
