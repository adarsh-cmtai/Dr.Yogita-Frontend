// components/PodcastModal.tsx
"use client";
import { X, Youtube as YoutubeIcon } from "lucide-react"; // Added YoutubeIcon
import Image from "next/image";
import Link from "next/link";
import { PodcastEpisode } from "../app/podcast/PodcastClientPage"; // Assuming this path is correct

interface PodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  seriesTitle: string;
  episodes: PodcastEpisode[];
  loading: boolean;
  error: string | null;
  formatDate: (dateString: string) => string;
}

export function PodcastModal({
  isOpen,
  onClose,
  seriesTitle,
  episodes,
  loading,
  error,
  formatDate,
}: PodcastModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-pink-700">
            {seriesTitle} - Episodes
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-pink-600 transition-colors p-1 rounded-full -mr-1"
            aria-label="Close modal"
          >
            <X size={28} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto styled-scrollbar"> {/* Added styled-scrollbar if you have custom scrollbar styles */}
          {loading && <p className="text-center text-gray-600 py-10">Loading episodes...</p>}
          {error && <p className="text-center text-red-600 py-10">Error: {error}</p>}
          {!loading && !error && episodes.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No episodes available for this series yet. Check back soon!
            </p>
          )}

          {!loading && !error && episodes.length > 0 && (
            <ul className="space-y-5">
              {episodes.map((episode) => (
                <li 
                  key={episode._id} 
                  className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-5 p-4 border border-gray-200 rounded-lg hover:bg-pink-50 hover:shadow-md transition-all duration-200 group"
                >
                  {/* Left: Thumbnail */}
                  <div className="relative w-full sm:w-40 h-48 sm:h-auto sm:aspect-[16/10] flex-shrink-0 mb-3 sm:mb-0">
                    <Image
                      src={episode.thumbnailUrl || "/placeholder-podcast.png"} // Fallback image
                      alt={episode.title}
                      fill
                      className="rounded-md object-cover"
                      sizes="(max-width: 640px) 100vw, 160px" // Adjusted sizes
                    />
                  </div>

                  {/* Right: Details */}
                  <div className="flex-grow flex flex-col min-w-0"> {/* min-w-0 for proper truncation */}
                    <span className="text-xs text-pink-600 font-semibold tracking-wider uppercase">
                      EPISODE {episode.episodeNumber}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-pink-700 transition-colors mt-0.5 mb-1 truncate" title={episode.title}>
                      {episode.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2 sm:line-clamp-3" title={episode.description}>
                      {episode.description}
                    </p>
                    
                    <div className="mt-auto pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="text-xs text-gray-500">
                        <span>{formatDate(episode.publishDate)}</span>
                        <span className="mx-1.5">|</span>
                        <span>{episode.duration}</span>
                      </div>
                      <Link
                        href={episode.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-center text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 transition-colors shrink-0"
                      >
                        <YoutubeIcon className="mr-1.5 h-4 w-4" />
                        Watch
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}