import { Router } from 'express';
import { quizController } from '../controllers/quizController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { USER_ROLES } from '../utils/constants';

const router = Router();

// Public routes (no authentication required)
router.get('/purchased', authenticate, quizController.getUserPurchasedQuizzes);
router.get('/', quizController.getAllQuizzes);
router.get('/:quizId', quizController.getQuizById);
router.get('/:quizId/stats', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), quizController.getQuizStats);
router.get('/chapter/:chapterId', quizController.getQuizzesByChapter);
router.get('/search', quizController.searchQuizzes);

router.post('/', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), quizController.createQuiz);
router.put('/:quizId', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), quizController.updateQuiz);
router.delete('/:quizId', authenticate, authorize([USER_ROLES.Admin]), quizController.deleteQuiz);

export default router;