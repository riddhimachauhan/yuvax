import { PrismaClient, Course, Difficulty } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class CourseRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(courseData: {
    course_name: string;
    category_id: string;
    course_description?: string;
    course_content?: string;
    difficulty: Difficulty;
    course_duration: string;
    course_image?: string;
    language: string;
    min_age: string;
    max_age: string;
    teacher_id?: string;
  }): Promise<Course> {
    return this.db.course.create({
      data: courseData,
    });
  }

  async findById(id: string): Promise<Course | null> {
    return this.db.course.findUnique({
      where: { course_id: id },
      include: { category: true },
    });
  }

  async findByIdWithRelations(id: string) {
    return this.db.course.findUnique({
      where: { course_id: id },
      include: {
        category: true,
        modules: true,
        enrollments: true,
      },
    });
  }

  // ✅ Used by getAllCourses (NO modules, slots, enrollments)
  // async findAll(page: number = 1, limit: number = 10): Promise<{
  //   courses: Course[];
  //   total: number;
  //   totalPages: number;
  // }> {
  //   const skip = (page - 1) * limit;

  //   const [courses, total] = await Promise.all([
  //     this.db.course.findMany({
  //       skip,
  //       take: limit,
  //       include: { category: true }, // only category
  //       orderBy: { created_at: 'desc' },
  //     }),
  //     this.db.course.count(),
  //   ]);

  //   return {
  //     courses,
  //     total,
  //     totalPages: Math.ceil(total / limit),
  //   };
  // }

  // async findAll(page: number = 1, limit: number = 10): Promise<Course[]> {
  //   const skip = (page - 1) * limit;

  //   return this.db.course.findMany({
  //     skip,
  //     take: limit,
  //     orderBy: { created_at: 'desc' },
  //   });
  // }

//   async findAll(page: number = 1, limit: number = 10) {
//   const skip = (page - 1) * limit;

//   const [courses, total] = await Promise.all([
//     this.db.course.findMany({
//       skip,
//       take: limit,
//       orderBy: { created_at: 'desc' },
//       include: {
//         category: true, // optional: include related data
//       },
//     }),
//     this.db.course.count(),
//   ]);

//   const totalPages = Math.ceil(total / limit);
//   const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
//   const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

//   return {
//     courses,
//     total,
//     totalPages,
//     currentPage: page,
//     pagesLeft,
    
//   };
// }



// async findAll(page: number = 1, limit: number = 10) {
//   const skip = (page - 1) * limit;

//   const [courses, total] = await Promise.all([
//     this.db.course.findMany({
//       skip,
//       take: limit,
//       orderBy: { created_at: 'desc' },
//     }),
//     this.db.course.count(),
//   ]);

//   const totalPages = Math.ceil(total / limit);
//   const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
//   const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

//   return {
//     courses,
//     total,
//     totalPages,
//     currentPage: page,
//     pagesLeft,
//     totalItemsLeft,
//   };
// }

async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  const [courses, total] = await Promise.all([
    this.db.course.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
      select: {
        course_id: true,
        course_name: true,
        course_description: true,
        course_image: true,
        difficulty: true,
        course_duration: true,
        language: true,
        min_age: true,
        max_age: true,
        created_at: true,
        updated_at: true,
        category_id: true,
        teachers: true,
      },
    }),
    this.db.course.count(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    courses,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}



  async findByCategory(categoryId: string): Promise<Course[]> {
    return this.db.course.findMany({
      where: { category_id: categoryId },
      include: { category: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async update(id: string, courseData: Partial<Course>): Promise<Course> {
    return this.db.course.update({
      where: { course_id: id },
      data: courseData,
    });
  }

  async delete(id: string): Promise<Course> {
    return this.db.course.delete({
      where: { course_id: id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const course = await this.db.course.findUnique({
      where: { course_id: id },
      select: { course_id: true },
    });
    return !!course;
  }

  async categoryExists(categoryId: string): Promise<boolean> {
    const category = await this.db.category.findUnique({
      where: { category_id: categoryId },
      select: { category_id: true },
    });
    return !!category;
  }

  async hasModules(courseId: string): Promise<boolean> {
    const module = await this.db.module.findFirst({
      where: { course_id: courseId },
      select: { module_id: true },
    });
    return !!module;
  }

  async hasEnrollments(courseId: string): Promise<boolean> {
    const enrollment = await this.db.enrollment.findFirst({
      where: { course_id: courseId },
      select: { enrollment_id: true },
    });
    return !!enrollment;
  }

  async getCourseStats(courseId: string): Promise<{
    totalModules: number;
    totalStudents: number;
    totalAssignments: number;
  }> {
    const [totalModules, totalStudents, totalAssignments] = await Promise.all([
      this.db.module.count({ where: { course_id: courseId } }),
      this.db.enrollment.count({ where: { course_id: courseId } }),
      this.db.assignment.count({ where: { course_id: courseId } }),
    ]);

    return { totalModules, totalStudents, totalAssignments };
  }

  async getAllCountries() {
    return this.db.country.findMany({
      include: { zone: true, regional_config: true },
    });
  }

  async getPurchasedCourses(userId: string) {
    const enrollments = await this.db.enrollment.findMany({
      where: {
        user_id: userId,
        enrollment_type: 'paid',
        is_active: true,
      },
      include: { course: true },
    });

    return enrollments.map((e) => e.course);
  }

  async searchCourses(query: string, page: number = 1, limit: number = 10): Promise<{
    courses: Course[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      this.db.course.findMany({
        where: {
          OR: [
            { course_name: { contains: query, mode: 'insensitive' } },
            { course_description: { contains: query, mode: 'insensitive' } },
            { language: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        include: { category: true },
        orderBy: { created_at: 'desc' },
      }),
      this.db.course.count({
        where: {
          OR: [
            { course_name: { contains: query, mode: 'insensitive' } },
            { course_description: { contains: query, mode: 'insensitive' } },
            { language: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return { courses, total, totalPages: Math.ceil(total / limit) };
  }

  async getPricingForCourseAcrossCountries(courseId: string) {
    return this.db.coursePricing.findMany({
      where: { course_id: courseId, is_active: true },
      include: { country: true },
      orderBy: { effective_from: 'desc' },
    });
  }
}
