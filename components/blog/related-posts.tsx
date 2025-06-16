"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"; // Ensure Card is imported
import { Button } from "@/components/ui/button"; // Ensure Button is imported
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog"; // Use shared type

interface RelatedPostsProps {
  currentPostSlug: string;
  currentPostCategories: string[]; // Pass categories of current post for better relatedness
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";

// Helper to format date (can be moved to a shared utils file)
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

export default function RelatedPosts({ currentPostSlug, currentPostCategories }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!currentPostSlug) return;
      setIsLoading(true);
      try {
        // Pass categories to backend if your backend /related endpoint uses them
        // For now, the backend /related/:slug uses the slug to find categories
        const response = await fetch(`${API_BASE_URL}/blogs/related/${currentPostSlug}?limit=3`);
        if (!response.ok) throw new Error("Failed to fetch related posts");
        const data = await response.json();
        if (data.success) {
          setRelatedPosts(data.data);
        } else {
          console.error("Error in related posts response:", data.error);
          setRelatedPosts([]);
        }
      } catch (err) {
        console.error("Error fetching related posts:", err);
        setRelatedPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRelated();
  }, [currentPostSlug, currentPostCategories]); // Rerun if slug or categories change

  if (isLoading) {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <Loader2 className="h-8 w-8 text-pink-500 animate-spin mx-auto" />
                <p className="mt-2 text-gray-600">Loading related articles...</p>
            </div>
        </section>
    );
  }

  if (relatedPosts.length === 0) return null; // Don't render section if no related posts

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Related Articles</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <Card className="h-full border-pink-100 hover:shadow-md transition-all duration-300 flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={post.coverImage?.url || "/placeholder-blog.jpg"} alt={post.title} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories?.slice(0, 2).map((category, i) => (
                      <span key={i} className="inline-block bg-pink-50 text-pink-600 text-xs font-medium px-2.5 py-1 rounded-full">{category}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1.5" /><span>{formatDate(post.createdAt)}</span></div>
                    {post.readingTime && <div className="flex items-center mt-1"><Clock className="h-4 w-4 mr-1.5" /><span>{post.readingTime}</span></div>}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="mt-auto block">
                    <Button variant="outline" className="w-full border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}