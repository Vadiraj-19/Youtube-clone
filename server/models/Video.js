import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  text: String,
});

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl:String,
  channelName: String,
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
  views: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  category: String,
  likes: { type: Number, default: 0 },     // changed from array to number
  dislikes: { type: Number, default: 0 },  // changed from array to number
  comments: [commentSchema],
});

export default mongoose.model("Video", videoSchema);
