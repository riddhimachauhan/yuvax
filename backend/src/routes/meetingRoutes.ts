import express from "express";
import { createMeeting, getMeetingDetails, joinMeeting, testConnection, testCreateMeeting } from "../controllers/meeting.controller";


const router = express.Router();

// Routes mapping controller functions
router.post("/create", createMeeting);
router.post("/join/:meetingId", joinMeeting);
router.get("/:meetingId", getMeetingDetails);
router.post("/test-create", testCreateMeeting);
router.get("/test/connection", testConnection);

export default router;
