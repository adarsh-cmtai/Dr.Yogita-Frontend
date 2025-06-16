// frontend/app/podcasts/PodcastClientPage.tsx (or your actual path)
"use client";
import { motion } from "framer-motion";
import { ListVideo, Calendar, Clock, Info, PlayCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming you have this
import FooterSection from "@/components/footer-section"; // Assuming you have this
import { useEffect, useState } from "react";
import Link from "next/link";
import { PodcastModal } from "@/components/PodcastModal"; // Path to your Modal component

// Define interfaces for the data structures
interface PodcastSeries {
  _id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  slug?: string; // Optional for now, but good for future routing
  category?: string;
  author?: string;
}

export interface PodcastEpisode { // Export if Modal is in a separate file
  _id: string;
  podcastSeries: string; // ID of the parent series
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeLink: string;
  publishDate: string;
  duration: string;
  episodeNumber: number;
}

const formatDate = (dateString: string) => {
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

export default function PodcastClientPage() {
  const [podcastSeriesList, setPodcastSeriesList] = useState<PodcastSeries[]>([]);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [errorSeries, setErrorSeries] = useState<string | null>(null);

  const [selectedPodcastSeries, setSelectedPodcastSeries] = useState<PodcastSeries | null>(null);
  const [selectedSeriesEpisodes, setSelectedSeriesEpisodes] = useState<PodcastEpisode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [errorEpisodes, setErrorEpisodes] = useState<string | null>(null);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";

  // Fetch all podcast series
  useEffect(() => {
    const fetchPodcastSeries = async () => {
      try {
        setLoadingSeries(true);
        setErrorSeries(null);
        const response = await fetch(`${API_URL}/podcast-series`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
          throw new Error(errorData.error || `Failed to fetch podcast series: ${response.statusText}`);
        }
        const result = await response.json();
        setPodcastSeriesList(result.data || []);
      } catch (err: any) {
        console.error("Error fetching podcast series:", err);
        setErrorSeries(err.message || "An unknown error occurred while fetching series.");
      } finally {
        setLoadingSeries(false);
      }
    };
    fetchPodcastSeries();
  }, [API_URL]);

  // Function to fetch episodes for a selected series
  const fetchEpisodesForSeries = async (seriesId: string) => {
    if (!seriesId) return;
    try {
      setLoadingEpisodes(true);
      setErrorEpisodes(null);
      setSelectedSeriesEpisodes([]); // Clear previous episodes
      const response = await fetch(`${API_URL}/podcast-episodes/series/${seriesId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.error || `Failed to fetch episodes: ${response.statusText}`);
      }
      const result = await response.json();
      setSelectedSeriesEpisodes(result.data || []);
    } catch (err: any) {
      console.error(`Error fetching episodes for series ${seriesId}:`, err);
      setErrorEpisodes(err.message || "An unknown error occurred while fetching episodes.");
    } finally {
      setLoadingEpisodes(false);
    }
  };

  const handleOpenPlaylistModal = (series: PodcastSeries) => {
    setSelectedPodcastSeries(series);
    setIsModalOpen(true);
    fetchEpisodesForSeries(series._id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPodcastSeries(null);
    setSelectedSeriesEpisodes([]);
    setErrorEpisodes(null);
  };

  return (
    <>
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 bg-gray-50 min-h-screen">
        {/* Hero Section - remains similar */}
        <section className="relative h-[60vh] sm:h-screen w-full group">
          <Image 
            src="/podcast image.jpg" // Replace with a dynamic or general podcast hero image
            alt="The Dr. Yogita Show - General Podcast Cover" 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
          <div className="absolute bottom-10 md:bottom-20 left-10 md:left-20 z-10 p-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Discover Our Podcasts
            </h1>
            <p className="text-md sm:text-lg text-gray-200 mt-2 drop-shadow-md max-w-xl">
              Tune in for insightful discussions on physiotherapy, wellness, health, and more.
            </p>
          </div>
        </section>

        <section className="container mx-auto mt-12 mb-24 px-4">
          <h2 className="mb-10 text-3xl font-semibold text-center text-gray-800">
            Our Podcast Shows
          </h2>

          {loadingSeries && <p className="text-center text-gray-600 py-10">Loading podcast shows...</p>}
          {errorSeries && <p className="text-center text-red-500 py-10">Error: {errorSeries}</p>}

          {!loadingSeries && !errorSeries && podcastSeriesList.length === 0 && (
            <div className="text-center text-gray-600 py-10">
              <Info size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-xl">No podcast shows found at the moment.</p>
              <p>Please check back later!</p>
            </div>
          )}

          {!loadingSeries && !errorSeries && podcastSeriesList.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {podcastSeriesList.map((series) => (
                <div 
                  key={series._id} 
                  className="rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden group"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={series.coverImageUrl}
                      alt={series.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                      {series.title}
                    </h3>
                    <p className="mb-4 font-normal text-gray-600 text-sm flex-grow line-clamp-3" title={series.description}>
                      {series.description}
                    </p>
                    {series.category && (
                       <p className="text-xs text-blue-600 font-medium mb-1">Category: {series.category}</p>
                    )}
                    {series.author && (
                       <p className="text-xs text-gray-500 font-medium mb-3">By: {series.author}</p>
                    )}
                    <Button 
                      onClick={() => handleOpenPlaylistModal(series)}
                      className="w-full mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all"
                      aria-label={`View episodes for ${series.title}`}
                    >
                      <ListVideo className="mr-2 h-5 w-5" />
                      View Episodes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <FooterSection />
      </motion.main>

      {selectedPodcastSeries && (
        <PodcastModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          seriesTitle={selectedPodcastSeries.title}
          episodes={selectedSeriesEpisodes}
          loading={loadingEpisodes}
          error={errorEpisodes}
          formatDate={formatDate}
        />
      )}
    </>
  );
}