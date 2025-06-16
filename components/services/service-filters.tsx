"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ServiceFiltersProps = {
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (category: string) => void
  onClearFilters: () => void
}

export default function ServiceFilters({
  categories,
  selectedCategories,
  onCategoryChange,
  onClearFilters,
}: ServiceFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close filter panel on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Filter Services</h3>

        {/* Mobile filter toggle */}
        <Button
          variant="outline"
          className="md:hidden flex items-center gap-2 border-pink-200 text-pink-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter className="h-4 w-4" />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>

        {/* Selected filters badges */}
        <div className="flex flex-wrap gap-2">
          {selectedCategories.length > 0 && (
            <>
              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  className="bg-pink-100 text-pink-700 hover:bg-pink-200 cursor-pointer flex items-center gap-1"
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 p-0 h-6"
                onClick={onClearFilters}
              >
                Clear all
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Desktop filters - always visible */}
      <div className="hidden md:flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategories.includes(category) ? "default" : "outline"}
            className={`
              cursor-pointer text-sm px-3 py-1 
              ${
                selectedCategories.includes(category)
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-white text-gray-700 hover:bg-pink-100 hover:text-pink-700 border-pink-200"
              }
            `}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Mobile filters - toggleable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className={`
                    cursor-pointer text-sm px-3 py-1 
                    ${
                      selectedCategories.includes(category)
                        ? "bg-pink-500 hover:bg-pink-600 text-white"
                        : "bg-white text-gray-700 hover:bg-pink-100 hover:text-pink-700 border-pink-200"
                    }
                  `}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
