import { Router } from 'express';
import { moduleController } from '../controllers/modulesController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { USER_ROLES } from '../utils/constants';

const router = Router();

// Public routes (no authentication required)
router.get('/getmodules', moduleController.getAllModules);
router.get('/:module_id', moduleController.getModuleById);
router.get('/:moduleId/stats', moduleController.getModuleStats);
router.get('/course/:courseId', moduleController.getModulesByCourse);
router.get('/search', moduleController.searchModules);
router.post('/createmodules', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), moduleController.createModule);
router.put('/updatemodule/:module_id', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), moduleController.updateModule);
router.delete('/deletemodule/:module_id', authenticate, authorize([USER_ROLES.Admin, USER_ROLES.Teacher]), moduleController.deleteModule);

export default router;