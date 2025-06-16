import HeroSection from "@/components/hero-section";
import MeetDrYogita from "@/components/meet-dr-yogita";
import ServicesSection from "@/components/services-section";
// import EbookSection from "@/components/ebook-section"
import TestimonialsSection from "@/components/testimonials-section";
import HealthTipsSection from "@/components/health-tips-section";
import FooterSection from "@/components/footer-section";

export default function Home() {
  // Check if maintenance mode is enabled
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8d7da' }}>
        <h1 style={{ color: '#721c24',fontSize:"100px" } }>Site is under maintenance</h1>
        <p style={{fontSize:"100px"}}>Please check back later!</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-rose-50/30 overflow-x-hidden">
      <HeroSection />
      <MeetDrYogita />
      <ServicesSection />
      {/* <EbookSection /> */}
      <TestimonialsSection />
      <HealthTipsSection />
      <FooterSection />
    </main>
  );
}