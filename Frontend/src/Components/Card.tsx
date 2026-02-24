import { Tweet } from "react-tweet";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  id: string;
  onDelete: () => void;
}

const Card = ({ title, link, type, id, onDelete }: CardProps) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${title}"?`)) return;

    setDeleting(true);
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentid: id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      onDelete();
    } catch (error) {
      alert("Failed to delete content");
      setDeleting(false);
    }
  };

  // Extract Twitter ID from URL
  const twitterId = link.includes("/status/")
    ? link.split("/status/")[1]?.split("?")[0] || ""
    : "";

  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      if (url.includes("youtube.com/watch?v=")) {
        const videoId = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(link);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                {type === "youtube" ? "🎥 YouTube" : "🐦 Twitter"}
              </span>
            </div>
          </div>

          <div className="flex gap-1 ml-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Open link"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:opacity-50"
              title="Delete"
            >
              {deleting ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        {type === "youtube" && (
          <iframe
            className="w-full h-56"
            src={youtubeEmbedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && twitterId && (
          <div className="p-4">
            <Tweet id={twitterId} />
          </div>
        )}

        {type === "twitter" && !twitterId && (
          <div className="p-8 text-center text-gray-500">
            <p>Unable to preview Twitter post</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline text-sm mt-2 inline-block"
            >
              View on Twitter
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
