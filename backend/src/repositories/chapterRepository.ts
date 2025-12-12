import { PrismaClient, Chapter } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class ChapterRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(chapterData: {
    module_id: string;
    chapter_name: string;
    description?: string;
    capacity?: number;
  }): Promise<Chapter> {
    return this.db.chapter.create({
      data: chapterData,
    });
  }

  async findById(id: string): Promise<Chapter | null> {
    return this.db.chapter.findUnique({
      where: { chapter_id: id },
    });
  }

  async findByIdWithRelations(id: string) {
    return this.db.chapter.findUnique({
      where: { chapter_id: id },
    });
  }

  async findByModule(moduleId: string): Promise<Chapter[]> {
    return this.db.chapter.findMany({
      where: { module_id: moduleId },
      orderBy: { created_at: 'asc' },
    });
  }

 async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  const [chapters, total] = await Promise.all([
    this.db.chapter.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    this.db.chapter.count(),
  ]);

 const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    chapters,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}


  async update(id: string, chapterData: Partial<Chapter>): Promise<Chapter> {
    return this.db.chapter.update({
      where: { chapter_id: id },
      data: chapterData,
    });
  }

  async delete(id: string): Promise<Chapter> {
    return this.db.chapter.delete({
      where: { chapter_id: id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const chapter = await this.db.chapter.findUnique({
      where: { chapter_id: id },
      select: { chapter_id: true },
    });
    return !!chapter;
  }

  async moduleExists(moduleId: string): Promise<boolean> {
    const module = await this.db.module.findUnique({
      where: { module_id: moduleId },
      select: { module_id: true },
    });
    return !!module;
  }

  async hasSessions(chapterId: string): Promise<boolean> {
    const session = await this.db.session.findFirst({
      where: { chapter_id: chapterId },
      select: { session_id: true },
    });
    return !!session;
  }

  async getChapterStats(chapterId: string): Promise<{
    totalSessions: number;
    totalStudents: number;
    averageAttendance: number;
  }> {
    const [totalSessions, sessions] = await Promise.all([
      this.db.session.count({
        where: { chapter_id: chapterId },
      }),
      this.db.session.findMany({
        where: { chapter_id: chapterId },
        include: { enrollments: true },
      }),
    ]);

    const totalStudents = sessions.reduce((sum, session) => sum + session.enrollments.length, 0);
    const averageAttendance = totalSessions > 0 ? totalStudents / totalSessions : 0;

    return {
      totalSessions,
      totalStudents,
      averageAttendance: Math.round(averageAttendance * 100) / 100,
    };
  }

  async searchChapters(query: string, page: number = 1, limit: number = 10): Promise<{
    chapters: Chapter[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [chapters, total] = await Promise.all([
      this.db.chapter.findMany({
        where: {
          OR: [
            { chapter_name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        // include: { 
        //   module: {
        //     include: {
        //       course: true,
        //     },
        //   },
        // },
        orderBy: { created_at: 'desc' },
      }),
      this.db.chapter.count({
        where: {
          OR: [
            { chapter_name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return {
      chapters,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
