"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react"; // Added Loader2
import Image from "next/image";
import Link from "next/link";

// Define the structure of a blog post for the frontend
interface BlogPost {
  _id: string; // Usually from MongoDB
  title: string;
  slug: string;
  excerpt: string;
  coverImage: { url: string }; // Assuming backend sends object with url
  categories: string[];
  // date: string; // createdAt from backend can be formatted
  createdAt: string; // Expecting ISO date string
  readingTime?: string; // Optional
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";

// Helper to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogFeatured() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch only 2 featured posts, or adjust limit as needed
        const response = await fetch(`${API_BASE_URL}/blogs/featured?limit=2`); 
        if (!response.ok) {
          throw new Error(`Failed to fetch featured posts: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success) {
          setFeaturedPosts(data.data);
        } else {
          throw new Error(data.error || "Could not fetch featured posts.");
        }
      } catch (err: any) {
        console.error("Error fetching featured posts:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-12 w-12 text-pink-500 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600">Loading featured articles...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>Error loading featured articles: {error}</p>
        </div>
      </section>
    );
  }
  
  if (featuredPosts.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>No featured articles available at the moment.</p>
        </div>
      </section>
    );
  }


  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Articles</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and informative articles on physiotherapy, wellness, and pain management.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.slug} // Changed from post.id to post.slug or post._id
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-pink-100 hover:shadow-lg transition-all duration-300 h-full">
                <div className="grid md:grid-cols-5 h-full">
                  <div className="md:col-span-2 relative h-full min-h-[240px]">
                    <Image
                      src={post.coverImage?.url || "/placeholder-blog.jpg"} // Use placeholder
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-auto"> {/* Pushes content above this div up */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories?.slice(0, 2).map((category, i) => (
                            <span
                              key={i}
                              className="inline-block bg-pink-100 text-pink-600 text-xs font-medium px-2.5 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      </div>

                      <div className="mt-4"> {/* Pushed to bottom due to flex-col and mb-auto */}
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(post.createdAt)}</span> {/* Use createdAt and format it */}
                          {post.readingTime && (
                            <>
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{post.readingTime}</span>
                            </>
                          )}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                            Read Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}