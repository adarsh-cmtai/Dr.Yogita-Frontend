import BlogHero from "@/components/blog/blog-hero"
import BlogFeatured from "@/components/blog/blog-featured"
import BlogGrid from "@/components/blog/blog-grid"
import FooterSection from "@/components/footer-section"

export const metadata = {
  title: "Health Tips & Blog | Dr. Yogita Physiotherapy",
  description: "Expert advice, tips, and insights on physiotherapy, pain management, and overall wellness.",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      <BlogHero />
      <BlogFeatured />
      <BlogGrid />
      <FooterSection />
    </main>
  )
}
