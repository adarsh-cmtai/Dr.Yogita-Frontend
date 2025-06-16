import ProgramDetailPageClient from "./ProgramDetailPageClient"

// Sample program data - in a real app, this would come from a database or API
const programs = [
  {
    id: 1,
    title: "Back Pain Relief Program",
    description: "A comprehensive program designed to alleviate back pain through targeted exercises and techniques.",
    longDescription: `
      <p>Back pain affects millions of people worldwide and can significantly impact quality of life. This comprehensive program is designed by Dr. Yogita to address various types of back pain through targeted exercises, stretches, and self-massage techniques.</p>
      
      <p>The program begins with gentle mobilization exercises to reduce pain and stiffness, followed by progressive strengthening of the core and back muscles. You'll also learn proper body mechanics to prevent future pain episodes.</p>
      
      <p>This program is suitable for those with chronic back pain, recurrent episodes, or those looking to prevent back issues. The exercises are demonstrated with clear instructions and modifications for different fitness levels.</p>
    `,
    price: 1499,
    duration: "35 min",
    image: "/programs/back-pain-program.jpg",
    slug: "back-pain-relief",
    features: [
      "Targeted exercises for immediate pain relief",
      "Progressive strengthening for long-term results",
      "Proper posture and body mechanics guidance",
      "Self-massage techniques for pain management",
      "Modifications for different pain levels",
      "Complete follow-along format with expert instruction",
    ],
    demoVideo: "/programs/back-pain-demo.mp4",
  },
  {
    id: 2,
    title: "Posture Correction Program",
    description: "Improve your posture and prevent related pain with this specialized exercise and awareness program.",
    longDescription: `
      <p>Poor posture is increasingly common in our modern, technology-driven world and can lead to a variety of musculoskeletal issues. This specialized program focuses on correcting common postural deviations and building awareness of proper alignment.</p>
      
      <p>The program includes exercises to strengthen weak muscles, stretch tight areas, and retrain your body's natural alignment. You'll learn how to identify and correct your specific postural issues, whether they're related to forward head posture, rounded shoulders, or other common problems.</p>
      
      <p>Designed for people of all ages who spend significant time sitting, using devices, or experiencing posture-related discomfort, this program provides practical tools for immediate improvement and long-term postural health.</p>
    `,
    price: 1299,
    duration: "40 min",
    image: "/programs/posture-program.jpg",
    slug: "posture-correction",
    features: [
      "Assessment of common postural deviations",
      "Targeted stretches for tight muscles",
      "Strengthening exercises for postural muscles",
      "Awareness drills for better alignment",
      "Ergonomic tips for work and daily activities",
      "Progressive program for lasting results",
    ],
    demoVideo: "/programs/posture-demo.mp4",
  },
  // Additional programs would be defined here
]

export function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const program = programs.find((p) => p.slug === params.slug)

  if (!program) {
    return {
      title: "Program Not Found | Dr. Yogita Physiotherapy",
    }
  }

  return {
    title: `${program.title} | Dr. Yogita Physiotherapy`,
    description: program.description,
  }
}

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  return <ProgramDetailPageClient params={params} />
}
