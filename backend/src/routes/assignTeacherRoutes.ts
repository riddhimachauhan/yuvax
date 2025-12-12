import express from "express";
import { AssignTeacherController } from "../controllers/assignTeacherController";
import { assignTeacherValidator } from "../validators/assignTeacherValidators";

const router = express.Router();
const controller = new AssignTeacherController();

router.post("/assign-teacher", assignTeacherValidator, controller.assignTeacher.bind(controller));
router.get("/teacher/:teacher_id/courses", controller.getCoursesByTeacher.bind(controller));


export default router;
