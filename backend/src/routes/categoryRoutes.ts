import { Router } from 'express';
import { categoryController } from '../controllers/categoryController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { 
  validateCategoryCreation, 
  validateCategoryUpdate, 
  validateCategoryId 
} from '../validators/categoryValidator';
import { USER_ROLES } from '../utils/constants';

const router = Router();

// Public routes (no authentication required)
router.get('/getCategories', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/createcategory', authenticate, authorize([USER_ROLES.Admin]), validateCategoryCreation, categoryController.createCategory);
router.put('/updatecategory/:id', authenticate, authorize([USER_ROLES.Admin]), validateCategoryId, validateCategoryUpdate, categoryController.updateCategory);
router.delete('/deletecategory/:id', authenticate, authorize([USER_ROLES.Admin]), validateCategoryId, categoryController.deleteCategory);

export default router;