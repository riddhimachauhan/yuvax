import express from "express";
import { createSlots, listSlots, reserveAndConfirmDemo,getStudentDemoSchedule, getTeacherOpenSlots} from "../controllers/slotsController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { USER_ROLES } from "../utils/constants";

const router = express.Router();

router.post("/create",createSlots);
router.get("/getavailableslots",listSlots);
router.post('/:id/reserve', reserveAndConfirmDemo);
router.get('/getsession/:userId',getStudentDemoSchedule);
router.get('/studentschedule/:userId', getStudentDemoSchedule);
router.get("/:teacherId/slots", authenticate, getTeacherOpenSlots);



export default router;