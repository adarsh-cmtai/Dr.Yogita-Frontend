"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactFAQ() {
  const faqs = [
    {
      question: "How do I schedule an appointment?",
      answer:
        "You can schedule an appointment by calling our clinic at +91 98765 43210, sending an email to dryogita@example.com, filling out the contact form on this page, or using the online booking system on our website.",
    },
    {
      question: "What should I bring to my first appointment?",
      answer:
        "Please bring any relevant medical records, imaging reports (X-rays, MRIs), referral letters from your doctor, a list of current medications, comfortable clothing for assessment and treatment, and your insurance information if applicable.",
    },
    {
      question: "Do you accept insurance?",
      answer:
        "Yes, we accept most major insurance plans. Please contact our office with your insurance details before your appointment so we can verify your coverage and benefits.",
    },
    {
      question: "How long is a typical physiotherapy session?",
      answer:
        "Initial consultations typically last 45-60 minutes, which includes assessment and treatment. Follow-up sessions are usually 30-45 minutes, depending on your specific condition and treatment plan.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "We request at least 24 hours' notice for cancellations. Late cancellations or no-shows may incur a fee of 50% of the scheduled service. We understand emergencies happen and will consider these circumstances on a case-by-case basis.",
    },
    {
      question: "Do you offer online/virtual physiotherapy sessions?",
      answer:
        "Yes, we offer telehealth physiotherapy sessions for patients who cannot visit our clinic in person. These sessions are conducted via secure video conferencing and include assessment, guided exercises, and personalized advice.",
    },
  ]

  return (
    <section className="py-20 bg-rose-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about appointments, insurance, and our services.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="border-pink-100">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-pink-600 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
