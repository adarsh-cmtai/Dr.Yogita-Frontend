"use client"

import { motion } from "framer-motion"
import {
  Activity,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Eye,
  FileText,
  Hand,
  Layout,
  Scale,
  Search,
  TrendingUp,
  Video,
} from "lucide-react"
import type { Service } from "@/lib/services"

interface ServiceProcessProps {
  service: Service
}

export default function ServiceProcess({ service }: ServiceProcessProps) {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "clipboard-check":
        return <ClipboardCheck className="h-10 w-10 text-pink-500" />
      case "file-text":
        return <FileText className="h-10 w-10 text-pink-500" />
      case "hand":
        return <Hand className="h-10 w-10 text-pink-500" />
      case "activity":
        return <Activity className="h-10 w-10 text-pink-500" />
      case "book-open":
        return <BookOpen className="h-10 w-10 text-pink-500" />
      case "search":
        return <Search className="h-10 w-10 text-pink-500" />
      case "scale":
        return <Scale className="h-10 w-10 text-pink-500" />
      case "clipboard-list":
        return <ClipboardList className="h-10 w-10 text-pink-500" />
      case "layout":
        return <Layout className="h-10 w-10 text-pink-500" />
      case "video":
        return <Video className="h-10 w-10 text-pink-500" />
      case "eye":
        return <Eye className="h-10 w-10 text-pink-500" />
      case "trending-up":
        return <TrendingUp className="h-10 w-10 text-pink-500" />
      default:
        return <Activity className="h-10 w-10 text-pink-500" />
    }
  }

  return (
    <section className="py-20 bg-rose-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our {service.title} Process</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our systematic approach ensures you receive the most effective treatment and achieve optimal results.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {service.process.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-start mb-12 last:mb-0"
            >
              <div className="flex-shrink-0 bg-white rounded-full p-4 shadow-md mb-4 md:mb-0 md:mr-6">
                {getIconComponent(step.icon)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
