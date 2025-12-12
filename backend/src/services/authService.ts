import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/authRepository';
import { UserRepository } from '../repositories/userRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS, JWT_CONFIG, USER_ROLES } from '../utils/constants';
import nodemailer from "nodemailer";

export interface LoginCredentials {
  identifier: string; // email or phone
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  role: string;
  gender: string;
  date_of_birth?: Date;
  age?: string;
  parents_name?: string;
  zone?: string;
  country?: string;
}

export interface AuthResult {
  token: string;
  refreshToken?: string;
  user: any; // User without password
}

export class AuthService {
  private authRepository: AuthRepository;
  private userRepository: UserRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
  }

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    const { identifier, password } = credentials;

    // Find user by email or phone
    const user = await this.authRepository.findUserByIdentifier(identifier);
    if (!user) {
      throw new CustomError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED);
    }

    // Update last login
    await this.authRepository.updateUserLastLogin(user.user_id);

    // Generate JWT token
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user as any;

    return {
      token,
      refreshToken,
      user: userWithoutPassword,
    };
  }

  async register(userData: RegisterData): Promise<AuthResult> {
    // Check if email already exists
    const emailExists = await this.authRepository.isEmailTaken(userData.email);
    if (emailExists) {
      throw new CustomError('Email already exists', HTTP_STATUS.CONFLICT);
    }

    // Check if phone already exists
    const phoneExists = await this.authRepository.isPhoneTaken(userData.phone);
    if (phoneExists) {
      throw new CustomError('Phone number already exists', HTTP_STATUS.CONFLICT);
    }

    // Validate role
    if (!Object.values(USER_ROLES).includes(userData.role as any)) {
      throw new CustomError('Invalid role', HTTP_STATUS.BAD_REQUEST);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    console.log("date of birth", userData.date_of_birth)
    // Create user
    const user = await this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
      full_name: userData.full_name,
      phone: userData.phone,
      role: userData.role as any,
      gender: userData.gender as any,
      date_of_birth: userData.date_of_birth,
      age: userData.age,
      parents_name: userData.parents_name,
      zone: userData.zone,
      country: userData.country,
    });

    // Generate JWT token
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);


    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user as any;

    return {
      token,
      refreshToken,
      user: userWithoutPassword,
    };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.authRepository.findUserByIdentifier(email);
    if (!user) {
      // Don't reveal if email exists or not for security
      return { message: 'If the email exists, password reset instructions have been sent' };
    }

    // TODO: Send email with password reset instructions
    // await this.emailService.sendPasswordResetInstructions(user.email);

    const resetToken = this.generateToken(user.user_id);

    const resetLink = `http://localhost:5000/api/auth/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // ✅ Send email
    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h3>Password Reset</h3>
        <p>Hello <b>${user.full_name || "User"}</b>,</p>
        <p>You requested to reset your password. Click the link below:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    return { message: 'If the email exists, password reset instructions have been sent' };
  }

  async resetPassword(email: string, newPassword: string): Promise<{ message: string }> {
    // Find user by email
    const user = await this.authRepository.findUserByIdentifier(email);
    if (!user) {
      throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password
    await this.authRepository.updateUserPassword(user.user_id, hashedPassword);

    return { message: 'Password reset successfully' };
  }


  async refreshTokenWithCookie(refreshToken: string): Promise<{ token: string; refreshToken?: string }> {
    if (!process.env.JWT_SECRET) {
      throw new CustomError('JWT secret not configured', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET) as any;

      // Check if it's a refresh token
      if (decoded.type !== 'refresh') {
        throw new CustomError('Invalid token type', HTTP_STATUS.UNAUTHORIZED);
      }

      // Get user
      const user = await this.authRepository.findUserById(decoded.user_id);
      if (!user) {
        throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
      }

      // Generate new access token
      const newToken = this.generateToken(user);

      // Optionally generate new refresh token (token rotation)
      const newRefreshToken = this.generateRefreshToken(user);

      return {
        token: newToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new CustomError('Invalid or expired refresh token', HTTP_STATUS.UNAUTHORIZED);
    }
  }

  async refreshToken(userId: string): Promise<{ token: string }> {
    const user = await this.authRepository.findUserById(userId);
    if (!user) {
      throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    const token = this.generateToken(user);
    return { token };
  }



  async getUserProfile(userId: string) {
    const user = await this.authRepository.getUserProfile(userId);
    if (!user) {
      throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    // Remove password from response
    const { password: _, ...safeUser } = user as any;
    return safeUser;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.authRepository.findUserById(userId);
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
    await this.authRepository.updateUserPassword(userId, hashedNewPassword);

    return { message: 'Password changed successfully' };
  }

  private generateToken(user: any): string {
    if (!process.env.JWT_SECRET) {
      throw new CustomError('JWT secret not configured', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    const payload = {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: JWT_CONFIG.EXPIRES_IN,
    });
  }

  private generateRefreshToken(user: any): string {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new CustomError('JWT secret not configured', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    const payload = {
      user_id: user.user_id,
      type: 'refresh', // Mark as refresh token
    };

    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '7d', // 7 days for refresh token
    });
  }
  async createUserByAdmin(userData: RegisterData): Promise<any> {
    // Check if email or phone already exists
    const emailExists = await this.authRepository.isEmailTaken(userData.email);
    if (emailExists) {
      throw new CustomError('Email already exists', HTTP_STATUS.CONFLICT);
    }

    const phoneExists = await this.authRepository.isPhoneTaken(userData.phone);
    if (phoneExists) {
      throw new CustomError('Phone number already exists', HTTP_STATUS.CONFLICT);
    }

    // Ensure only valid roles can be created by admin
    const allowedRoles = ['TEACHER', 'SALES', 'OPS'];
    if (!allowedRoles.includes(userData.role.toUpperCase())) {
      throw new CustomError('Invalid role for admin creation', HTTP_STATUS.BAD_REQUEST);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Create user
    const user = await this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
      full_name: userData.full_name,
      phone: userData.phone,
      role: userData.role as any,
      gender: userData.gender as any,
      date_of_birth: userData.date_of_birth,
      age: userData.age,
      parents_name: userData.parents_name,
      zone: userData.zone,
      country: userData.country,
    });

    // Do NOT generate tokens — just return user details
    const { password: _, ...userWithoutPassword } = user as any;

    return userWithoutPassword;
  }

}

