"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function HealthTipsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [expandedTip, setExpandedTip] = useState<number | null>(null)

  const healthTips = [
    {
      title: "Listen to Your Body",
      description:
        "Pay attention to pain signals and avoid pushing through discomfort during exercises. If an exercise feels uncomfortable or causes sharp pain, stop immediately. Listening to your body helps prevent injuries and ensures a safe, effective recovery process. Always communicate with your physiotherapist for guided support and personalized care.",
      image: "/Tips/image 10.jpg",
    },
    {
      title: "Maintain Good Posture",
      description:
        "Proper posture reduces strain on muscles and joints, preventing injuries and chronic pain by back and neck strain, prevents muscle imbalances, and supports spinal alignment. Whether sitting at a desk or lifting objects, maintaining correct posture is key to long-term physical health and pain relief. Physiotherapy often starts with improving posture habits for lasting results.",
      image: "/Tips/image 6.jpg",
    },
    {
      title: "Hydration & Pain",
      description:
        "Staying hydrated is crucial for reducing muscle cramps, joint stiffness, and inflammation. Proper hydration improves tissue health, circulation, and recovery after physiotherapy sessions. Dehydration can worsen pain and delay healing. Drink water throughout the day to support pain relief and enhance your body’s natural healing processes.",
      image: "/Tips/image 8.jpg",
    },
    {
      title: "Be Patient and Stay Positive",
      description:
        "Recovery takes time and effort, stay committed, trust the process, and celebrate small progress. Physiotherapy is a journey, and progress often comes in stages. Consistent effort, encouragement, and trust in the process lead to long-term pain relief and health benefits.",
      image: "/Tips/image 4.jpg",
    },
    {
      title: "Stay Consistent with Exercises",
      description:
        "Regular physiotherapy exercises help in faster recovery and long-term strength improvement. Consistency is crucial in physiotherapy. Regularly practicing prescribed exercises strengthens muscles, improves flexibility, and accelerates healing. Skipping sessions slows progress and may lead to setbacks. Create a routine, follow your therapist’s plan, and stay dedicated for maximum recovery and long-term mobility.",
      image: "/Tips/image 2.jpg",
    },
    {
      title: "Ergonomic Setup",
      description:
        "An ergonomic workstation setup prevents posture-related pain and strain, especially in the neck, back, and wrists. Adjust your chair, desk, and screen height to support neutral alignment. Use lumbar support and keep feet flat. A proper ergonomic setup boosts comfort, productivity, and spinal health.",
      image: "/Tips/image 5.jpg",
    },
    {
      title: "Desk Stretches",
      description:
        "Regular desk stretches reduce stiffness, improve posture, and prevent neck, shoulder, and back pain caused by long hours of sitting. Simple movements like neck rolls, shoulder shrugs, and spine twists increase circulation and reduce tension. Incorporate them into your workday for better mobility and comfort.",
      image: "/Tips/image 7.jpg",
    },
    {
      title: "Proper Sleeping Posture",
      description:
        "Maintaining proper sleeping posture supports spinal alignment and prevents neck and back pain. Sleep on your back or side with a supportive pillow and a mattress that fits your body type. Avoid stomach sleeping, as it strains the spine. Good sleep posture aids recovery and overall well-being.",
      image: "/Tips/image 3.jpg",
    },
    {
      title: "Strengthen Your Core",
      description:
        "A strong core supports the spine, improves balance, reduces back pain, and improves stability. Core strengthening is often central to physiotherapy for back pain, posture issues, and rehabilitation. Incorporating targeted core exercises enhances stability, making daily activities safer and more efficient.",
      image: "/Tips/image 9.jpg",
    },
    {
      title: "Engage in Low-Impact Activities",
      description:
        "Low-impact exercises like swimming, walking, and yoga gently strengthen muscles and support healing. These activities complement physiotherapy by maintaining mobility without adding strain. Ideal for back pain, arthritis, or post-injury recovery, they promote endurance and long-term health improvement safely.",
      image: "/Tips/image 1.jpg",
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = 300

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tips & Tricks</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Practical advice and quick tips to help you maintain optimal health in your daily life.
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {healthTips.map((tip, index) => {
              const isExpanded = expandedTip === index
              return (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 md:w-96 px-4 snap-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`border-pink-100 hover:shadow-lg transition-all duration-300 h-full ${isExpanded
                        ? "max-h-full overflow-visible"
                        : "overflow-hidden max-h-[450px] md:max-h-[350px]"
                      }`}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={tip.image || "/placeholder.svg"}
                        alt={tip.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{tip.title}</h3>
                      {isExpanded ? (
                        <>
                          <p className="text-gray-600">{tip.description}</p>
                          <Button
                            variant="link"
                            className="text-pink-500 p-0 mt-2 hover:text-pink-600"
                            onClick={() => setExpandedTip(null)}
                          >
                            Read Less
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-600">
                            {tip.description.length > 60
                              ? `${tip.description.substring(0, 60)}...`
                              : tip.description}
                          </p>
                          {tip.description.length > 60 && (
                            <Button
                              variant="link"
                              className="text-pink-500 p-0 mt-2 hover:text-pink-600"
                              onClick={() => setExpandedTip(index)}
                            >
                              Read More
                            </Button>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md border-pink-100 z-10 hidden md:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5 text-pink-500" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md border-pink-100 z-10 hidden md:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5 text-pink-500" />
          </Button>
        </div>
      </div>
    </section>
  )
}
