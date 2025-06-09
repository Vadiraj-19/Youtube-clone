// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/channels", channelRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ DB connected");
    app.listen(8080, () => console.log("🚀 Server running on 8080"));
  })
  .catch(err => console.error("❌ DB Connection Error:", err));
