import { Router } from 'express';
import { sessionController } from '../controllers/sessionController';
import { validateGetSessionsByTeacher } from '../validators/sessionValidator';
import { authenticate } from '../middlewares/authMiddleware';

// import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// public or protected depending on your auth rules
router.get('/:teacherId/sessions', validateGetSessionsByTeacher, sessionController.getSessionsByTeacher);


export default router; 
