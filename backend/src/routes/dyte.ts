import { Router } from "express";
import { startDyteClass, joinDyteClass } from "../controllers/dyteController";
import { authenticate,authorize } from "../middlewares/authMiddleware";
import { USER_ROLES } from "../utils/constants";

const router = Router();

router.post("/start/:sessionId", startDyteClass);
router.post("/join/:sessionId",joinDyteClass);

export default router;
