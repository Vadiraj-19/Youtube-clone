// utils/Videoseeder.js
import Video from "../models/Video.js";
import User from "../models/User.js";
import sampleVideos from "./videos.js";
import bcrypt from "bcryptjs";

async function seedVideos() {
  try {
    let user = await User.findOne();

    if (!user) {
      console.log("⚠️ No user found. Creating dummy user...");
      const hashedPassword = await bcrypt.hash("password123", 10);
      user = new User({
        username: "dummyuser",
        email: "dummy@example.com",
        password: hashedPassword,
      });
      await user.save();
      console.log("✅ Dummy user created.");
    }

    const videosWithOwner = sampleVideos.map((video, index) => ({
      ...video,
      owner: user._id,
      videoId: video.videoId || `vid_${Date.now()}_${index}`,
      likes: video.likes,
      dislikes: video.dislikes,
      comments: [],
    }));

    await Video.deleteMany();
    await Video.insertMany(videosWithOwner);

    console.log("✅ Videos seeded successfully.");
  } catch (err) {
    console.error("❌ Failed to seed videos:", err.message);
  }
}

export default seedVideos;
