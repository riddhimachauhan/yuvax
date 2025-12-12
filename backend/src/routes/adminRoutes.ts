import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { AdminController } from '../controllers/adminController';

const router = Router();

// router.post(
//     "/create-user",
//     authenticate,                    // verifies token from cookies
//     authorize(["ADMIN", "SUPER_ADMIN"]),  // only allows admin/super-admin
//     authController.createUserByAdmin
// );


const adminController = new AdminController();

/**
 * Apply authentication middleware to all admin routes
 * User must be authenticated to access any admin route
 */
router.use(authenticate);

/**
 * Apply authorization middleware to ensure only Admin/SuperAdmin can access
 * You can customize this based on your requirements
 */
router.use(authorize(['Admin', 'SuperAdmin']));

// ==================== USER MANAGEMENT ROUTES ====================

/**
 * @route   POST /api/admin/users
 * @desc    Create a new user (Teacher, Sales, Admin, etc.)
 * @access  Admin, SuperAdmin
 * @body    { email, password, confirm_password, full_name, gender, dob, country, zone, address, parentsName, phone, role }
 */
router.post('/users', adminController.createUser);

/**
 * @route   POST /api/admin/users/bulk
 * @desc    Bulk create users
 * @access  Admin, SuperAdmin
 * @body    { users: [{ email, password, ... }] }
 */
router.post('/users/bulk', adminController.bulkCreateUsers);

/**
 * @route   GET /api/admin/users
 * @desc    Get all users with filters and pagination
 * @access  Admin, SuperAdmin
 * @query   page, limit, role, status, search
 * @example /api/admin/users?page=1&limit=10&role=Teacher&status=active&search=john
 */
router.get('/users', adminController.getAllUsers);

/**
 * @route   GET /api/admin/users/role/:role
 * @desc    Get users by role with pagination
 * @access  Admin, SuperAdmin
 * @params  role (Student, Teacher, Sales, Admin, SuperAdmin)
 * @query   page, limit
 * @example /api/admin/users/role/Teacher?page=1&limit=10
 */
router.get('/users/role/:role', adminController.getUsersByRole);

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get user by ID
 * @access  Admin, SuperAdmin
 * @params  id (user ID)
 */
router.get('/users/:id', adminController.getUserById);

/**
 * @route   PUT /api/admin/users/:id
 * @desc    Update user details
 * @access  Admin, SuperAdmin
 * @params  id (user ID)
 * @body    { full_name, gender, dob, country, zone, address, parentsName, phone, role }
 */
router.put('/users/:id', adminController.updateUser);

/**
 * @route   PUT /api/admin/users/:id/password
 * @desc    Update user password
 * @access  Admin, SuperAdmin
 * @params  id (user ID)
 * @body    { newPassword, confirmPassword }
 */
router.put('/users/:id/password', adminController.updatePassword);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user (soft delete)
 * @access  Admin, SuperAdmin
 * @params  id (user ID)
 */
router.delete('/users/:id', adminController.deleteUser);

// ==================== DASHBOARD ROUTES ====================


router.get('/dashboard/stats', adminController.getDashboardStats);

export default router;
