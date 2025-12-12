import { Router } from 'express';
import { feedbackController } from '../controllers/feedbackController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { validateFeedbackCreation, validateFeedbackUpdate, validateFeedbackId } from '../validators/feedbackValidator';
import { USER_ROLES } from '../utils/constants';

const router = Router();

router.use(authenticate);

router.post('/',authenticate,authorize([USER_ROLES.Student,USER_ROLES.Teacher]), validateFeedbackCreation, feedbackController.createFeedback);
router.get('/session/:sessionId',authenticate,authorize([USER_ROLES.Admin]), feedbackController.getFeedbackBySession);
router.get('/:feedbackId',authenticate,authorize([USER_ROLES.Admin]), validateFeedbackId, feedbackController.getFeedbackById);
router.put('/:feedbackId',authenticate,authorize([USER_ROLES.Admin]), validateFeedbackId, validateFeedbackUpdate, feedbackController.updateFeedback);
router.delete('/:feedbackId',authenticate,authorize([USER_ROLES.Admin]), validateFeedbackId, feedbackController.deleteFeedback);
router.get('/giver/:giverId', authenticate,authorize([USER_ROLES.Admin]), feedbackController.getFeedbackByGiver);
router.get('/taker/:takerId',authenticate,authorize([USER_ROLES.Admin]), feedbackController.getFeedbackByTaker);
router.get('/stats/:userId',authenticate,authorize([USER_ROLES.Admin]), feedbackController.getFeedbackStats);
router.get('/rating/:userId',authenticate,authorize([USER_ROLES.Admin]), feedbackController.getAverageRating);

export default router;
