// seeder.js
import connectDB from "./connectDB.js";
import seedVideos from "./utils/Videoseeder.js";
import mongoose from "mongoose";

const runSeeder = async () => {
  try {
    await connectDB();
    await seedVideos();
    console.log("✅ Seeding complete.");
  } catch (err) {
    console.error("❌ Error during seeding:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

runSeeder();
