import { PrismaClient, Module } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class ModuleRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(moduleData: {
    course_id: string;
    module_title: string;
    duration: number;
    module_description?: string;
    student_note_link?: string;
    teacher_note_link?: string;
    PPT_link?: string;
  }): Promise<Module> {
    return this.db.module.create({
      data: moduleData,
    });
  }

  async findById(id: string): Promise<Module | null> {
    return this.db.module.findUnique({
      where: { module_id: id },
    });
  }

  async findByIdWithCourse(id: string) {
    return this.db.module.findUnique({
      where: { module_id: id },
      include: { 
        course: true, 
        sessions: true, 
        chapters: true,
        assignments: true,
      },
    });
  }

  async findByCourse(courseId: string): Promise<Module[]> {
    return this.db.module.findMany({
      where: { course_id: courseId },
     
      orderBy: { created_at: 'asc' },
    });
  }

  // async findAllWithCourse(): Promise<Module[]> {
  //   return this.db.module.findMany({
     
  //     orderBy: { created_at: 'desc' },
  //   });
  // }

//   async findAllWithCourseCursor(cursor?: string, limit: number = 10) {
//   const modules = await this.db.module.findMany({
//     take: limit,
//     skip: cursor ? 1 : 0, // skip the cursor itself if provided
//     cursor: cursor ? { module_id: cursor } : undefined,
//     include: { course: { select: { course_id: true, course_name: true } } },
//     orderBy: { created_at: 'desc' },
//   });

//   const nextCursor = modules.length === limit ? modules[modules.length - 1].module_id : null;

//   return { modules, nextCursor };
// }


// async findAllWithCourseCursor(limit: number = 10, cursor?: string | null) {
//     const modules = await this.db.module.findMany({
//       take: limit,
//       skip: cursor ? 1 : 0, // skip the cursor itself
//       cursor: cursor ? { module_id: cursor } : undefined,
//       orderBy: { created_at: 'desc' },
//       // include: { course: { select: { course_id: true, course_name: true } } },
//     });

//     const nextCursor = modules.length > 0 ? modules[modules.length - 1].module_id : null;

//     return { modules, nextCursor };
//   }
// async findAll(page: number = 1, limit: number = 10) {
//   const skip = (page - 1) * limit;

//   return this.db.module.findMany({
//     skip,
//     take: limit,
//     orderBy: { created_at: 'desc' },
//   });
// }
async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  const [modules, total] = await Promise.all([
    this.db.module.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    this.db.module.count(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    modules,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}



  async update(id: string, moduleData: Partial<Module>): Promise<Module> {
    return this.db.module.update({
      where: { module_id: id },
      data: moduleData,
    });
  }

  async delete(id: string): Promise<Module> {
    return this.db.module.delete({
      where: { module_id: id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const module = await this.db.module.findUnique({
      where: { module_id: id },
      select: { module_id: true },
    });
    return !!module;
  }

  async courseExists(courseId: string): Promise<boolean> {
    const course = await this.db.course.findUnique({
      where: { course_id: courseId },
      select: { course_id: true },
    });
    return !!course;
  }

  async hasChapters(moduleId: string): Promise<boolean> {
    const chapter = await this.db.chapter.findFirst({
      where: { module_id: moduleId },
      select: { chapter_id: true },
    });
    return !!chapter;
  }

  async hasAssignments(moduleId: string): Promise<boolean> {
    const assignment = await this.db.assignment.findFirst({
      where: { module_id: moduleId },
      select: { assignment_id: true },
    });
    return !!assignment;
  }

  async searchModules(query: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const modules = await this.db.module.findMany({
      where: {
        module_title: { contains: query, mode: 'insensitive' },
      },
     
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    });

    const total = await this.db.module.count({
      where: { module_title: { contains: query, mode: 'insensitive' } },
    });

    return { total, page, limit, modules };
  }

  async getModuleStats(moduleId: string) {
    // Example: total chapters and assignments in a module
    const chaptersCount = await this.db.chapter.count({
      where: { module_id: moduleId },
    });

    const assignmentsCount = await this.db.assignment.count({
      where: { module_id: moduleId },
    });

    return {
      moduleId,
      totalChapters: chaptersCount,
      totalAssignments: assignmentsCount,
    };
  }
}
