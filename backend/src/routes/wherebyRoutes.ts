// src/routes/wherebyRoutes.ts
import express from "express";
import { wherebyController } from "../controllers/wherebyController";

const router = express.Router();

router.post("/schedule", wherebyController.scheduleWherebyClass);
router.post("/join", wherebyController.joinWherebyClass);
router.get("/classes/:userId", wherebyController.getUserClasses);
router.get("/teacher-classes/:teacherId", wherebyController.getTeacherClasses);
router.post("/reset-whiteboard/:sessionId", wherebyController.resetWhiteboard);

export default router;
