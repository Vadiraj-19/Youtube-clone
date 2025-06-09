import { useEffect, useState } from 'react';
import VideoCard from './VideoCard';

export default function RightSide() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/videos")
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error("Failed to fetch videos:", err));
  }, []);

  return (
    <aside className=" flex justify-center scrollbar-thin flex-wrap h-screen overflow-y-auto p-5 bg-[#111] border-1 border-gray-700 space-y-4">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </aside>
  );
}
