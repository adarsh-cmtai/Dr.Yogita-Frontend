"use client";
import { motion } from "framer-motion";
// Adjust icons as needed: ListVideo, Calendar, Clock, Info, PlayCircle, ArrowRight
import { ListVideo, Info, ArrowRight, ShoppingCart, Play, Clock, Youtube } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FooterSection from "@/components/footer-section";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProgramModal, ProgramItem } from "@/components/ProgramModal"; // Path to your Modal

// Interface for Program Series
interface ProgramSeries {
  _id: string;
  title: string;
  description: string;
  coverImageUrl: string; // Cloudinary URL for series cover
  slug: string;
  category?: string;
  author?: string;
  // Add other fields like publishDate if you display them for the series
}

// Re-using ProgramItem from ProgramModal for episodes/programs within a series

const formatDate = (dateString: string) => { // Keep if needed
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    console.error("Failed to format date:", dateString, e);
    return "Invalid Date";
  }
};

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";

export default function ProgramsClientPage() {
  const [programSeriesList, setProgramSeriesList] = useState<ProgramSeries[]>([]);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [errorSeries, setErrorSeries] = useState<string | null>(null);

  const [selectedProgramSeries, setSelectedProgramSeries] = useState<ProgramSeries | null>(null);
  const [selectedSeriesPrograms, setSelectedSeriesPrograms] = useState<ProgramItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProgramsInModal, setLoadingProgramsInModal] = useState(false);
  const [errorProgramsInModal, setErrorProgramsInModal] = useState<string | null>(null);

  // Fetch all program series
  useEffect(() => {
    const fetchProgramSeries = async () => {
      try {
        setLoadingSeries(true);
        setErrorSeries(null);
        const response = await fetch(`${API_BASE_URL}/program-series`); // Fetch series
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
          throw new Error(errorData.error || `Failed to fetch program series: ${response.statusText}`);
        }
        const result = await response.json();
        if (result.success) {
          setProgramSeriesList(result.data || []);
        } else {
          throw new Error(result.error || "Failed to parse program series data");
        }
      } catch (err: any) {
        console.error("Error fetching program series:", err);
        setErrorSeries(err.message || "An unknown error occurred while fetching series.");
      } finally {
        setLoadingSeries(false);
      }
    };
    fetchProgramSeries();
  }, []);

  // Function to fetch programs (items) for a selected series
  const fetchProgramsForSeries = async (seriesId: string) => {
    if (!seriesId) return;
    try {
      setLoadingProgramsInModal(true);
      setErrorProgramsInModal(null);
      setSelectedSeriesPrograms([]);
      // Use the new backend route: /api/programs/series/:seriesId
      const response = await fetch(`${API_BASE_URL}/programs/series/${seriesId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.error || `Failed to fetch programs for series: ${response.statusText}`);
      }
      const result = await response.json();
      if (result.success) {
        setSelectedSeriesPrograms(result.data || []);
      } else {
        throw new Error(result.error || "Failed to parse programs for series");
      }
    } catch (err: any) {
      console.error(`Error fetching programs for series ${seriesId}:`, err);
      setErrorProgramsInModal(err.message || "An unknown error occurred while fetching programs for modal.");
    } finally {
      setLoadingProgramsInModal(false);
    }
  };

  const handleOpenProgramModal = (series: ProgramSeries) => {
    setSelectedProgramSeries(series);
    setIsModalOpen(true);
    fetchProgramsForSeries(series._id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgramSeries(null);
    setSelectedSeriesPrograms([]);
    setErrorProgramsInModal(null);
  };

  return (
    <>
      <main className="min-h-screen bg-rose-50/30 pt-20">
        {/* Hero Section (Similar to original) */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-pink-50 opacity-70"></div>
          <div className="absolute inset-0 bg-[url('/programs/programs-pattern.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Physiotherapy Program Series</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Explore our curated series of expert-designed video programs to help you recover, strengthen, and improve your physical wellbeing.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="#program-series-list">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-medium flex items-center">
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Explore Program Series
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section (Can remain similar or be adapted) */}
        <section className="py-16 bg-white">
          {/* ... your existing "How It Works" section ... */}
           <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Choose & Purchase</h3>
              <p className="text-gray-600">
                Select a program from a series or an individual program that fits your needs and complete the purchase.
              </p>
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
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Receive on WhatsApp</h3>
              <p className="text-gray-600">
                The full program video(s) will be sent directly to your WhatsApp for easy access.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Follow Along</h3>
              <p className="text-gray-600">Follow the expert guidance in the video(s) at your own pace.</p>
            </motion.div>
          </div>
        </div>
        </section>

        {/* Program Series List Section */}
        <section id="program-series-list" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Program Series</h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Browse through our collections of specialized physiotherapy programs.
              </p>
            </motion.div>

            {loadingSeries && <p className="text-center text-lg text-gray-700 py-10">Loading program series...</p>}
            {errorSeries && <p className="text-center text-lg text-red-600 py-10">Error: {errorSeries}</p>}

            {!loadingSeries && !errorSeries && programSeriesList.length === 0 && (
              <div className="text-center text-gray-600 py-10">
                <Info size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-xl">No program series found at the moment.</p>
                <p>Please check back later!</p>
              </div>
            )}

            {!loadingSeries && !errorSeries && programSeriesList.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programSeriesList.map((series, index) => (
                  <motion.div
                    key={series._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden group"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <Image
                        src={series.coverImageUrl}
                        alt={series.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                        unoptimized={series.coverImageUrl?.includes("cloudinary")}
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 group-hover:text-pink-600 transition-colors">
                        {series.title}
                      </h3>
                      <p className="mb-4 font-normal text-gray-600 text-sm flex-grow line-clamp-3" title={series.description}>
                        {series.description}
                      </p>
                      {series.category && (
                         <p className="text-xs text-pink-600 font-medium mb-1">Category: {series.category}</p>
                      )}
                      {series.author && (
                         <p className="text-xs text-gray-500 font-medium mb-3">By: {series.author}</p>
                      )}
                      <Button
                        onClick={() => handleOpenProgramModal(series)}
                        className="w-full mt-auto bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white transition-all"
                        aria-label={`View programs in ${series.title}`}
                      >
                        <ListVideo className="mr-2 h-5 w-5" />
                        View Programs in this Series
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials & FAQ Sections (Can remain similar) */}
        {/* ... your existing Testimonials section ... */}
        {/* ... your existing FAQ section ... */}
          <section className="py-16 bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src="/indian-woman-professional-headshot.png" // Replace with actual or placeholder
                    alt="Priya Sharma"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Priya Sharma</h4>
                  <p className="text-gray-500 text-sm">Back Pain Relief Program</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "The back pain program has been a game-changer for me. After just two weeks of following the exercises,
                my chronic back pain has significantly reduced. The instructions are clear and easy to follow."
              </p>
            </motion.div>
            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src="/indian-man-headshot.png" // Replace with actual or placeholder
                    alt="Rahul Patel"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Rahul Patel</h4>
                  <p className="text-gray-500 text-sm">Office Worker Wellness Program</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "As someone who sits at a desk all day, this program has been invaluable. The exercises are quick but
                effective, and I've noticed a significant improvement in my posture and reduction in neck pain.
                Receiving it directly on WhatsApp makes it so convenient."
              </p>
            </motion.div>
            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src="/indian-yoga-instructor-headshot.png" // Replace with actual or placeholder
                    alt="Ananya Gupta"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Ananya Gupta</h4>
                  <p className="text-gray-500 text-sm">Post-Pregnancy Recovery</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "The post-pregnancy program helped me regain my strength safely. Dr. Yogita's guidance is clear and
                reassuring. I appreciate how the exercises gradually increase in intensity, making it perfect for new
                moms."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <FooterSection />
      </main>

      {selectedProgramSeries && (
        <ProgramModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          seriesTitle={selectedProgramSeries.title}
          programs={selectedSeriesPrograms} // Pass the fetched programs
          loading={loadingProgramsInModal}
          error={errorProgramsInModal}
          formatDate={formatDate} // Pass if used in modal
        />
      )}
    </>
  );
}
