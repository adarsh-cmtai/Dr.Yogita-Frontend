"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface ServiceBreadcrumbProps {
  serviceName: string
}

export default function ServiceBreadcrumb({ serviceName }: ServiceBreadcrumbProps) {
  return (
    <motion.div
      className="mb-4 flex items-center text-white/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="hover:text-white transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4 mx-2" />
      <Link href="/services" className="hover:text-white transition-colors">
        Services
      </Link>
      <ChevronRight className="h-4 w-4 mx-2" />
      <span>{serviceName}</span>
    </motion.div>
  )
}
