import express from 'express'

import {
  submitAssignment,
  getSubmissions,
  gradeSubmission,
  deleteSubmission,
} from '../controllers/submissionController'
import { authenticate,authorize } from '../middlewares/authMiddleware';
import { USER_ROLES } from '../utils/constants';

const router = express.Router()

// ✅ Submission routes with meaningful names
router.post('/submit', authenticate, authorize([USER_ROLES.Student]), submitAssignment);
router.get('/assignment/:assignment_id', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), getSubmissions);
router.put('/:submission_id/grade', authenticate, authorize([USER_ROLES.Teacher]), gradeSubmission);
router.delete('/:submission_id/delete', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]),deleteSubmission);

export default router
