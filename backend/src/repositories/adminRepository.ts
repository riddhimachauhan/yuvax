import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { getPrismaClient } from '../config/database';

interface CreateUserData {
  email: string;
  password: string;
  full_name: string;
  gender: 'male' | 'female';
  date_of_birth?: string | Date;
  country?: string;
  zone?: string;
  address?: string; // Note: Not in schema, will be ignored
  parents_name?: string;
  phone: string;
  role: 'Student' | 'Teacher' | 'Admin' | 'SuperAdmin' | 'Sales';
  age?: string;
  ip_address?: string;
}

/**
 * AdminRepository - Handles all database operations for admin using Prisma
 * Matches your exact Prisma schema
 */
export class AdminRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.db.user.findUnique({
        where: { email }
      });
    } catch (error: any) {
      throw new Error(`Database error in findByEmail: ${error.message}`);
    }
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    try {
      return await this.db.user.findUnique({
        where: { user_id: id }
      });
    } catch (error: any) {
      throw new Error(`Database error in findById: ${error.message}`);
    }
  }

  /**
   * Create a new user (Teacher, Sales, Admin, etc.)
   */
  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const {
        email,
        password,
        full_name,
        gender,
        date_of_birth,
        country,
        zone,
        parents_name,
        phone,
        role,
        age,
        ip_address
      } = userData;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user with exact schema fields
      const user = await this.db.user.create({
        data: {
          email,
          password: hashedPassword,
          full_name,
          gender,
          date_of_birth: date_of_birth ? new Date(date_of_birth) : undefined,
          country,
          zone,
          parents_name,
          phone,
          role,
          age,
          ip_address,
          is_active: true,
          is_trial: false
        }
      });

      return user;
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Get the field that caused the unique constraint violation
        const target = error.meta?.target;
        if (target?.includes('email')) {
          throw new Error('User with this email already exists');
        }
        if (target?.includes('phone')) {
          throw new Error('User with this phone number already exists');
        }
        throw new Error('User with this information already exists');
      }
      throw new Error(`Database error in createUser: ${error.message}`);
    }
  }

  /**
   * Update user details
   */
  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    try {
      // Convert date_of_birth to Date if provided
      if (updateData.date_of_birth) {
        updateData.date_of_birth = new Date(updateData.date_of_birth as any);
      }

      const user = await this.db.user.update({
        where: { user_id: id },
        data: {
          ...updateData,
          updated_at: new Date()
        }
      });

      return user;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('User not found');
      }
      throw new Error(`Database error in updateUser: ${error.message}`);
    }
  }

  /**
   * Delete user (soft delete by setting is_active to false)
   */
  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.db.user.update({
        where: { user_id: id },
        data: {
          is_active: false,
          updated_at: new Date()
        }
      });
      return true;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('User not found');
      }
      throw new Error(`Database error in deleteUser: ${error.message}`);
    }
  }

  /**
   * Hard delete user (permanent deletion)
   */
  async hardDeleteUser(id: string): Promise<boolean> {
    try {
      await this.db.user.delete({
        where: { user_id: id }
      });
      return true;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('User not found');
      }
      throw new Error(`Database error in hardDeleteUser: ${error.message}`);
    }
  }

  /**
   * Get all users by role with pagination
   */
  async getUsersByRole(role: string, page: number = 1, limit: number = 10): Promise<{
    data: User[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    try {
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        this.db.user.findMany({
          where: {
            role: role as any,
            is_active: true
          },
          skip,
          take: limit,
          orderBy: {
            created_at: 'desc'
          }
        }),
        this.db.user.count({
          where: {
            role: role as any,
            is_active: true
          }
        })
      ]);

      return {
        data: users,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error: any) {
      throw new Error(`Database error in getUsersByRole: ${error.message}`);
    }
  }

  /**
   * Get all users with pagination and optional filters
   */
  async getAllUsers(options: {
    page?: number;
    limit?: number;
    role?: string | null;
    status?: boolean | null;
    search?: string | null;
  } = {}): Promise<{
    data: User[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    try {
      const {
        page = 1,
        limit = 10,
        role = null,
        status = true,
        search = null
      } = options;

      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};
      
      if (role) {
        where.role = role;
      }
      
      if (status !== null) {
        where.is_active = status;
      }

      if (search) {
        where.OR = [
          { email: { contains: search, mode: 'insensitive' } },
          { full_name: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search } }
        ];
      }

      const [users, total] = await Promise.all([
        this.db.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            created_at: 'desc'
          }
        }),
        this.db.user.count({ where })
      ]);

      return {
        data: users,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error: any) {
      throw new Error(`Database error in getAllUsers: ${error.message}`);
    }
  }

  /**
   * Update user password
   */
  async updatePassword(id: string, newPassword: string): Promise<boolean> {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      await this.db.user.update({
        where: { user_id: id },
        data: {
          password: hashedPassword,
          updated_at: new Date()
        }
      });
      
      return true;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('User not found');
      }
      throw new Error(`Database error in updatePassword: ${error.message}`);
    }
  }

  /**
   * Check if user exists by email
   */
  async userExists(email: string): Promise<boolean> {
    try {
      const user = await this.db.user.findUnique({
        where: { email },
        select: { user_id: true }
      });
      return !!user;
    } catch (error: any) {
      throw new Error(`Database error in userExists: ${error.message}`);
    }
  }

  /**
   * Get user statistics by role
   */
  async getUserStatsByRole(): Promise<Array<{ role: string; count: number }>> {
    try {
      const stats = await this.db.user.groupBy({
        by: ['role'],
        where: {
          is_active: true
        },
        _count: {
          user_id: true
        }
      });

      return stats.map(stat => ({
        role: stat.role,
        count: stat._count.user_id
      }));
    } catch (error: any) {
      throw new Error(`Database error in getUserStatsByRole: ${error.message}`);
    }
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    roleStats: Array<{ role: string; count: number }>;
    recentUsers: Array<{
      user_id: string;
      email: string;
      full_name: string;
      role: string;
      created_at: Date;
    }>;
  }> {
    try {
      const [
        totalUsers,
        activeUsers,
        inactiveUsers,
        roleStats,
        recentUsers
      ] = await Promise.all([
        this.db.user.count(),
        this.db.user.count({ where: { is_active: true } }),
        this.db.user.count({ where: { is_active: false } }),
        this.getUserStatsByRole(),
        this.db.user.findMany({
          take: 5,
          orderBy: { created_at: 'desc' },
          select: {
            user_id: true,
            email: true,
            full_name: true,
            role: true,
            created_at: true
          }
        })
      ]);

      return {
        totalUsers,
        activeUsers,
        inactiveUsers,
        roleStats,
        recentUsers
      };
    } catch (error: any) {
      throw new Error(`Database error in getDashboardStats: ${error.message}`);
    }
  }

  /**
   * Bulk create users
   */
  async bulkCreateUsers(usersData: CreateUserData[]): Promise<{
    count: number;
    message: string;
  }> {
    try {
      // Hash passwords for all users
      const usersWithHashedPasswords = await Promise.all(
        usersData.map(async (user) => ({
          email: user.email,
          password: await bcrypt.hash(user.password, 10),
          full_name: user.full_name,
          role: user.role,
          gender: user.gender,
          date_of_birth: user.date_of_birth ? new Date(user.date_of_birth) : undefined,
          country: user.country,
          zone: user.zone,
          parents_name: user.parents_name,
          phone: user.phone,
          age: user.age,
          ip_address: user.ip_address,
          is_active: true,
          is_trial: false
        }))
      );

      const result = await this.db.user.createMany({
        data: usersWithHashedPasswords,
        skipDuplicates: true
      });

      return {
        count: result.count,
        message: `${result.count} users created successfully`
      };
    } catch (error: any) {
      throw new Error(`Database error in bulkCreateUsers: ${error.message}`);
    }
  }

  /**
   * Close Prisma connection
   */
  async disconnect(): Promise<void> {
    await this.db.$disconnect();
  }
}
