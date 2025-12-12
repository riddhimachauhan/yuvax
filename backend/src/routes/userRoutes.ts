import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { validateUserUpdate } from '../validators/userValidator';
import { USER_ROLES } from '../utils/constants';

const router = Router();

// Apply authentication middleware to all routes
// router.use(authenticate);

// Admin only routes
router.get('/',userController.getAllUsers);
router.get('/role/:role',authenticate, authorize([USER_ROLES.Admin]), userController.getUsersByRole);
router.delete('/deleteuser/:id',authenticate, authorize([USER_ROLES.Admin]), userController.deleteUser);
router.put('/updateuser/:id', authenticate, authorize([USER_ROLES.Admin]),validateUserUpdate, userController.updateUser);

// Public user routes (authenticated users can access their own data)

export default router;
