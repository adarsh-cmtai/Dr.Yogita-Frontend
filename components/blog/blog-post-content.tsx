"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card"; // Ensure this is imported
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import ReactMarkdown from "react-markdown"; // npm install react-markdown
import type { DisplayBlogPost } from "@/types/blog"; // BlogPost की जगह DisplayBlogPost इम्पोर्ट करें
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, strikethrough etc.) npm install remark-gfm

interface BlogPostContentProps {
  post: DisplayBlogPost; // यहाँ 'post' प्रॉप को DisplayBlogPost टाइप दें
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const handleShare = (platform: string) => { 
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title; // अब post.title DisplayBlogPost से आएगा
    let shareUrl = "";
    switch (platform) {
      case "facebook": shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
      case "twitter": shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`; break;
      case "linkedin": shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`; break;
      case "copy": 
        if (typeof navigator.clipboard?.writeText === 'function') {
          navigator.clipboard.writeText(url).then(() => alert("Link copied to clipboard!")).catch(err => console.error('Failed to copy: ', err));
        } else {
          // Fallback for browsers that don't support navigator.clipboard
          // (e.g., HTTP sites, older browsers) - you might want a more robust solution
          alert("Clipboard API not available. Please copy the link manually.");
        }
        return;
    }
    if (shareUrl) window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <motion.div 
            className="hidden lg:block" 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
          > {/* Desktop Share */}
            <div className="sticky top-32">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Share This Article</h3>
              <div className="flex flex-col space-y-3">
                <button onClick={() => handleShare("facebook")} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"><Facebook className="h-5 w-5 mr-2" />Facebook</button>
                <button onClick={() => handleShare("twitter")} className="flex items-center text-gray-600 hover:text-sky-500 transition-colors"><Twitter className="h-5 w-5 mr-2" />Twitter</button>
                <button onClick={() => handleShare("linkedin")} className="flex items-center text-gray-600 hover:text-blue-700 transition-colors"><Linkedin className="h-5 w-5 mr-2" />LinkedIn</button>
                <button onClick={() => handleShare("copy")} className="flex items-center text-gray-600 hover:text-pink-500 transition-colors"><Link2 className="h-5 w-5 mr-2" />Copy Link</button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-3" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
          > {/* Main Content */}
            <Card className="p-6 sm:p-8 md:p-10 border-pink-100 shadow-sm">
              <article 
                className="prose prose-pink max-w-none 
                           prose-headings:font-semibold prose-headings:text-gray-800 
                           prose-a:text-pink-600 hover:prose-a:text-pink-700
                           prose-strong:font-semibold
                           prose-img:rounded-md prose-img:shadow-sm"
              >
                {/* post.content DisplayBlogPost से आएगा */}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
              </article>

              <div className="mt-8 pt-6 border-t border-gray-100"> {/* Tags */}
                <h4 className="text-sm font-medium text-gray-500 mb-3">Related Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {/* post.categories DisplayBlogPost से आएगा और यह वैकल्पिक हो सकता है */}
                  {post.categories?.map((category, index) => (
                    <span 
                      key={index} 
                      className="inline-block bg-pink-50 text-pink-600 text-sm px-3 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 lg:hidden"> {/* Mobile Share */}
                <h4 className="text-sm font-medium text-gray-500 mb-3">Share This Article:</h4>
                <div className="flex space-x-4">
                   <button onClick={() => handleShare("facebook")} className="text-gray-600 hover:text-blue-600 transition-colors"><Facebook className="h-5 w-5" /></button>
                   <button onClick={() => handleShare("twitter")} className="text-gray-600 hover:text-sky-500 transition-colors"><Twitter className="h-5 w-5" /></button>
                   <button onClick={() => handleShare("linkedin")} className="text-gray-600 hover:text-blue-700 transition-colors"><Linkedin className="h-5 w-5" /></button>
                   <button onClick={() => handleShare("copy")} className="text-gray-600 hover:text-pink-500 transition-colors"><Link2 className="h-5 w-5" /></button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}