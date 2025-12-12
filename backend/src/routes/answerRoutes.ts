import { Router } from 'express';
import { answerController } from '../controllers/answerController';
import { validateAnswerCreation,validateAnswerId,validateAnswerUpdate } from '../validators/answerValidator';
import { authenticate,authorize } from '../middlewares/authMiddleware';
import { USER_ROLES } from '../utils/constants';

const router = Router();

router.post("/createAnswer", authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher, USER_ROLES.Student]), validateAnswerCreation, answerController.createAnswer);
router.get("/getAnswer/:id", validateAnswerId, answerController.getAnswerById);
router.put("/updateAnswer/:id", authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), validateAnswerId, validateAnswerUpdate, answerController.updateAnswer);
router.delete("/deleteAnswer/:id", authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), validateAnswerId, answerController.deleteAnswer);

export default router;
