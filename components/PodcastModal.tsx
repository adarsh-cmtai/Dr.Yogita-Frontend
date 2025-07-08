"use client";
import { useState, useEffect } from "react";
import { X, Loader, AlertTriangle, PlayCircle, Youtube as YoutubeIcon } from "lucide-react";
import Image from "next/image";
import { PodcastEpisode } from "../app/podcast/PodcastClientPage"; // Adjust path if necessary

interface PodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  seriesTitle: string;
  episodes: PodcastEpisode[];
  loading: boolean;
  error: string | null;
  formatDate: (dateString: string) => string;
}

const getYouTubeEmbedUrl = (youtubeLink: string) => {
  if (!youtubeLink) return null;
  let videoId = null;
  try {
    const url = new URL(youtubeLink);
    if (url.hostname === "youtu.be") {
      videoId = url.pathname.slice(1);
    } else if (url.hostname.includes("youtube.com") && url.searchParams.has("v")) {
      videoId = url.searchParams.get("v");
    }
  } catch (error) {
    console.error("Invalid YouTube URL provided:", youtubeLink);
    return null;
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
};

export function PodcastModal({
  isOpen,
  onClose,
  seriesTitle,
  episodes,
  loading,
  error,
  formatDate,
}: PodcastModalProps) {
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null);

  useEffect(() => {
    if (episodes.length > 0 && !activeEpisode) {
      setActiveEpisode(episodes[0]);
    } else if (!episodes.length) {
      setActiveEpisode(null);
    }
  }, [episodes, activeEpisode]);
  
  // Reset active episode when modal is closed or episodes change
  useEffect(() => {
    if (!isOpen) {
      setActiveEpisode(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const activeEmbedUrl = activeEpisode ? getYouTubeEmbedUrl(activeEpisode.youtubeLink) : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-4xl h-full max-h-[95vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h3 className="text-xl font-semibold text-pink-700 truncate pr-4">
            {seriesTitle}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-pink-600 transition-colors p-1 rounded-full shrink-0"
            aria-label="Close modal"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-grow min-h-0">
          <div className="w-full md:w-3/5 flex flex-col bg-white">
            <div className="relative w-full bg-black aspect-video">
              {activeEmbedUrl ? (
                <iframe
                  key={activeEpisode?._id}
                  width="100%"
                  height="100%"
                  src={activeEmbedUrl}
                  title={activeEpisode?.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-900">
                  <YoutubeIcon size={64} />
                </div>
              )}
            </div>
            <div className="p-4 overflow-y-auto">
              <span className="text-xs text-pink-600 font-semibold tracking-wider uppercase">
                {activeEpisode ? `EPISODE ${activeEpisode.episodeNumber}` : " "}
              </span>
              <h4 className="text-xl font-bold text-gray-900 mt-1 mb-2">
                {activeEpisode?.title || "Select an episode to play"}
              </h4>
              <p className="text-sm text-gray-700 line-clamp-4">
                {activeEpisode?.description}
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-2/5 flex flex-col border-t md:border-t-0 md:border-l border-gray-200">
            <div className="p-4 border-b border-gray-200">
                <h4 className="text-lg font-bold text-gray-800">Episodes ({episodes.length})</h4>
            </div>
            <div className="overflow-y-auto flex-grow">
              {loading && (
                <div className="flex justify-center items-center h-full p-4">
                    <Loader className="animate-spin text-pink-600" size={32} />
                </div>
              )}
              {error && (
                <div className="flex flex-col text-center justify-center items-center h-full p-4">
                  <AlertTriangle className="text-red-500 mb-2" size={32} />
                  <p className="font-semibold text-red-600">Error: {error}</p>
                </div>
              )}
              {!loading && !error && (
                <ul className="divide-y divide-gray-200">
                  {episodes.map((episode) => (
                    <li key={episode._id}>
                      <button
                        onClick={() => setActiveEpisode(episode)}
                        className={`w-full text-left p-3 flex items-start gap-3 transition-colors duration-200 ${activeEpisode?._id === episode._id ? "bg-pink-50" : "hover:bg-gray-100"}`}
                      >
                        <div className="relative w-24 h-16 flex-shrink-0">
                          <Image
                            src={episode.thumbnailUrl || "/placeholder-podcast.png"}
                            alt={episode.title}
                            fill
                            className="rounded-md object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <PlayCircle size={24} className={`transition-all ${activeEpisode?._id === episode._id ? "text-pink-500" : "text-white/80"}`} />
                          </div>
                        </div>
                        <div className="flex-grow min-w-0">
                          <h5 className={`font-semibold truncate ${activeEpisode?._id === episode._id ? "text-pink-700" : "text-gray-800"}`}>
                            {episode.title}
                          </h5>
                          <div className="text-xs text-gray-500 mt-1">
                            {/* <span>{formatDate(episode.publishDate)}</span> */}
                            <span className="mx-1.5">|</span>
                            <span>{episode.duration}</span>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
