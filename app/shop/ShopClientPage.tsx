"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Filter, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FooterSection from "@/components/footer-section"

// Sample product data
const products = [
  {
    id: 1,
    name: "Foam Roller - Premium Quality",
    description: "High-density foam roller for muscle recovery and myofascial release.",
    price: 899,
    image: "/shop/foam-roller.jpg",
    category: "Recovery Tools",
    slug: "foam-roller-premium",
  },
  {
    id: 2,
    name: "Resistance Band Set",
    description: "Set of 5 resistance bands with different tension levels for strength training and rehabilitation.",
    price: 699,
    image: "/shop/resistance-bands.jpg",
    category: "Exercise Equipment",
    slug: "resistance-band-set",
  },
  {
    id: 3,
    name: "Posture Corrector Brace",
    description: "Adjustable posture corrector to help align your spine and reduce back pain.",
    price: 1299,
    image: "/shop/posture-corrector.jpg",
    category: "Supports & Braces",
    slug: "posture-corrector-brace",
  },
  {
    id: 4,
    name: "Massage Therapy Ball Set",
    description: "Set of 3 massage balls for targeting trigger points and relieving muscle tension.",
    price: 599,
    image: "/shop/massage-balls.jpg",
    category: "Recovery Tools",
    slug: "massage-ball-set",
  },
  {
    id: 5,
    name: "Knee Support Sleeve - Medium",
    description: "Compression knee sleeve for joint support and pain relief during activity.",
    price: 799,
    image: "/shop/knee-sleeve.jpg",
    category: "Supports & Braces",
    slug: "knee-support-sleeve",
  },
  {
    id: 6,
    name: "Pain Relief Massage Oil - 200ml",
    description: "Natural oil blend with eucalyptus and wintergreen for muscle pain relief.",
    price: 499,
    image: "/shop/massage-oil.jpg",
    category: "Oils & Creams",
    slug: "pain-relief-oil",
  },
  {
    id: 7,
    name: "Balance Disc",
    description: "Inflatable balance disc for core strengthening and improving stability.",
    price: 999,
    image: "/shop/balance-disc.jpg",
    category: "Exercise Equipment",
    slug: "balance-disc",
  },
  {
    id: 8,
    name: "Wrist Support Brace",
    description: "Adjustable wrist brace for carpal tunnel, sprains, and wrist pain.",
    price: 699,
    image: "/shop/wrist-brace.jpg",
    category: "Supports & Braces",
    slug: "wrist-support-brace",
  },
  {
    id: 9,
    name: "Acupressure Mat and Pillow Set",
    description: "Acupressure mat and pillow for pain relief, relaxation, and improved circulation.",
    price: 1599,
    image: "/shop/acupressure-mat.jpg",
    category: "Recovery Tools",
    slug: "acupressure-mat-set",
  },
  {
    id: 10,
    name: "Anti-Inflammatory Gel - 100g",
    description: "Fast-acting gel for reducing inflammation and relieving joint and muscle pain.",
    price: 399,
    image: "/shop/anti-inflammatory-gel.jpg",
    category: "Oils & Creams",
    slug: "anti-inflammatory-gel",
  },
  {
    id: 11,
    name: "Lumbar Support Cushion",
    description: "Ergonomic lumbar support cushion for office chairs and car seats.",
    price: 899,
    image: "/shop/lumbar-cushion.jpg",
    category: "Supports & Braces",
    slug: "lumbar-support-cushion",
  },
  {
    id: 12,
    name: "Hand Therapy Exercise Balls - Set of 3",
    description: "Therapy putty balls with different resistance levels for hand and grip strengthening.",
    price: 499,
    image: "/shop/hand-therapy-balls.jpg",
    category: "Exercise Equipment",
    slug: "hand-therapy-balls",
  },
]

// Get unique categories
const categories = Array.from(new Set(products.map((product) => product.category)))

export default function ShopClientPage() {
  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-pink-50 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('/shop/shop-pattern.png')] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Physiotherapy Shop</h1>
              <p className="text-xl text-gray-600 mb-8">
                Quality products to support your recovery, rehabilitation, and wellness journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm"
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Filter className="h-5 w-5 mr-2" />
                      Categories
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="all"
                          className="h-4 w-4 text-pink-500 focus:ring-pink-400 rounded"
                          defaultChecked
                        />
                        <label htmlFor="all" className="ml-2 text-gray-700">
                          All Products
                        </label>
                      </div>

                      {categories.map((category, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`category-${index}`}
                            className="h-4 w-4 text-pink-500 focus:ring-pink-400 rounded"
                          />
                          <label htmlFor={`category-${index}`} className="ml-2 text-gray-700">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
                    <div className="space-y-4">
                      <div>
                        <input
                          type="range"
                          min="0"
                          max="2000"
                          step="100"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between mt-2">
                          <span className="text-sm text-gray-600">₹0</span>
                          <span className="text-sm text-gray-600">₹2000</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <div>
                          <label htmlFor="min-price" className="text-xs text-gray-500">
                            Min
                          </label>
                          <input
                            type="number"
                            id="min-price"
                            placeholder="₹0"
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="max-price" className="text-xs text-gray-500">
                            Max
                          </label>
                          <input
                            type="number"
                            id="max-price"
                            placeholder="₹2000"
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">Apply Filters</Button>
                </motion.div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="md:col-span-3">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </motion.div>

              {/* Products */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/shop/${product.slug}`}>
                      <div className="relative h-48">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    <div className="p-4">
                      <div className="text-xs text-pink-500 font-medium mb-1">{product.category}</div>
                      <Link href={`/shop/${product.slug}`}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-pink-500 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-pink-500">₹{product.price}</span>
                        <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium flex items-center">
                          <ShoppingCart className="mr-1 h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders above ₹999 within India.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-gray-600">All transactions are secure and encrypted for your safety.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy for unused items in original packaging.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
