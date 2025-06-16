"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import type { DisplayBlogPost } from "@/types/blog"; // BlogPost की जगह DisplayBlogPost इम्पोर्ट करें

// प्रॉप्स के लिए इंटरफ़ेस
interface BlogPostHeroProps {
  post: DisplayBlogPost; // यहाँ 'post' प्रॉप को DisplayBlogPost टाइप दें
}

export default function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          // आपकी BlogPost टाइप में coverImage अनिवार्य है, इसलिए ?. की जरूरत नहीं
          // अगर यह वैकल्पिक हो सकती है, तो अपनी BlogPost टाइप को अपडेट करें और यहाँ ?. का उपयोग करें
          src={post.coverImage.url || "/placeholder-blog.jpg"} // फॉलबैक अगर url खाली है
          alt={post.title}
          fill
          className="object-cover brightness-[0.6] filter"
          sizes="100vw"
          priority // LCP इमेज के लिए अच्छा है
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/40 to-blue-900/40 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="mb-4 flex items-center text-white/80" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
        >
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="truncate max-w-[200px] sm:max-w-xs md:max-w-sm">{post.title}</span>
        </motion.div>

        <div className="max-w-3xl">
          <motion.div 
            className="flex flex-wrap gap-2 mb-4" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.1 }}
          >
            {/* categories वैकल्पिक हो सकता है, इसलिए ?. का उपयोग करें */}
            {post.categories?.map((category, index) => (
              <span 
                key={index} 
                className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </motion.div>

          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {post.title}
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-6" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {post.excerpt} {/* आपकी BlogPost टाइप में excerpt अनिवार्य है */}
          </motion.p>

          <motion.div 
            className="flex items-center text-white/80" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
          >
            <Calendar className="h-5 w-5 mr-2" />
            {/* post.date DisplayBlogPost से आता है और यह पहले से फॉर्मेटेड स्ट्रिंग है */}
            <span>{post.date}</span> 
            {post.readingTime && ( // readingTime वैकल्पिक हो सकता है
              <>
                <span className="mx-3">•</span>
                <Clock className="h-5 w-5 mr-2" />
                <span>{post.readingTime}</span>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}