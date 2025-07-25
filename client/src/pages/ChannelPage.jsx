import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import logo from "../images/logo.png";

export default function ChannelPage() {
  const { id } = useParams();
  const { user, channelName } = useAuth();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("latest");
  const [isSubscribed, setIsSubscribed] = useState(true);

  function handleSubscribe() {
    setIsSubscribed((prev) => !prev);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/channels/${id}`)
      .then((res) => {
        setChannel(res.data);
        return axios.get(`http://localhost:8080/api/videos?channelId=${id}`);
      })
      .then((res) => setVideos(res.data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleDelete = (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    axios
      .delete(`http://localhost:8080/api/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setVideos((prev) => prev.filter((v) => v._id !== videoId));
      })
      .catch((err) => {
        console.log(err);
        alert("Delete failed.");
      });
  };

  const getTimeAgo = (date) => {
    const diff = Date.now() - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  const filteredVideos = videos.filter((v) => v.channelName === channel?.channelName);

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!channel) return <div className="text-white p-4">Loading channel...</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Banner */}
      <div
        className="w-full sm:h-[300px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${channel.channelBanner})` }}
      />

      {/* Channel Header */}
      <div className="px-6 py-4 flex flex-col font-Roboto gap-4 sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-start sm:items-center space-x-4">
          <img
            src={channel.channelLogo || logo}
            alt="Channel Logo"
            className="rounded-full w-52 h-52 object-cover object-center"
          />
          <div>
            <h1 className="text-5xl font-bold">{channel.channelName}</h1>
            <p className="text-gray-400 text-xl">
              <span className="text-2xl font-semibold text-gray-200">
                @{channel.channelName}
              </span>{" "}
              • {channel.subscribers} subscribers • {filteredVideos.length} videos
            </p>
            <p className="text-gray-400 text-xl">
              {filteredVideos[0]?.description} <span className="text-white">... more</span>
            </p>
            <h1 className="text-blue-500 text-md">
              {filteredVideos[0]?.videoUrl}
            </h1>
            <button
              onClick={handleSubscribe}
              className="mt-8 sm:mt-0 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-300"
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      {/* Channel Tabs */}
      <div className="px-6 flex space-x-6 text-sm font-medium border-b border-gray-700 mt-2">
        {[
          "Home",
          "Videos",
          "Shorts",
          "Live",
          "Podcasts",
          "Courses",
          "Playlists",
          "Posts",
          "Store",
        ].map((tab) => (
          <button
            key={tab}
            className={`pb-3 ${
              tab === "Videos" ? "border-b-2 border-white" : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="px-6 py-4 flex space-x-3 text-sm">
        {["latest", "popular", "oldest"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`capitalize px-3 py-1 rounded-full border ${
              filter === type
                ? "bg-white text-black"
                : "text-gray-400 border-gray-600"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Videos Grid or Empty State */}
      {filteredVideos.length > 0 ? (
        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-12">
          {filteredVideos.map((video) => (
            <div key={video._id} className="text-sm">
              <Link to={`/video/${video._id}`}>
                <img
                  src={video.thumbnailUrl || "/placeholder.png"}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <p className="font-semibold mt-2 line-clamp-2">{video.title}</p>
                <p className="text-gray-400 text-xs">
                  {video.views || 0} views • {getTimeAgo(video.uploadDate)}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  By {video.channelName || "Unknown"}
                </p>
              </Link>
              {channelName === video.channelName && (
                <div className="flex justify-end gap-3 text-xs text-gray-400 mt-1">
                  <button
                    className="hover:text-blue-400"
                    onClick={() => navigate(`/edit/${video._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="hover:text-red-500"
                    onClick={() => handleDelete(video._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 py-12 min-h-[200px] flex flex-col items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mb-3 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 0a9 9 0 100-4.001M9 10v4"
            />
          </svg>
          <p className="text-sm">No videos uploaded yet.</p>
        </div>
      )}
    </div>
  );
}
