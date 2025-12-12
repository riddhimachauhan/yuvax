import { Router } from "express";
import { dashboardController } from "../controllers/dashboardController";
import { authenticate,authorize } from '../middlewares/authMiddleware';
import { USER_ROLES } from "../utils/constants";

const router = Router();

router.get('/overview', authenticate, dashboardController.getOverview);
router.get('/quiz-stats', authenticate, dashboardController.getQuizStats);
router.get('/attendance-stats', authenticate, dashboardController.getAttendanceStats);
router.get('/enrollment-stats', authenticate, dashboardController.getEnrollmentStats);
router.get('/study-time', authenticate, dashboardController.getStudyTime);
router.get('/submission-stats', authenticate, dashboardController.getSubmissionStats);
router.get('/notifications-count', authenticate, dashboardController.getNotificationsCount);
router.get('/streak-xp', authenticate, dashboardController.getStreakAndXp);
router.get('/student-courses', authenticate, dashboardController.getStudentCourses);
router.get('/student-courses/:userId', dashboardController.getStudentCoursesByUserId);
router.post('/invalidate-cache', authenticate, authorize([USER_ROLES.Admin]), dashboardController.invalidateCache);

export default router;