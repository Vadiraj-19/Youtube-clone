import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [handle, setHandle] = useState("");
  const [channelBannerUrl, setChannelBannerUrl] = useState(""); // new state
  const [channelLogo ,setChannelLogo]=useState("")
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/channels", {
        channelName,
        description: handle,
        channelLogo,
        channelBanner: channelBannerUrl, // use pasted URL
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Channel created!");
      navigate("/");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex items-center w-screen justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black w-full max-w-md rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-6">How you'll appear</h2>

        {/* Profile image preview */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-300 mb-2 flex items-center justify-center overflow-hidden">
            <span className="text-gray-500 text-3xl">👤</span>
          </div>
        </div>

        {/* Name input */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Handle input */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Handle</label>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* New: Channel banner URL input */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Channel Banner Image URL</label>
          <input
            type="url"
            value={channelBannerUrl}
            onChange={(e) => setChannelBannerUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1">Channel Logo URL</label>
          <input
            type="url"
            value={channelLogo}
            onChange={(e) => setChannelLogo(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <p className="text-xs text-gray-500 mb-6">
          By clicking Create Channel you agree to YouTube’s{" "}
          <a href="#" className="text-blue-600 underline">Terms of Service</a>.
          Changes made to your name and profile picture are visible only on YouTube and not other Google services.{" "}
          <a href="#" className="text-blue-600 underline">Learn more</a>
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-600 font-medium hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create channel
          </button>
        </div>
      </form>
    </div>
  );
}
