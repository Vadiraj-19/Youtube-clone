import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import FilterBar from "../components/FilterBar";
import axios from "axios";

function Home() {
  const { searchTerm } = useOutletContext();
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const url =
          activeCategory === "All"
            ? "http://localhost:8080/api/videos"
            : `http://localhost:8080/api/videos?category=${encodeURIComponent(
                activeCategory
              )}`;
        const res = await axios.get(url);
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, [activeCategory]);

  // Local search filter
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0F0F0F]">
      <div className="hidden sm:block mt-4 px-6">
        <FilterBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <div className="px-6 mt-4 py-4 grid gap-y-8 gap-x-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Home;
