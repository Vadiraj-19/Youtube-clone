import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default: "https://ui-avatars.com/api/?name=User&background=random",
  },
});

export default mongoose.model("User", userSchema);
