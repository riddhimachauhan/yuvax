
import { PrismaClient, Category } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class CategoryRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(categoryData: {
    category_name: string;
    category_description: string;
    category_image: string;
  }): Promise<Category> {
    return this.db.category.create({
      data: categoryData,
    });
  }

  async findById(id: string) {
    return this.db.category.findUnique({
      where: { category_id: id },
      include: {
        courses: true,
      },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return this.db.category.findFirst({
      where: { category_name: name },
    });
  }

  
 async findAll(
  page: number = 1,
  limit: number = 10
): Promise<{
  categories: Category[];
  total: number;
  totalPages: number;
  currentPage: number;
  pagesLeft: number;
  totalItemsLeft: number;
}> {
  const skip = (page - 1) * limit;

  const [categories, total] = await Promise.all([
    this.db.category.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' }, // Make sure this field exists in schema
    }),
    this.db.category.count(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    categories,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}

// Optional: fetch all categories without pagination
async findAllWithoutCourses(): Promise<Category[]> {
  return this.db.category.findMany({ orderBy: { created_at: 'desc' } });
}


  async update(id: string, categoryData: Partial<Category>): Promise<Category> {
    return this.db.category.update({
      where: { category_id: id },
      data: categoryData,
    });
  }

  async delete(id: string): Promise<Category> {
    return this.db.category.delete({
      where: { category_id: id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const category = await this.db.category.findUnique({
      where: { category_id: id },
      select: { category_id: true },
    });
    return !!category;
  }

  async nameExists(name: string, excludeId?: string): Promise<boolean> {
    const category = await this.db.category.findFirst({
      where: {
        category_name: name,
        ...(excludeId && { category_id: { not: excludeId } }),
      },
      select: { category_id: true },
    });
    return !!category;
  }

  async getCategoryStats(id: string): Promise<{
    totalCourses: number;
    totalStudents: number;
  }> {
    const category = await this.db.category.findUnique({
      where: { category_id: id },
      include: {
        courses: { include: { enrollments: true } },
      },
    });

    if (!category) return { totalCourses: 0, totalStudents: 0 };

    const totalCourses = category.courses.length;
    const totalStudents = category.courses.reduce(
      (sum, course) => sum + course.enrollments.length,
      0
    );

    return { totalCourses, totalStudents };
  }
}
