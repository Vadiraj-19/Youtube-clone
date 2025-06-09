// routes/commentRoutes.js
import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
  updateComment,
} from "../Controllers/commentController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Nested under /api/videos/:videoId/comments in videoRoutes
router.get("/", getComments); // /api/videos/:videoId/comments
router.post("/", verifyToken, addComment); // /api/videos/:videoId/comments
router.put("/:commentId", verifyToken, updateComment); // /api/videos/:videoId/comments/:commentId
router.delete("/:commentId", verifyToken, deleteComment); // /api/videos/:videoId/comments/:commentId

export default router;
