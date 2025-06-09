 import express from "express";
import {
  getVideo,
  getAllVideos,
  updateVideo,
  deleteVideo,
likeVideo,
dislikeVideo,
  addComment,
  updateComment,
  deleteComment
} from '../Controllers/videoController.js';
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

// ✅ Get all videos (supports ?category=)
router.get('/', getAllVideos);
router.put("/edit/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);


// ✅ Get single video by ID
router.get('/:id', getVideo);

// ✅ Like & Dislike
router.put('/:id/like', likeVideo);
router.put('/:id/dislike', dislikeVideo);

// ✅ Comment CRUD
router.post("/:id/comments", verifyToken, addComment);
+router.put("/:id/comments/:commentId", verifyToken, updateComment);
+router.delete("/:id/comments/:commentId", verifyToken, deleteComment);

export default router;
