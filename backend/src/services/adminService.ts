import { AdminRepository } from '../repositories/adminRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

interface UserData {
  email: string;
  password: string;
  confirm_password?: string;
  full_name: string;
  gender: 'male' | 'female';
  date_of_birth?: string;
  country?: string;
  zone?: string;
  parents_name?: string;
  phone: string;
  role: 'Student' | 'Teacher' | 'Admin' | 'SuperAdmin' | 'Sales';
  age?: string;
  ip_address?: string;
}

interface RequestingAdmin {
  user_id: string;
  email: string;
  role: string;
}

/**
 * AdminService - Handles business logic for admin operations
 * Matches your exact Prisma schema and AuthService pattern
 */
export class AdminService {
  private adminRepository: AdminRepository;
  private roleHierarchy: Record<string, number>;

  constructor() {
    this.adminRepository = new AdminRepository();
    
    // Define role hierarchy - matches your UserRole enum
    this.roleHierarchy = {
      SuperAdmin: 4,
      Admin: 3,
      Teacher: 2,
      Sales: 2,
      Student: 1
    };
  }

  /**
   * Create a new user (Teacher, Sales, Admin, etc.)
   */
  async createUser(userData: UserData, requestingAdmin: RequestingAdmin): Promise<any> {
    try {
      // Validation
      this.validateUserData(userData);

      // Authorization check - only Admin or SuperAdmin can create users
      if (!this.canCreateUser(requestingAdmin)) {
        throw new CustomError(
          'Unauthorized: Only Admin or SuperAdmin can create users',
          HTTP_STATUS.FORBIDDEN
        );
      }

      // Role-specific validation
      this.validateRolePermissions(userData.role, requestingAdmin);

      // Check if user already exists by email
      const existingUser = await this.adminRepository.userExists(userData.email);
      if (existingUser) {
        throw new CustomError(
          'User with this email already exists',
          HTTP_STATUS.CONFLICT
        );
      }

      // Password validation
      if (userData.password !== userData.confirm_password) {
        throw new CustomError(
          'Passwords do not match',
          HTTP_STATUS.BAD_REQUEST
        );
      }

      // Remove confirm_password before creating user
      const { confirm_password, ...userDataToCreate } = userData;

      // Create user
      const newUser = await this.adminRepository.createUser(userDataToCreate);

      // Return user without password
      return this.sanitizeUserData(newUser);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user details
   */
  async updateUser(
    userId: string, 
    updateData: Partial<UserData>, 
    requestingAdmin: RequestingAdmin
  ): Promise<any> {
    try {
      // Check if user exists
      const existingUser = await this.adminRepository.findById(userId);
      if (!existingUser) {
        throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
      }

      // Authorization check
      if (!this.canUpdateUser(requestingAdmin, existingUser)) {
        throw new CustomError(
          'Unauthorized: Insufficient permissions to update this user',
          HTTP_STATUS.FORBIDDEN
        );
      }

      // If role is being changed, validate permissions
      if (updateData.role && updateData.role !== existingUser.role) {
        this.validateRolePermissions(updateData.role, requestingAdmin);
      }

      // Remove fields that shouldn't be updated directly
      const { password, confirm_password, email, ...safeUpdateData } = updateData as any;

      // Update user
      const updatedUser = await this.adminRepository.updateUser(userId, safeUpdateData);

      return this.sanitizeUserData(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete user (soft delete)
   */
  async deleteUser(userId: string, requestingAdmin: RequestingAdmin): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // Check if user exists
      const existingUser = await this.adminRepository.findById(userId);
      if (!existingUser) {
        throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
      }

      // Authorization check
      if (!this.canDeleteUser(requestingAdmin, existingUser)) {
        throw new CustomError(
          'Unauthorized: Insufficient permissions to delete this user',
          HTTP_STATUS.FORBIDDEN
        );
      }

      // Prevent self-deletion
      if (requestingAdmin.user_id === userId) {
        throw new CustomError(
          'Cannot delete your own account',
          HTTP_STATUS.BAD_REQUEST
        );
      }

      // Delete user
      const deleted = await this.adminRepository.deleteUser(userId);

      return {
        success: deleted,
        message: deleted ? 'User deleted successfully' : 'Failed to delete user'
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string, requestingAdmin: RequestingAdmin): Promise<any> {
    try {
      // Authorization check
      if (!this.canViewUser(requestingAdmin)) {
        throw new CustomError(
          'Unauthorized: Insufficient permissions to view user details',
          HTTP_STATUS.FORBIDDEN
        );
      }

      const user = await this.adminRepository.findById(userId);
      if (!user) {
        throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
      }

      return this.sanitizeUserData(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get users by role with pagination
   */
  async getUsersByRole(
    role: string,
    page: number,
    limit: number,
    requestingAdmin: RequestingAdmin
  ): Promise<any> {
    try {
      // Authorization check
      if (!this.canViewUsers(requestingAdmin)) {
        throw new CustomError(
          'Unauthorized: Insufficient permissions to view users',
          HTTP_STATUS.FORBIDDEN
        );
      }

      const result = await this.adminRepository.getUsersByRole(role, page, limit);

      return {
        ...result,
        data: result.data.map(user => this.sanitizeUserData(user))
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all users with filters
   */
  async getAllUsers(
    options: {
      page?: number;
      limit?: number;
      role?: string | null;
      status?: boolean | null;
      search?: string | null;
    },
    requestingAdmin: RequestingAdmin
  ): Promise<any> {
    try {
      // Authorization check
      if (!this.canViewUsers(requestingAdmin)) {
        throw new CustomError(
          'Unauthorized: Insufficient permissions to view users',
          HTTP_STATUS.FORBIDDEN
        );
      }

      const result = await this.adminRepository.getAllUsers(options);

      return {
        ...result,
        data: result.data.map(user => this.sanitizeUserData(user))
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user password
   */
  async updatePassword(
    userId: string,
    passwordData: { newPassword: string; confirmPassword: string },
    requestingAdmin: RequestingAdmin
  ): Promise<{ success: boolean; message: string }> {
    try {
      const { newPassword, confirmPassword } = passwordData;

      // Check if user exists
      const existingUser = await this.adminRepository.findById(userId);
      if (!existingUser) {
        throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
      }

      // Authorization check
      if (!this.canUpdateUser(requestingAdmin, existingUser)) {
        throw new CustomError(
          'Unauthorized: Insufficient permissions to update password',
          HTTP_STATUS.FORBIDDEN
        );
      }

      // Validate passwords
      if (newPassword !== confirmPassword) {
        throw new CustomError(
          'Passwords do not match',
          HTTP_STATUS.BAD_REQUEST
        );
      }

      if (newPassword.length < 8) {
        throw new CustomError(
          'Password must be at least 8 characters long',
          HTTP_STATUS.BAD_REQUEST
        );
      }

      // Update password
      await this.adminRepository.updatePassword(userId, newPassword);

      return {
        success: true,
        message: 'Password updated successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(requestingAdmin: RequestingAdmin): Promise<any> {
    try {
      // Authorization check
      if (!this.canViewDashboard(requestingAdmin)) {
        throw new CustomError(
          'Unauthorized: Insufficient permissions to view dashboard',
          HTTP_STATUS.FORBIDDEN
        );
      }

      const stats = await this.adminRepository.getDashboardStats();
      return stats;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Bulk create users
   */
  async bulkCreateUsers(
    usersData: UserData[],
    requestingAdmin: RequestingAdmin
  ): Promise<any> {
    try {
      // Authorization check
      if (!this.canCreateUser(requestingAdmin)) {
        throw new CustomError(
          'Unauthorized: Only Admin or SuperAdmin can create users',
          HTTP_STATUS.FORBIDDEN
        );
      }

      // Validate each user data
      for (const userData of usersData) {
        this.validateUserData(userData);
        this.validateRolePermissions(userData.role, requestingAdmin);
      }

      const result = await this.adminRepository.bulkCreateUsers(usersData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // ==================== VALIDATION METHODS ====================

  /**
   * Validate user data - matches your Prisma schema requirements
   */
  private validateUserData(userData: UserData): void {
    const requiredFields = ['email', 'password', 'full_name', 'role', 'phone', 'gender'];
    
    for (const field of requiredFields) {
      if (!(userData as any)[field]) {
        throw new CustomError(
          `${field} is required`,
          HTTP_STATUS.BAD_REQUEST
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new CustomError(
        'Invalid email format',
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Password validation
    if (userData.password.length < 8) {
      throw new CustomError(
        'Password must be at least 8 characters long',
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Role validation - matches your UserRole enum
    const validRoles = ['Student', 'Teacher', 'Sales', 'Admin', 'SuperAdmin'];
    if (!validRoles.includes(userData.role)) {
      throw new CustomError(
        `Invalid role. Must be one of: ${validRoles.join(', ')}`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Gender validation - matches your Gender enum
    const validGenders = ['male', 'female'];
    if (!validGenders.includes(userData.gender)) {
      throw new CustomError(
        'Invalid gender. Must be either male or female',
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Phone validation (required field)
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (!phoneRegex.test(userData.phone)) {
      throw new CustomError(
        'Invalid phone number format',
        HTTP_STATUS.BAD_REQUEST
      );
    }
  }

  /**
   * Validate role permissions
   */
  private validateRolePermissions(
    roleToCreate: string,
    requestingAdmin: RequestingAdmin
  ): void {
    const requestingAdminLevel = this.roleHierarchy[requestingAdmin.role] || 0;
    const roleToCreateLevel = this.roleHierarchy[roleToCreate] || 0;

    // Only SuperAdmin can create Admin or SuperAdmin
    if ((roleToCreate === 'Admin' || roleToCreate === 'SuperAdmin') && 
        requestingAdmin.role !== 'SuperAdmin') {
      throw new CustomError(
        'Only SuperAdmin can create Admin or SuperAdmin users',
        HTTP_STATUS.FORBIDDEN
      );
    }

    // Admin/SuperAdmin can create any role below them
    if (requestingAdminLevel <= roleToCreateLevel && requestingAdmin.role !== 'SuperAdmin') {
      throw new CustomError(
        'Insufficient permissions to create this role',
        HTTP_STATUS.FORBIDDEN
      );
    }
  }

  // ==================== AUTHORIZATION METHODS ====================

  private canCreateUser(requestingAdmin: RequestingAdmin): boolean {
    return ['Admin', 'SuperAdmin'].includes(requestingAdmin.role);
  }

  private canUpdateUser(requestingAdmin: RequestingAdmin, targetUser: any): boolean {
    if (requestingAdmin.role === 'SuperAdmin') {
      return true;
    }

    if (requestingAdmin.role === 'Admin') {
      return targetUser.role !== 'SuperAdmin';
    }

    return false;
  }

  private canDeleteUser(requestingAdmin: RequestingAdmin, targetUser: any): boolean {
    if (requestingAdmin.role === 'SuperAdmin') {
      return true;
    }

    if (requestingAdmin.role === 'Admin') {
      return !['SuperAdmin', 'Admin'].includes(targetUser.role);
    }

    return false;
  }

  private canViewUsers(requestingAdmin: RequestingAdmin): boolean {
    return ['Admin', 'SuperAdmin'].includes(requestingAdmin.role);
  }

  private canViewUser(requestingAdmin: RequestingAdmin): boolean {
    return ['Admin', 'SuperAdmin', 'Teacher', 'Sales'].includes(requestingAdmin.role);
  }

  private canViewDashboard(requestingAdmin: RequestingAdmin): boolean {
    return ['Admin', 'SuperAdmin'].includes(requestingAdmin.role);
  }

  // ==================== UTILITY METHODS ====================

  private sanitizeUserData(user: any): any {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}
