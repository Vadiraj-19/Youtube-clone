import express from "express";
import { register, login } from "../Controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Authenticated route to get current user info
router.get("/me", verifyToken, async (req, res) => {
  console.log("➡️ Authorization Header:", req.headers.authorization); // <== Add this
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).json("Server error");
  }
});

export default router;
