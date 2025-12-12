import { Router } from 'express';
import { questionController } from '../controllers/questionController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { USER_ROLES } from '../utils/constants';

const router = Router();


router.get('/getAllQuestions', questionController.getAllQuestions);
router.get('/:questionId', questionController.getQuestionById);
router.get('/:questionId/stats', questionController.getQuestionStats);
router.get('/quiz/:quizId', questionController.getQuestionsByQuiz);
router.get('/search', questionController.searchQuestions);
router.post('/createQuestion', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), questionController.createQuestion);
router.put('/:questionId', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), questionController.updateQuestion);
router.delete('/:questionId', authenticate, authorize([USER_ROLES.Admin]), questionController.deleteQuestion);

export default router;