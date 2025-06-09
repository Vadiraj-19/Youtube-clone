import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch video data to pre-fill form
    axios
      .get(`http://localhost:8080/api/videos/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load video.");
        setLoading(false);
      });
  }, [id]);

 const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put(
      `http://localhost:8080/api/videos/edit/${id}`,
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    alert("Video updated successfully!");
    navigate(-1);
  } catch (err) {
    alert("Update failed: " + (err.response?.data?.message || "Unknown error"));
    console.log(err);
  }
};


  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-black text-white">
      <form
        onSubmit={handleUpdate}
        className="bg-white text-black w-full max-w-md p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Video</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-blue-600 font-medium hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
