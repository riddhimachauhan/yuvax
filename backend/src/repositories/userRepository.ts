import { PrismaClient, User,Gender,UserRole } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class UserRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(userData: {
    email: string;
    password: string;
    full_name: string;
    phone: string;
    role: UserRole;
    gender: Gender;
    date_of_birth?: Date;
    age?: string;
    parents_name?: string;
    zone?: string;
    country?: string;
  }): Promise<User> {
    
    const dob = userData.date_of_birth
    ? new Date(userData.date_of_birth)
    : undefined;

    return this.db.user.create({
      data: {
        ...userData,
        date_of_birth: dob
      }
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { user_id: id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { phone },
    });
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
        ],
      },
    });
  }

 async findByRole(
  role: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  users: User[];
  total: number;
  totalPages: number;
  currentPage: number;
  pagesLeft: number;
  totalItemsLeft: number;
}> {
  const safePage = page > 0 ? page : 1;
  const safeLimit = limit > 0 ? limit : 10;
  const skip = (safePage - 1) * safeLimit;

  const [users, total] = await Promise.all([
    this.db.user.findMany({
      where: { role: role as UserRole },
      skip,
      take: safeLimit,
      orderBy: { created_at: 'desc' },
    }),
    this.db.user.count({
      where: { role: role as UserRole },
    }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const pagesLeft = totalPages - safePage > 0 ? totalPages - safePage : 0;
  const totalItemsLeft = total - safePage * safeLimit > 0 ? total - safePage * safeLimit : 0;

  return {
    users,
    total,
    totalPages,
    currentPage: safePage,
    pagesLeft,
    totalItemsLeft,
  };
}


  async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    this.db.user.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    this.db.user.count(),
  ]);

   const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    users,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}


  async update(id: string, userData: Partial<User>): Promise<User> {
    return this.db.user.update({
      where: { user_id: id },
      data: userData,
    });
  }

  async delete(id: string): Promise<User> {
    return this.db.user.delete({
      where: { user_id: id },
    });
  }

  


  async exists(id: string): Promise<boolean> {
    const user = await this.db.user.findUnique({
      where: { user_id: id },
      select: { user_id: true },
    });
    return !!user;
  }

  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    const user = await this.db.user.findFirst({
      where: {
        email,
        ...(excludeId && { user_id: { not: excludeId } }),
      },
      select: { user_id: true },
    });
    return !!user;
  }

  async phoneExists(phone: string, excludeId?: string): Promise<boolean> {
    const user = await this.db.user.findFirst({
      where: {
        phone,
        ...(excludeId && { user_id: { not: excludeId } }),
      },
      select: { user_id: true },
    });
    return !!user;
  }
}
