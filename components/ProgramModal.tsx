"use client";
import { X, PlayCircle, Info, Clock as ClockIcon, Tag, DollarSign } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Define ProgramItem interface matching backend (especially videoUrl)
// This interface should be consistent with what your backend API for programs returns
export interface ProgramItem {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string; // URL for the program's preview image
  videoUrl?: string;     // Crucial: URL for the video file from Cloudinary
  price: number;         // Program price
  duration: string;      // e.g., "25 mins", "1 hour"
  episodeNumber?: number; // Optional: if programs are part of a sequence
  publishDate?: string;   // Optional: if you display it (e.g., "2023-10-26T00:00:00.000Z")
  slug?: string;          // Optional: if used for direct linking or other purposes
  programSeries?: string; // Optional: ID of the parent series
  // Add any other fields your backend provides and your modal might use
  // e.g., whatYouWillLearn: string[];
}

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  seriesTitle: string;        // Title of the parent series
  programs: ProgramItem[];    // Array of programs in the series
  loading: boolean;           // Loading state for fetching programs
  error: string | null;       // Error message if fetching programs fails
  formatDate: (dateString: string) => string; // Utility function to format dates
}

export function ProgramModal({
  isOpen,
  onClose,
  seriesTitle,
  programs,
  loading,
  error,
  formatDate, // Make sure this is passed from ProgramsClientPage
}: ProgramModalProps) {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); // For direct video element control

  // Effect to handle closing the video player if the modal itself is closed
  useEffect(() => {
    if (!isOpen) {
      setShowVideoPlayer(false);
      setActiveVideoUrl(null);
      if (videoRef.current) {
        videoRef.current.pause(); // Ensure video is paused
      }
    }
  }, [isOpen]);

  // Effect to handle 'Escape' key press for closing the video player
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showVideoPlayer) {
        closeVideoPlayer();
      }
    };
    if (showVideoPlayer) { // Only add listener if player is shown
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showVideoPlayer]); // Dependency on showVideoPlayer

  const handleWatchProgram = (program: ProgramItem) => {
    if (program.videoUrl) {
      setActiveVideoUrl(program.videoUrl);
      setShowVideoPlayer(true);
    } else {
      console.warn("No video URL found for this program:", program.title);
      // Optionally, show an alert to the user
      alert("Video for this program is not available at the moment.");
    }
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
    setActiveVideoUrl(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Optional: Reset video to start
    }
  };

  // Prevent rendering if the modal is not open
  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal for Listing Programs */}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity duration-300 ease-in-out"
        role="dialog"
        aria-modal="true"
        aria-labelledby="program-modal-title"
      >
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h3 id="program-modal-title" className="text-xl sm:text-2xl font-semibold text-pink-700">
              {seriesTitle} - Programs
            </h3>
            <button
              onClick={onClose} // This closes the main program list modal
              className="text-gray-400 hover:text-pink-600 transition-colors p-1 rounded-full -mr-1"
              aria-label="Close programs list modal"
            >
              <X size={28} />
            </button>
          </div>

          {/* Modal Content: Program List */}
          <div className="p-4 sm:p-6 overflow-y-auto styled-scrollbar"> {/* Ensure styled-scrollbar CSS is defined if used */}
            {loading && <p className="text-center text-gray-600 py-10">Loading programs...</p>}
            {error && <p className="text-center text-red-600 py-10">Error: {error}</p>}

            {!loading && !error && programs.length === 0 && (
              <div className="text-center text-gray-500 py-10 flex flex-col items-center">
                <Info size={36} className="mx-auto mb-3 text-gray-400" />
                <p className="text-lg">No programs available in this series yet.</p>
                <p className="text-sm">Please check back later.</p>
              </div>
            )}

            {!loading && !error && programs.length > 0 && (
              <ul className="space-y-5">
                {programs.map((program) => (
                  <li
                    key={program._id}
                    className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-5 p-4 border border-gray-200 rounded-lg hover:bg-pink-50/60 hover:shadow-md transition-all duration-200 group"
                  >
                    {/* Left: Thumbnail */}
                    <div className="relative w-full sm:w-44 sm:h-28 md:w-48 md:h-32 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
                      <Image
                        src={program.thumbnailUrl || "/placeholder-program.png"} // Ensure placeholder exists in /public
                        alt={program.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 192px" // sm:w-48
                      />
                    </div>

                    {/* Right: Details */}
                    <div className="flex-grow flex flex-col min-w-0">
                      {program.episodeNumber && (
                        <span className="text-xs text-pink-600 font-semibold tracking-wider uppercase mb-0.5">
                          PROGRAM {program.episodeNumber}
                        </span>
                      )}
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-pink-700 transition-colors mb-1 truncate" title={program.title}>
                        {program.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2 sm:line-clamp-3" title={program.description}>
                        {program.description}
                      </p>

                      {/* Meta Info & Action Button */}
                      <div className="mt-auto pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 gap-x-3">
                        <div className="text-xs text-gray-500 flex flex-wrap items-center gap-x-2 gap-y-1">
                          {program.duration && (
                            <span className="inline-flex items-center">
                              <ClockIcon size={14} className="mr-1 text-gray-400" /> {program.duration}
                            </span>
                          )}
                          {program.price > 0 && ( // Conditionally render price
                            <>
                              <span className="hidden sm:inline-block text-gray-300">|</span>
                              <span className="inline-flex items-center font-medium text-green-700 bg-green-100 px-1.5 py-0.5 rounded-sm">
                                <DollarSign size={12} className="mr-0.5" /> {program.price}
                              </span>
                            </>
                          )}
                           {program.publishDate && formatDate(program.publishDate) !== "N/A" && (
                            <>
                             <span className="hidden sm:inline-block text-gray-300">|</span>
                             <span>{formatDate(program.publishDate)}</span>
                            </>
                           )}
                        </div>
                        {program.videoUrl ? (
                          <button
                            onClick={() => handleWatchProgram(program)}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-3.5 py-2 text-xs sm:text-sm font-medium text-center text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 transition-colors shrink-0"
                            aria-label={`Watch program: ${program.title}`}
                          >
                            <PlayCircle className="mr-1.5 h-4 w-4" />
                            Watch Program
                          </button>
                        ) : (
                           <span className="w-full sm:w-auto text-center sm:text-right text-xs text-gray-400 italic px-3.5 py-2">Video coming soon</span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Video Player Overlay */}
      {showVideoPlayer && activeVideoUrl && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
          // backdrop-blur-sm // Optional: if you want a blurred background behind the player
        >
          <div className="relative w-full max-w-screen-lg aspect-video bg-black rounded-lg shadow-2xl overflow-hidden">
            <video
              ref={videoRef}
              src={activeVideoUrl}
              controls
              autoPlay
              playsInline // Important for iOS Safari for inline playback
              className="w-full h-full object-contain" // object-contain ensures video isn't cropped
              onEnded={closeVideoPlayer} // Optional: close player when video ends
              onError={(e) => {
                console.error("Video player error:", e);
                alert("Error playing video. It might be unavailable or in an unsupported format.");
                closeVideoPlayer(); // Close player on error
              }}
            >
              Your browser does not support the video tag.
            </video>
            <button
              onClick={closeVideoPlayer}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white bg-black/50 hover:bg-black/80 rounded-full p-1.5 sm:p-2 transition-colors z-10"
              aria-label="Close video player"
            >
              {/* Corrected: Removed smSize, using a single size prop */}
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Add some basic CSS for fadeIn animation in your global CSS file (e.g., globals.css):
/*
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
*/

// Ensure you have tailwindcss/line-clamp plugin for line-clamp utilities:
// In your terminal:
// npm install -D @tailwindcss/line-clamp
// or
// yarn add -D @tailwindcss/line-clamp

// Then add to your tailwind.config.js:
// module.exports = {
//   // ... other configurations
//   plugins: [
//     require('@tailwindcss/line-clamp'),
//   ],
// };