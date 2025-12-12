import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';
import {
  validateUserLogin,
  validateUserRegistration,
  validatePasswordReset,
} from '../validators/userValidator';

const router = Router();

// Public routes
router.post('/login', validateUserLogin, authController.login);
router.post('/signup', validateUserRegistration, authController.register);
router.post('/forgot-password', validatePasswordReset, authController.forgotPassword);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authenticate, authController.logout);
router.get('/me', authenticate, authController.getProfile);

router.get('/profile', authenticate, authController.getProfile);
router.post('/reset-password', authenticate, authController.changePassword);

export default router;