import { Router } from 'express';
import { assignmentController } from '../controllers/assignmentController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { USER_ROLES } from '../utils/constants';

const router = Router();

// Apply authentication middleware to all routes
// router.use(authenticate);

// Teacher and Admin routes
// Create
router.post('/createassignment', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), assignmentController.createAssignment);
router.get('/getallassignment',  assignmentController.getAllAssignments);
router.get('/course/:course_id',  assignmentController.getAssignments); // public view could be allowed but require auth per comment
router.get('/module/:moduleId', assignmentController.getAssignmentsByModule);
router.get('/creator/:creatorId', assignmentController.getAssignmentsByCreator);
router.get('/:assignmentId/stats', assignmentController.getAssignmentStats);
router.put('/updateassignment/:assignmentId', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), assignmentController.updateAssignment);
router.delete('/deleteassignment/:assignmentId', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), assignmentController.deleteAssignment);
router.get('/:assignmentId', assignmentController.getAssignmentById);

export default router;