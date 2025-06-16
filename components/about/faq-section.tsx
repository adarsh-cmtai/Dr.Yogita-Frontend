"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string;
  answer: string;
}

// Updated general FAQs
const generalFaqs: FAQItem[] = [
  {
    question: "Can physiotherapy be done online?",
    answer: "Yes! Virtual physiotherapy is effective for most back, neck, and posture-related issues. Through video consultations, I assess your condition, guide you through personalized exercises, and monitor your progress—all from the comfort of your home."
  },
  {
    question: "How is your approach different from other physiotherapists?",
    answer: "With 22+ years of experience, I combine physical therapy with psychological insight and holistic healing techniques like Bach Remedies. I treat the root cause, not just the symptoms, and offer a whole-person approach."
  },
  {
    question: "Do I need a doctor’s referral to start physiotherapy?",
    answer: "No. You can book a session directly with me. However, if you have a complex condition or recent surgery, having a doctor’s note can help us coordinate better care."
  },
  {
    question: "What can I expect in the first consultation?",
    answer: "The first session includes a detailed assessment of your posture, pain, and movement patterns. We’ll also discuss your lifestyle, goals, and create a personalized plan for pain relief and recovery."
  },
  {
    question: "Is physiotherapy only for pain relief?",
    answer: "Not at all. Physiotherapy also helps improve posture, flexibility, strength, balance, and prevents future injuries. It’s ideal for anyone looking to move better and live stronger."
  },
  {
    question: "How long will it take to see results?",
    answer: "It depends on the severity of your issue and how consistently you follow the plan. Many clients feel relief within 1–2 sessions, while long-term changes take a few weeks of guided therapy."
  },
  {
    question: "What should I wear or prepare for an online session?",
    answer: "Wear comfortable clothes that allow free movement. Ensure you have a quiet space, a yoga mat, and good lighting for the video session. A mobile stand or laptop setup is also helpful."
  },
  {
    question: "Do you offer packages or one-time sessions?",
    answer: "Yes, I offer both. Based on your needs, we can decide whether a single session, a short plan, or a monthly package works best for you."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First FAQ open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-rose-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about physiotherapy and Dr. Yogita's clinic.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {generalFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-colors shadow-sm ${
                  openIndex === index ? "bg-pink-100 text-pink-700" : "bg-white hover:bg-gray-50"
                }`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-pink-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <motion.div
                id={`faq-answer-${index}`}
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                  marginTop: openIndex === index ? "0.25rem" : "0rem"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
                aria-hidden={openIndex !== index}
              >
                <div className="p-5 bg-white border border-t-0 border-gray-200 rounded-b-lg shadow-sm">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}