import Channel from "../models/Channel.js";

export const createChannel = async (req, res) => {
  try {
    const existing = await Channel.findOne({ owner: req.userId });
    if (existing) return res.status(400).json({ message: "Channel already exists for this user." });

    const channel = await Channel.create({
      ...req.body,
      owner: req.userId,
    });

    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ message: "Error creating channel", error: err.message });
  }
};

export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: "Error fetching channel", error: err.message });
  }
};

export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.userId });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your channel", error: err.message });
  }
};




// controllers/videoController.js
