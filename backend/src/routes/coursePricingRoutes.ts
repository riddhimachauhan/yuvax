import { Router } from 'express';
import { coursePricingController } from '../controllers/coursePricingController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import {
  validateCreateCoursePricing,
  validateUpdateCoursePricing,
  validateCoursePricingId,
} from '../validators/coursePricingValidator';
import { USER_ROLES } from '../utils/constants';

const router = Router();

// Public routes
router.get('/getPricing', coursePricingController.getAllPricing);
router.get('/:pricingId', validateCoursePricingId, coursePricingController.getPricingById);

// Protected routes (Admin/Teacher)
router.post(
  '/create',
  authenticate,
  authorize([USER_ROLES.Admin]),
  validateCreateCoursePricing, // body validation
  coursePricingController.createPricing
);

router.put(
  '/update/:pricingId',
  authenticate,
  authorize([USER_ROLES.Admin]),
  validateCoursePricingId, // validate ID in params
  validateUpdateCoursePricing, // body validation
  coursePricingController.updatePricing
);

router.patch(
  '/deactivate/:pricingId',
  authenticate,
  authorize([USER_ROLES.Admin]),
  validateCoursePricingId, // validate ID in params
  coursePricingController.deactivatePricing
);

export default router;
