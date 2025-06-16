export type ServiceProcess = {
  title: string
  description: string
  icon: string
}

export type ServiceFAQ = {
  question: string
  answer: string
}

export type Service = {
  slug: string
  title: string
  shortDescription: string
  description: string
  icon: string
  image: string
  benefits: string[]
  process: ServiceProcess[]
  faqs: ServiceFAQ[]
  featured: boolean
  categories: string[] // Add this new field
}

const services: Service[] = [
  {
    slug: "back-pain-relief",
    title: "Back Pain Relief",
    shortDescription: "Specialized treatment for acute and chronic back pain using evidence-based techniques.",
    description:
      "Our comprehensive back pain relief program combines manual therapy, targeted exercises, and education to address the root causes of your pain. Whether you're suffering from acute injury, chronic conditions, or postural issues, our personalized approach helps you regain mobility and live pain-free.",
    icon: "spine",
    image: "/services/Back & Neck Pain.jpg",
    benefits: [
      "Reduction in pain intensity and frequency",
      "Improved spinal mobility and function",
      "Strengthened core and back muscles",
      "Prevention of future back pain episodes",
      "Personalized home exercise program",
      "Education on proper body mechanics",
    ],
    process: [
      {
        title: "Comprehensive Assessment",
        description:
          "We begin with a thorough evaluation of your condition, medical history, and lifestyle factors to identify the root causes of your back pain.",
        icon: "clipboard-check",
      },
      {
        title: "Personalized Treatment Plan",
        description:
          "Based on your assessment, we develop a customized treatment plan that addresses your specific needs and recovery goals.",
        icon: "file-text",
      },
      {
        title: "Manual Therapy & Techniques",
        description:
          "Using specialized hands-on techniques, we work to relieve pain, improve mobility, and restore proper function to your spine and surrounding tissues.",
        icon: "hand",
      },
      {
        title: "Therapeutic Exercises",
        description:
          "We guide you through targeted exercises designed to strengthen your core, improve flexibility, and support proper spinal alignment.",
        icon: "activity",
      },
      {
        title: "Education & Prevention",
        description:
          "Learn proper body mechanics, ergonomics, and self-care strategies to prevent future back pain episodes and maintain long-term spinal health.",
        icon: "book-open",
      },
    ],
    faqs: [
      {
        question: "How many sessions will I need for back pain relief?",
        answer:
          "The number of sessions varies depending on the severity and duration of your condition. Most patients experience significant improvement within 6-8 sessions, though chronic conditions may require longer treatment plans. We'll provide a more specific timeline after your initial assessment.",
      },
      {
        question: "Is the treatment painful?",
        answer:
          "Our goal is to relieve pain, not cause it. While some techniques may cause temporary discomfort, especially when working on tender areas, we always work within your comfort level and adjust our approach based on your feedback.",
      },
      {
        question: "Can I continue my regular activities during treatment?",
        answer:
          "In most cases, we encourage maintaining activity as tolerated. We'll provide specific guidance on which activities to modify or avoid temporarily, and gradually reintroduce them as your condition improves.",
      },
      {
        question: "Do I need a doctor's referral for back pain treatment?",
        answer:
          "No, you don't need a referral to see us for back pain. However, if you've been referred by a doctor, please bring any relevant medical reports or imaging results to your first appointment.",
      },
      {
        question: "Will I need to do exercises at home?",
        answer:
          "Yes, home exercises are a crucial part of your recovery. We'll provide a personalized home exercise program and ensure you understand how to perform each exercise correctly for optimal results.",
      },
    ],
    featured: true,
    categories: ["Pain Management", "Manual Therapy", "In-Person", "Spine Care"],
  },

  {
    slug: "posture-correction",
    title: "Posture Correction",
    shortDescription: "Comprehensive assessment and personalized programs to improve posture and prevent pain.",
    description:
      "Our posture correction program addresses the underlying causes of poor posture, from muscle imbalances to daily habits. Through targeted exercises, manual therapy, and practical lifestyle modifications, we help you achieve proper alignment, reduce pain, and prevent future issues related to poor posture.",
    icon: "arrow-up-right",
    image: "/Online/image 6.jpg",
    benefits: [
      "Reduced neck, shoulder, and back pain",
      "Improved body alignment and balance",
      "Increased energy and reduced fatigue",
      "Enhanced breathing and circulation",
      "Better appearance and confidence",
      "Prevention of degenerative joint conditions",
    ],
    process: [
      {
        title: "Postural Assessment",
        description:
          "We conduct a detailed analysis of your standing, sitting, and movement patterns to identify specific postural deviations and their causes.",
        icon: "search",
      },
      {
        title: "Muscle Balance Evaluation",
        description:
          "We assess key muscle groups to identify imbalances, tightness, or weakness that contribute to your postural issues.",
        icon: "scale",
      },
      {
        title: "Customized Correction Plan",
        description:
          "Based on your assessment, we develop a personalized plan that includes specific exercises, manual therapy, and lifestyle modifications.",
        icon: "clipboard-list",
      },
      {
        title: "Targeted Strengthening & Stretching",
        description:
          "We guide you through exercises designed to strengthen weak muscles and stretch tight ones to restore proper balance and alignment.",
        icon: "dumbbell",
      },
      {
        title: "Ergonomic & Lifestyle Guidance",
        description:
          "Learn how to optimize your work environment, sleeping position, and daily activities to support good posture throughout your day.",
        icon: "layout",
      },
    ],
    faqs: [
      {
        question: "How long does it take to correct poor posture?",
        answer:
          "Posture correction is a gradual process that typically takes 2-3 months of consistent work. You'll likely notice initial improvements within 2-3 weeks, but lasting changes require time to retrain muscles and movement patterns. The exact timeline depends on the severity of your postural issues and your commitment to the program.",
      },
      {
        question: "Can poor posture be completely corrected at any age?",
        answer:
          "Yes, posture can be improved at any age. While younger individuals may see faster results, we've helped patients in their 60s and 70s make significant postural improvements. The key is consistency with your exercises and postural awareness throughout the day.",
      },
      {
        question: "Will I need special equipment for posture correction?",
        answer:
          "Most of our posture correction exercises require minimal or no equipment. For some specific exercises, we might recommend simple tools like resistance bands or a foam roller, which are affordable and easy to use at home.",
      },
      {
        question: "How often should I do my posture exercises?",
        answer:
          "For optimal results, we typically recommend performing your prescribed exercises daily, which usually takes 15-20 minutes. We'll also provide shorter 'posture reset' routines that you can do multiple times throughout the day, especially if you work at a desk.",
      },
      {
        question: "Can posture correction help with my headaches?",
        answer:
          "Yes, many headaches, particularly those originating from the neck (cervicogenic headaches), are directly related to poor posture. By improving your posture, we often see a significant reduction in the frequency and intensity of these types of headaches.",
      },
    ],
    featured: true,
    categories: ["Preventive Care", "Ergonomics", "In-Person", "Exercise Therapy"],
  },

  {
    slug: "online-therapy",
    title: "Online Therapy",
    shortDescription: "Expert physiotherapy guidance from the comfort of your home via secure video sessions.",
    description:
      "Our online physiotherapy sessions bring expert care directly to you, wherever you are. Using secure video technology, we provide comprehensive assessment, personalized treatment plans, guided exercises, and ongoing support—all with the same quality and attention you'd receive in person, but with added convenience.",
    icon: "monitor-smartphone",
    image: "/Online/image 4.jpg",
    benefits: [
      "Convenience of therapy from your home",
      "No travel time or transportation costs",
      "Flexible scheduling options",
      "Real-time guidance and feedback",
      "Personalized exercise programs",
      "Continuous access to expert advice",
    ],
    process: [
      {
        title: "Initial Video Consultation",
        description:
          "We begin with a comprehensive video assessment to understand your condition, medical history, and specific goals for therapy.",
        icon: "video",
      },
      {
        title: "Virtual Physical Assessment",
        description:
          "Through guided movements and specific tests, we evaluate your mobility, strength, and functional limitations via video.",
        icon: "eye",
      },
      {
        title: "Personalized Treatment Plan",
        description:
          "Based on your assessment, we develop a customized plan that includes specific exercises, self-treatment techniques, and lifestyle modifications.",
        icon: "file-text",
      },
      {
        title: "Guided Exercise Sessions",
        description:
          "During video sessions, we demonstrate exercises and watch you perform them to ensure proper technique and provide real-time corrections.",
        icon: "activity",
      },
      {
        title: "Progress Tracking & Adjustments",
        description:
          "We regularly assess your progress, answer questions, and adjust your program as needed to ensure optimal recovery and results.",
        icon: "trending-up",
      },
    ],
    faqs: [
      {
        question: "Is online physiotherapy as effective as in-person treatment?",
        answer:
          "Research shows that online physiotherapy can be just as effective as in-person care for many conditions, particularly when it comes to exercise-based rehabilitation and education. While hands-on techniques aren't possible, we teach you self-treatment methods and focus on active approaches that empower you in your recovery.",
      },
      {
        question: "What technology do I need for online sessions?",
        answer:
          "You'll need a device with a camera and microphone (smartphone, tablet, or computer), a stable internet connection, and enough space to move and exercise (about 2x2 meters). We use secure, user-friendly video platforms that work on most devices without requiring special software.",
      },
      {
        question: "How do you assess my condition without physical contact?",
        answer:
          "We use specialized assessment protocols designed for telehealth, guiding you through specific movements and tests while observing your quality of movement, range of motion, and pain responses. For many conditions, these visual assessments provide the information we need to develop effective treatment plans.",
      },
      {
        question: "What types of conditions can be treated online?",
        answer:
          "Online therapy is effective for many musculoskeletal conditions, including back and neck pain, posture-related issues, repetitive strain injuries, arthritis management, and post-surgical rehabilitation. During your initial consultation, we'll determine if your condition is appropriate for online care.",
      },
      {
        question: "Will my health insurance cover online physiotherapy?",
        answer:
          "Many insurance providers now cover telehealth physiotherapy services, especially since the COVID-19 pandemic. We recommend checking with your insurance provider regarding their specific policies for virtual physiotherapy sessions.",
      },
    ],
    featured: true,
    categories: ["Telehealth", "Remote Care", "Exercise Therapy", "Convenience"],
  },
  
  {
    slug: "chronic-fatigue-relief",
    title: "Chronic Fatigue Relief",
    shortDescription: "Holistic approach to managing and overcoming chronic fatigue and related conditions.",
    description:
      "Our chronic fatigue relief program takes a comprehensive approach to addressing persistent fatigue, combining gentle exercise progression, energy management strategies, and lifestyle modifications. We work with you to gradually rebuild stamina, improve daily function, and enhance your quality of life.",
    icon: "battery-charging",
    image: "/Offline/image 6.jpg",
    benefits: [
      "Improved energy levels and stamina",
      "Better sleep quality and patterns",
      "Reduced pain and discomfort",
      "Enhanced daily functioning",
      "Effective energy conservation strategies",
      "Improved mood and mental clarity",
    ],
    process: [
      {
        title: "Comprehensive Evaluation",
        description:
          "We begin with a thorough assessment of your fatigue patterns, medical history, activity levels, and lifestyle factors to understand your unique situation.",
        icon: "clipboard-check",
      },
      {
        title: "Baseline Activity Assessment",
        description:
          "We establish your current activity tolerance and identify patterns that may be contributing to your fatigue cycles.",
        icon: "activity",
      },
      {
        title: "Personalized Management Plan",
        description:
          "Based on your assessment, we develop a customized plan that includes appropriate exercise, pacing strategies, and lifestyle modifications.",
        icon: "file-text",
      },
      {
        title: "Graded Exercise Therapy",
        description:
          "We guide you through a carefully structured exercise program that gradually increases activity without triggering post-exertional malaise.",
        icon: "trending-up",
      },
      {
        title: "Energy Conservation Training",
        description:
          "Learn practical techniques to manage your energy effectively throughout the day and prioritize activities that matter most to you.",
        icon: "battery",
      },
    ],
    faqs: [
      {
        question: "How is physiotherapy helpful for chronic fatigue?",
        answer:
          "Physiotherapy addresses chronic fatigue through carefully structured activity programs that gradually rebuild stamina without triggering symptom flares. We also provide strategies for energy conservation, pain management, and improved sleep—all crucial components of managing chronic fatigue effectively.",
      },
      {
        question: "How long does it take to see improvements in energy levels?",
        answer:
          "Most patients begin to notice small improvements in their energy management within 4-6 weeks of consistent practice. More significant changes in overall energy levels typically emerge after 3-6 months. Recovery from chronic fatigue is usually gradual, with a pattern of small improvements over time.",
      },
      {
        question: "Will exercise make my fatigue worse?",
        answer:
          "When not properly structured, exercise can worsen fatigue. However, our approach uses carefully graded exercise therapy that starts well within your current capabilities and progresses very gradually. We monitor your response closely and adjust as needed to prevent post-exertional symptom flares.",
      },
      {
        question: "Do I need a medical diagnosis before starting treatment?",
        answer:
          "While a medical diagnosis can be helpful, it's not required to begin working with us. However, we do recommend that you've had appropriate medical testing to rule out other conditions that might cause fatigue. We can work alongside your medical team as part of your overall care plan.",
      },
      {
        question: "Can online sessions be effective for chronic fatigue management?",
        answer:
          "Yes, online sessions are often ideal for chronic fatigue patients as they eliminate the energy expenditure of traveling to appointments. Our virtual program includes all the key components of our in-person approach, including assessment, exercise guidance, and energy management strategies.",
      },
    ],
    featured: true,
    categories: ["Energy Management", "Chronic Conditions", "Lifestyle Modification", "In-Person"],
  },
]

export function getAllServices(): Service[] {
  return services
}

export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured)
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug)
}

export function getRelatedServices(currentSlug: string, count = 3): Service[] {
  const otherServices = services.filter((service) => service.slug !== currentSlug)
  // Shuffle array to get random related services
  return otherServices.sort(() => 0.5 - Math.random()).slice(0, count)
}
