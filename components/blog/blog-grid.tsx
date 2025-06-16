"use client";

import type React from "react"; // Keep if you use React.FormEvent etc.
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, Filter as FilterIcon, ArrowRight, Loader2, AlertTriangle, X } from "lucide-react"; // Renamed Filter
import Image from "next/image";
import Link from "next/link";
import BlogPagination from "@/components/blog/blog-pagination"; // Assuming this exists

// Define BlogPost interface (can be shared if moved to a types file)
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: { url: string };
  categories: string[];
  createdAt: string; // ISO date string
  readingTime?: string;
}

type BlogCategory = string; // Categories are now strings

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";
const POSTS_PER_PAGE = 6;

// Helper to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogGrid() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]); // Stores all fetched posts for current filter/search
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For mobile filter toggle

  // Fetch categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        } else {
          throw new Error(data.error || "Could not fetch categories.");
        }
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        // setError("Could not load categories."); // Optional: show error for categories
      }
    };
    fetchCategories();
  }, []);

  // Fetch blog posts when filters or page change
  const fetchBlogPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let url = `${API_BASE_URL}/blogs?page=${currentPage}&limit=${POSTS_PER_PAGE}&status=published`;
    if (selectedCategory !== "all") {
      url += `&category=${encodeURIComponent(selectedCategory)}`;
    }
    if (searchQuery.trim() !== "") {
      url += `&search=${encodeURIComponent(searchQuery.trim())}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.success) {
        setAllPosts(data.data);
        setTotalPosts(data.totalPosts);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(data.error || "Could not fetch blog posts.");
      }
    } catch (err: any) {
      console.error("Error fetching blog posts:", err);
      setError(err.message);
      setAllPosts([]); // Clear posts on error
      setTotalPages(0);
      setTotalPosts(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]); // fetchBlogPosts is memoized by useCallback

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    document.getElementById("blog-grid-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 on new search
    fetchBlogPosts(); // Trigger fetch, though useEffect will also do it
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search text changes
  };

  const handleCategorySelect = (category: BlogCategory | "all") => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 on category change
    if (isFilterOpen) setIsFilterOpen(false); // Close mobile filter
  };


  return (
    <section id="blog-grid-container" className="py-20 bg-rose-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.h2
            id="blog-grid-heading" // For scrolling
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            All Articles
          </motion.h2>

          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <Button
              variant="outline"
              className="md:hidden flex items-center justify-center gap-2 border-pink-200"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FilterIcon className="h-4 w-4" /> {/* Renamed Filter to FilterIcon */}
              Filter Categories
            </Button>

            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full md:w-64 pr-10 border-pink-200 focus:border-pink-400"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500">
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Category filters - desktop */}
          <motion.div className="hidden md:block" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100 sticky top-24"> {/* Added sticky for desktop */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                <button onClick={() => handleCategorySelect("all")} className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === "all" ? "bg-pink-100 text-pink-600 font-medium" : "text-gray-600 hover:bg-pink-50"}`}>
                  All Categories
                </button>
                {categories.map((category) => (
                  <button key={category} onClick={() => handleCategorySelect(category)} className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === category ? "bg-pink-100 text-pink-600 font-medium" : "text-gray-600 hover:bg-pink-50"}`}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Category filters - mobile (collapsible) */}
          {isFilterOpen && (
            <motion.div className="md:hidden col-span-1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}><X className="h-5 w-5"/></Button>
                </div>
                <div className="space-y-2">
                  <button onClick={() => handleCategorySelect("all")} className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === "all" ? "bg-pink-100 text-pink-600 font-medium" : "text-gray-600 hover:bg-pink-50"}`}>
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button key={category} onClick={() => handleCategorySelect(category)} className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === category ? "bg-pink-100 text-pink-600 font-medium" : "text-gray-600 hover:bg-pink-50"}`}>
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog posts grid */}
          <div className={`md:col-span-3 ${isFilterOpen ? 'mt-0' : ''}`}>
            {isLoading && (
              <div className="col-span-full flex justify-center items-center py-10">
                <Loader2 className="h-10 w-10 text-pink-500 animate-spin" />
              </div>
            )}
            {!isLoading && error && (
              <div className="col-span-full bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center">
                <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Error Loading Articles</h3>
                <p>{error}</p>
                <Button onClick={fetchBlogPosts} variant="outline" className="mt-4">Try Again</Button>
              </div>
            )}
            {!isLoading && !error && allPosts.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6"> {/* Adjusted to sm:grid-cols-2, was md:grid-cols-2 lg:grid-cols-3 */}
                {allPosts.map((post, index) => (
                  <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                    <Card className="h-full border-pink-100 hover:shadow-md transition-all duration-300 flex flex-col">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image src={post.coverImage?.url || "/placeholder-blog.jpg"} alt={post.title} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"/>
                      </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories?.slice(0, 2).map((category, i) => (
                            <span key={i} className="inline-block bg-pink-100 text-pink-600 text-xs font-medium px-2.5 py-1 rounded-full">{category}</span>
                          ))}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                        <div className="text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                          {post.readingTime && (
                            <div className="flex items-center mt-1">
                              <Clock className="h-4 w-4 mr-1.5" />
                              <span>{post.readingTime}</span>
                            </div>
                          )}
                        </div>
                        <Link href={`/blog/${post.slug}`} className="mt-auto block">
                          <Button variant="outline" className="w-full border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
            {!isLoading && !error && allPosts.length === 0 && (
              <div className="col-span-full bg-white p-8 rounded-lg text-center border border-pink-100">
                <FilterIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-4">We couldn't find articles matching your criteria.</p>
                <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setCurrentPage(1);}}>
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && !error && totalPosts > POSTS_PER_PAGE && (
              <div className="mt-12">
                <BlogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}