// controllers/videoController.js
import Video from '../models/Video.js';

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

   

    video.title = req.body.title || video.title;
    video.description = req.body.desc || video.description;

    const updatedVideo = await video.save();
    res.status(200).json(updatedVideo);
  } catch (err) {
    res.status(500).json({ message: "Error updating video", error: err });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    
    

    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("Error deleting video:", err);
    res.status(500).json({ message: "Error deleting video", error: err.message });
  }
};




// Delete Video

// GET video by ID
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    video.views += 1;
    await video.save();

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// LIKE video
// export const likeVideo = async (req, res) => {
//   const video = await Video.findById(req.params.id);
//   const userId = req.body.userId;

//   if (!video.likes.includes(userId)) {
//     video.likes.push(userId);
//     video.dislikes = video.dislikes.filter(id => id != userId);
//   }

//   await video.save();
//   res.json(video);
// };

// // DISLIKE video
// export const dislikeVideo = async (req, res) => {
//   const video = await Video.findById(req.params.id);
//   const userId = req.body.userId;

//   if (!video.dislikes.includes(userId)) {
//     video.dislikes.push(userId);
//     video.likes = video.likes.filter(id => id != userId);
//   }

//   await video.save();
//   res.json(video);
// };

// LIKE video
export const likeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.likes += 1;
  await video.save();
  res.json(video);
};

// DISLIKE video
export const dislikeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.dislikes += 1;
  await video.save();
  res.json(video);
};


// COMMENT operations
export const addComment = async (req, res) => {
  const video = await Video.findById(req.params.id);
  const { userId, username, text } = req.body;
  video.comments.push({ userId, username, text });
  await video.save();
  res.json(video);
};

export const updateComment = async (req, res) => {
  const video = await Video.findById(req.params.id);
  const comment = video.comments.id(req.params.commentId);
  comment.text = req.body.text;
  await video.save();
  res.json(video);
};

export const deleteComment = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.comments = video.comments.filter(c => c._id != req.params.commentId);
  await video.save();
  res.json(video);
};

export const getVideosByChannel = async (req, res) => {
  try {
    const videos = await Video.find({ channel: req.params.channelId });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch channel videos' });
  }
};


export const getAllVideos = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== "All" ? { category } : {};
    const videos = await Video.find(query);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

