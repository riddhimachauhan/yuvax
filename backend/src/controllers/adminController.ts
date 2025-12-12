import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';
import { asyncHandler } from '../utils/asyncHandler';
import { HTTP_STATUS } from '../utils/constants';

/**
 * AdminController - Handles HTTP requests and responses
 * Matches your AuthController pattern with asyncHandler
 */

interface RequestingAdmin {
  user_id: string;      
  email: string;        
  role: string;         
  full_name?: string;
  firstName?: string;
  lastName?: string;
}
interface AuthUser {
  user_id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  full_name?: string;
}

 class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  /**
   * Create a new user (Teacher, Sales, Admin, etc.)
   * POST /api/admin/users
   */
  createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;
    const requestingAdmin = req.user as AuthUser | undefined; 
    console.log("Requesting Admin:", requestingAdmin);

    if (!requestingAdmin) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const newUser = await this.adminService.createUser(userData, requestingAdmin);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: `${userData.role} created successfully`,
      data: newUser
    });
  });

  /**
   * Update user details
   * PUT /api/admin/users/:id
   */
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const updateData = req.body;
    const requestingAdmin = req.user as AuthUser | undefined;

    if (!requestingAdmin) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const updatedUser = await this.adminService.updateUser(
      userId,
      updateData,
      requestingAdmin
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  });

  /**
   * Delete user (soft delete)
   * DELETE /api/admin/users/:id
   */
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const requestingAdmin = req.user as AuthUser | undefined;


    if (!requestingAdmin) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const result = await this.adminService.deleteUser(userId, requestingAdmin);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
      data: result
    });
  });

  /**
   * Get user by ID
   * GET /api/admin/users/:id
   */
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const requestingAdmin = req.user as AuthUser | undefined;


    if (!requestingAdmin) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const user = await this.adminService.getUserById(userId, requestingAdmin);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: user
    });
  });

  /**
   * Get users by role with pagination
   * GET /api/admin/users/role/:role?page=1&limit=10
   */
  getUsersByRole = asyncHandler(async (req: Request, res: Response) => {
    const { role } = req.params;
    const { page = '1', limit = '10' } = req.query;
    const requestingAdmin = req.user as AuthUser | undefined;


    if (!requestingAdmin) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const result = await this.adminService.getUsersByRole(
      role,
      parseInt(page as string),
      parseInt(limit as string),
      requestingAdmin
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  });

  /**
   * Get all users with filters
   * GET /api/admin/users?page=1&limit=10&role=Teacher&status=true&search=john
   */
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const {
      page = '1',
      limit = '10',
      role = null,
      status = 'true',
      search = null
    } = req.query;

    const requestingAdmin = req.user as AuthUser | undefined;


    if (!requestingAdmin) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const options = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      role: role as string | null,
      status: status === 'true' ? true : status === 'false' ? false : null,
      search: search as string | null
    };

    const result = await this.adminService.getAllUsers(options, requestingAdmin);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  });

  /**
   * Update user password
   * PUT /api/admin/users/:id/password
   */
  updatePassword = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const passwordData = req.body;
    const requestingAdmin = req.user as AuthUser | undefined;


    if (!requestingAdmin) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const result = await this.adminService.updatePassword(
      userId,
      passwordData,
      requestingAdmin
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message
    });
  });

  /**
   * Get dashboard statistics
   * GET /api/admin/dashboard/stats
   */
  getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
    const requestingAdmin = req.user as AuthUser | undefined;


    if (!requestingAdmin) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const stats = await this.adminService.getDashboardStats(requestingAdmin);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: stats
    });
  });

  /**
   * Bulk create users
   * POST /api/admin/users/bulk
   */
  bulkCreateUsers = asyncHandler(async (req: Request, res: Response) => {
    const usersData = req.body.users;
    const requestingAdmin = req.user as AuthUser | undefined;


    if (!requestingAdmin) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!Array.isArray(usersData)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid request format. Expected array of users'
      });
    }

    const result = await this.adminService.bulkCreateUsers(
      usersData,
      requestingAdmin
    );

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: result.message,
      data: result
    });
  });
}
export { AdminController };
export const adminController = new AdminController();