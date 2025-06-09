
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
  { id: newUser._id, channelName: newUser.username },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


    // Send token
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json("User not found");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, username: user.username });
}