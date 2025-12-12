import express from "express";
import { getMeritHubToken } from "../lib/marithub";
import {
  addUserToMeritHub,
  scheduleMeritHubClass,
  joinMeritHubClass,
  handleMeritHubWebhook,
} from "../controllers/merithubController";
import { getUserClasses } from "../controllers/merithubController";
import { getTeacherClasses } from "../controllers/merithubController";

const router = express.Router();

// test route
router.get("/test", (req, res) => {
  res.json({ message: "MeritHub route working ✅" });
});

// generate token
router.get("/token", async (req, res) => {
  try {
    const token = await getMeritHubToken();
    res.json({ token });
  } catch (err: any) {
    console.error("❌ /merithub/token error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// add user to MeritHub
router.post("/user", addUserToMeritHub);

// schedule class
router.post("/schedule", scheduleMeritHubClass);

// join class
router.post("/join", joinMeritHubClass);

// webhook
router.post("/webhook", handleMeritHubWebhook);

router.get("/classes/:userId", getUserClasses);
router.get("/teacher-classes/:teacherId", getTeacherClasses);



export default router;
