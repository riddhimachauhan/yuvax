import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/userRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS, USER_ROLES } from '../utils/constants';
import { Gender, UserRole } from '@prisma/client';

export interface CreateUserData {
  email: string;
  password: string;
  full_name: string;
  gender: Gender;
  date_of_birth?: Date;
  age?: string;
  parents_name?: string;
  zone?: string;
  country?: string;
  role: UserRole;
  phone: string;
  dateOfBirth?: Date;
}

export interface UpdateUserData {
  full_name?: string;
  gender?: Gender;
  date_of_birth?: Date;
  age?: string;
  parents_name?: string;
  zone?: string;
  country?: string;
  role?: UserRole;
  phone?: string;
  email?: string;
  dateOfBirth?: Date;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: CreateUserData) {
    // Check if email already exists
    const existingEmail = await this.userRepository.emailExists(userData.email);
    if (existingEmail) {
      throw new CustomError('Email already exists', HTTP_STATUS.CONFLICT);
    }

    // Check if phone already exists
    const existingPhone = await this.userRepository.phoneExists(userData.phone);
    if (existingPhone) {
      throw new CustomError('Phone number already exists', HTTP_STATUS.CONFLICT);
    }

    // Validate role
    if (!Object.values(USER_ROLES).includes(userData.role as any)) {
      throw new CustomError('Invalid role', HTTP_STATUS.BAD_REQUEST);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create user
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  async getUsersByRole(role: string, page: number = 1, limit: number = 10) {
  // Validate role
  if (!Object.values(USER_ROLES).includes(role as any)) {
    throw new CustomError('Invalid role', HTTP_STATUS.BAD_REQUEST);
  }

  return await this.userRepository.findByRole(role, page, limit);
}


  async getAllUsers(page: number = 1, limit: number = 10) {
  const result = await this.userRepository.findAll(page, limit);

  // Remove passwords
  const usersWithoutPasswords = result.users.map(user => {
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  });

  return {
    ...result,
    users: usersWithoutPasswords,
  };
}


  async updateUser(id: string, userData: UpdateUserData) {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    // Check if email is being updated and if it's already taken
    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await this.userRepository.emailExists(userData.email, id);
      if (emailExists) {
        throw new CustomError('Email already exists', HTTP_STATUS.CONFLICT);
      }
    }

    // Check if phone is being updated and if it's already taken
    if (userData.phone && userData.phone !== existingUser.phone) {
      const phoneExists = await this.userRepository.phoneExists(userData.phone, id);
      if (phoneExists) {
        throw new CustomError('Phone number already exists', HTTP_STATUS.CONFLICT);
      }
    }

    // Validate role if being updated
    if (userData.role && !Object.values(USER_ROLES).includes(userData.role as any)) {
      throw new CustomError('Invalid role', HTTP_STATUS.BAD_REQUEST);
    }

    const updatedUser = await this.userRepository.update(id, userData);
    
    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser as any;
    return userWithoutPassword;
  }

  async deleteUser(id: string) {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    await this.userRepository.delete(id);
    return { message: 'User deleted successfully' };
  }

  async changeUserPassword(id: string, currentPassword: string, newPassword: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new CustomError('Current password is incorrect', HTTP_STATUS.BAD_REQUEST);
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await this.userRepository.update(id, { password: hashedNewPassword });
    return { message: 'Password changed successfully' };
  }
}
