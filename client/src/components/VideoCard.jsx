import { Link } from "react-router-dom";
import timeAgo from "../Helper/CalculateTime";

const VideoCard = ({ video }) => {
  return (
    <div className="w-full text-white hover:bg-zinc-900 transition-all duration-200 rounded-2xl p-2">
      {/* Thumbnail */}
      <Link to={`/video/${video._id}`}>
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-zinc-800">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Info section */}
      <div className="flex pt-3 gap-3">
        {/* Avatar */}
        <Link to={`/channel/${video.channelId}`}>
          <div className="min-w-10 min-h-10 w-10 h-10 rounded-full overflow-hidden">
            <img
              src={`https://i.pravatar.cc/150?u=${video.uploader}`}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        {/* Text Info */}
        <div className="flex flex-col flex-1">
          <Link to={`/youtube/video/${video._id}`}>
            <p className="text-sm md:text-base font-semibold line-clamp-2 leading-snug hover:text-blue-400">
              {video.title}
            </p>
          </Link>
          <Link to={`/channel/${video.channelId}`}>
            <p className="text-gray-400 text-xs md:text-sm hover:text-white">
              {video.uploader}
            </p>
          </Link>
          <p className="text-gray-500 text-xs md:text-sm">
            {video.views.toLocaleString()} views • {timeAgo(video.uploadDate)}
          </p>
        </div>

        {/* More Options */}
        <div className="text-white self-start px-1">
          <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
