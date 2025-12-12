import { Router } from 'express';
import { courseController } from '../controllers/courseController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { USER_ROLES } from '../utils/constants';

const router = Router();

// Public routes (no authentication required)
router.get('/getPurchasedCourses', authenticate, courseController.getPurchasedCourses);
router.get('/', courseController.getCourses);
router.get('/:courseId', courseController.getCourseById);
router.get('/category/:categoryId', courseController.getCoursesByCategory);
router.post('/createcourse', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), courseController.createCourse);
router.put('/:courseId', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), courseController.updateCourse);
router.delete('/:courseId', authenticate, authorize([USER_ROLES.Admin]), courseController.deleteCourse);



export default router;