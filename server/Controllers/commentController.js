import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId }).populate("user", "username");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to get comments" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const videoId = req.params.videoId;
    const userId = req.user.id;

    const comment = await Comment.create({
      text,
      video: videoId,
      user: userId,
    });

    await Video.findByIdAndUpdate(videoId, {
      $push: { comments: comment._id },
    });

    const populatedComment = await comment.populate("user", "username");
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { videoId, commentId } = req.params;

    await Comment.findByIdAndDelete(commentId);
    await Video.findByIdAndUpdate(videoId, {
      $pull: { comments: commentId },
    });

    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const updated = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    ).populate("user", "username");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update comment" });
  }
};
