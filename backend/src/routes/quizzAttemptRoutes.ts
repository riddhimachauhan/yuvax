
import { Router } from 'express';
import { quizAttemptController } from '../controllers/quizAttemptController';
import { 
  validateQuizAttemptCreation, 
  validateQuizAttemptUpdate, 
  validateQuizAttemptId, 
  validateQuizIdParam, 
  validateStudentIdParam 
} from '../validators/quizAttemptValidator';

import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/createQuizAttempt', authenticate, validateQuizAttemptCreation, quizAttemptController.createQuizAttempt);
router.get('/getQuizAttempt/:id', validateQuizAttemptId, quizAttemptController.getQuizAttemptById);
router.put('/updateQuizAttempt/:id', authenticate, validateQuizAttemptId, validateQuizAttemptUpdate, quizAttemptController.updateQuizAttempt);
router.delete('/deleteQuizAttempt/:id', authenticate, validateQuizAttemptId, quizAttemptController.deleteQuizAttempt);
router.get('/getUsersByQuizId/:quiz_id', validateQuizIdParam, quizAttemptController.getUsersByQuizId);
router.get('/getAttemptsByStudentId/:student_id', validateStudentIdParam, quizAttemptController.getAttemptsByStudentId);

export default router;
