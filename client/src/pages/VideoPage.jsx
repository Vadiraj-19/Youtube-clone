import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import RightSide from "../components/RightSide";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function VideoPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [videoData, setVideoData] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(true);

  function handleSubscribe() {
    setIsSubscribed((prev) => !prev);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/videos/${id}`)
      .then((res) => setVideoData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=|\/embed\/)([\w-]{11})/);
    return match ? match[1] : "";
  };

  const likeOrDislike = (action) => {
    if (!user) return alert(`Sign in to ${action}.`);
    axios
      .put(
        `http://localhost:8080/api/videos/${id}/${action}`,
        { userId: user._id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => setVideoData(res.data));
  };

  const postComment = () => {
    if (!commentText.trim() || !user) return;
    axios
      .post(
        `http://localhost:8080/api/videos/${id}/comments`,
        {
          userId: user._id,
          username: user.username,
          text: commentText.trim(),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setVideoData(res.data);
        setCommentText("");
      });
  };

  const saveCommentEdit = () => {
    axios
      .put(
        `http://localhost:8080/api/videos/${id}/comments/${editingCommentId}`,
        {
          text: editingText,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setVideoData(res.data);
        setEditingCommentId(null);
        setEditingText("");
      });
  };

  const removeComment = (commentId) => {
    axios
      .delete(`http://localhost:8080/api/videos/${id}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setVideoData(res.data));
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!videoData) return <div className="text-white p-4">No data found.</div>;

  const {
    title,
    videoUrl,
    description,
    channelName,
    likes,
    dislikes,
    views,
    uploadDate,
    comments,
  } = videoData;

  const isYouTube =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  return (
    <div className="bg-black sm:w-screen w-screen text-white min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col xl:flex-row items-start gap-6 pt-4">
        {/* Main Video + Comments */}
        <div className="w-full xl:flex-1 max-w-full xl:max-w-[1100px] space-y-6">
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            {isYouTube ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(videoUrl)}`}
                className="w-full h-full"
                title={title}
                allowFullScreen
              />
            ) : (
              <video
                src={videoUrl}
                controls
                className="w-full h-full rounded-xl"
              />
            )}
          </div>

          <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>

          <div className="flex flex-col sm:flex-row sm:justify-flex items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center uppercase font-bold">
                {channelName?.[0]}
              </div>
              <div>
                <p className="font-medium">{channelName}</p>
                <p className="text-xs text-gray-400">
                  {formatDate(uploadDate)}
                </p>
              </div>
            </div>
            <button
              onClick={handleSubscribe}
              className="mt-4 sm:mt-0 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-300"
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 text-sm mt-3">
            <button
              onClick={() => likeOrDislike("like")}
              className="flex items-center gap-2 bg-[#272727] px-4 py-2 rounded-full"
            >
              <HandThumbUpIcon className="h-5 w-5" /> {likes}
            </button>
            <button
              onClick={() => likeOrDislike("dislike")}
              className="flex items-center gap-2 bg-[#272727] px-4 py-2 rounded-full"
            >
              <HandThumbDownIcon className="h-5 w-5" /> {dislikes}
            </button>
            <button className="flex items-center gap-2 bg-[#272727] px-4 py-2 rounded-full">
              <ShareIcon className="h-5 w-5" /> Share
            </button>
            <button className="flex items-center gap-2 bg-[#272727] px-4 py-2 rounded-full">
              <ArrowDownTrayIcon className="h-5 w-5" /> Download
            </button>
            <span className="text-gray-400 text-xs ml-auto">
              {views.toLocaleString()} views
            </span>
          </div>

          <div className="bg-[#1e1e1e] p-4 rounded-md text-sm whitespace-pre-line">
            {description}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">
              {comments.length} Comments
            </h2>

            {user ? (
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold uppercase">
                  {user.username[0]}
                </div>
                <div className="flex-1">
                  <textarea
                    className="w-full bg-transparent border-b border-gray-600 focus:outline-none resize-none"
                    placeholder="Add a comment..."
                    rows={2}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={postComment}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm mb-6">
                <Link to="/login" className="text-blue-400 underline">
                  Sign in
                </Link>{" "}
                to comment.
              </p>
            )}

            <div className="space-y-6">
              {[...comments].reverse().map((c) => (
                <div key={c._id} className="flex gap-4 text-sm">
                  <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center uppercase font-bold">
                    {c.username[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{c.username}</p>
                      <span className="text-xs text-gray-400">
                        {formatDate(c.date)}
                      </span>
                    </div>

                    {editingCommentId === c._id ? (
                      <>
                        <textarea
                          className="w-full bg-[#121212] border border-gray-700 p-2 rounded mt-2"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <button
                          onClick={saveCommentEdit}
                          className="mt-2 px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                      </>
                    ) : (
                      <p className="mt-1 text-gray-200">{c.text}</p>
                    )}

                    {user?._id === c.userId && editingCommentId !== c._id && (
                      <div className="text-xs mt-2 text-gray-400 flex gap-4">
                        <button
                          onClick={() => {
                            setEditingCommentId(c._id);
                            setEditingText(c.text);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeComment(c._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar – only visible on xl screens and wider */}
        <div className="hidden xl:block xl:w-[350px] shrink-0 mt-2">
          <RightSide />
        </div>
      </div>
    </div>
  );
}
