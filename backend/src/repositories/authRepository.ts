import { PrismaClient, User } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class AuthRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async findUserByIdentifier(identifier: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
        ],
      },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { user_id: id },
    });
  }

  async updateUserPassword(id: string, hashedPassword: string): Promise<User> {
    return this.db.user.update({
      where: { user_id: id },
      data: { password: hashedPassword },
    });
  }

  async updateUserLastLogin(id: string): Promise<User> {
    return this.db.user.update({
      where: { user_id: id },
      data: { updated_at: new Date() },
    });
  }

  async getUserProfile(id: string): Promise<{
    user_id: string;
    email: string;
    full_name: string;
    phone: string;
    role: string;
    date_of_birth: Date | null;
    created_at: Date;
    is_active: boolean;
    is_trial: boolean;
  } | null> {
    const user = await this.db.user.findUnique({
      where: { user_id: id },
      select: {
        user_id: true,
        email: true,
        full_name: true,
        phone: true,
        role: true,
        date_of_birth: true,
        created_at: true,
        is_active: true,
        is_trial: true,
      },
    });

    return user;
  }

  async isEmailTaken(email: string, excludeUserId?: string): Promise<boolean> {
    const user = await this.db.user.findFirst({
      where: {
        email,
        ...(excludeUserId && { user_id: { not: excludeUserId } }),
      },
      select: { user_id: true },
    });
    return !!user;
  }

  async isPhoneTaken(phone: string, excludeUserId?: string): Promise<boolean> {
    const user = await this.db.user.findFirst({
      where: {
        phone,
        ...(excludeUserId && { user_id: { not: excludeUserId } }),
      },
      select: { user_id: true },
    });
    return !!user;
  }
}
