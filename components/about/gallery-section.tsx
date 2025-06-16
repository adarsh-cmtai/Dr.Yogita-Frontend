"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const galleryImages = [

      {
      src: "/gallery/gallery Image 8.jpg",
      alt: "Consultant Physiotherapist",
      category: "Clinic",
    },
    {
      src: "/gallery/Consultant Area.jpg ",
      alt: "Clinic Consultant Area ",
      category: "Clinic",
    },
    {
      src: "/gallery/treatment room.jpg",
      alt: "Treatment Room",
      category: "Clinic",
    },
    {
      src: "/gallery/gallery Image 9.jpg",
      alt: "Physiotherapy consultation",
      category: "Treatment",
    },
    {
      src: "/gallery/gallery Image 6.jpg",
      alt: "Back Pain Relief & Treatment",
      category: "Clinic",
    },
    {
      src: "/gallery/gallery Image 4.jpg",
      alt: "Team Meeting",
      category: "Team",
    },
    {
      src: "/gallery/gallery Image 7.jpg",
      alt: "Patient Consultation",
      category: "Treatment",
    },
  
    {
      src: "/gallery/WAITING AREA.jpg",
      alt: "Waiting Area",
      category: "Clinic",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Clinic Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a virtual tour of our state-of-the-art facilities and get a glimpse of our team in action.
          </p>
          <div className="w-20 h-1 bg-pink-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-medium bg-pink-500/80 px-3 py-1 rounded-full text-sm">
                    View Larger
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-sm font-medium">{image.alt}</p>
                <span className="text-pink-200 text-xs">{image.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full z-10"
            >
              <X className="h-5 w-5" />
            </button>
            {selectedImage && (
              <div className="relative h-[80vh] max-h-[80vh]">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Gallery image"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
