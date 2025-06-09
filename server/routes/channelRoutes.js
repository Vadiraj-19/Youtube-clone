import express from "express";
import {
  createChannel,
  getChannel,
  getMyChannel,
  
  
} from "../Controllers/channelController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createChannel);
router.get("/me", verifyToken, getMyChannel);

router.get("/:id", getChannel);


export default router;
