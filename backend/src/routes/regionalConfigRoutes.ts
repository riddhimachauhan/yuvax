import { Router } from 'express';
import { regionalConfigController } from '../controllers/regionalConfigController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import {
  validateCreateRegionalConfig,
  validateUpdateRegionalConfig,
  validateRegionalConfigId,
  validateCountryIdParam,
} from '../validators/regionalConfigValidator';
import { USER_ROLES } from '../utils/constants';

const router = Router();

// Public
router.get('/getAll', regionalConfigController.getAllConfigs);
router.get('/by-country/:countryId', validateCountryIdParam, regionalConfigController.getConfigByCountry);
router.get('/:configId', validateRegionalConfigId, regionalConfigController.getConfigById);

// Protected (Admin)
router.post(
  '/create',
  authenticate,
  authorize([USER_ROLES.Admin]),
  validateCreateRegionalConfig,
  regionalConfigController.createConfig
);

router.put(
  '/update/:configId',
  authenticate,
  authorize([USER_ROLES.Admin]),
  validateRegionalConfigId,
  validateUpdateRegionalConfig,
  regionalConfigController.updateConfig
);

router.delete(
  '/delete/:configId',
  authenticate,
  authorize([USER_ROLES.Admin]),
  validateRegionalConfigId,
  regionalConfigController.deleteConfig
);

export default router;
