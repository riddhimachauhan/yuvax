import { Prisma, PrismaClient, Assignment,AssignmentType  } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class AssignmentRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(assignmentData: {
    course_id: string;
    module_id: string;
    title: string;
    description: string;
    instructions?: string;
    resources?: any;
    max_score?: number;
    start_date?: Date;
    end_date?: Date;
    allow_late?: boolean;
    late_penalty?: number;
    type: AssignmentType;
    language?: string;
    starter_code?: string;
    metadata?: any;
    reward_points: number;
    created_by: string;
  }): Promise<Assignment> {
    return this.db.assignment.create({
      data: assignmentData,
    });
  }

  async findById(id: string): Promise<Assignment | null> {
    return this.db.assignment.findUnique({
      where: { assignment_id: id },
    });
  }

  async findByIdWithRelations(id: string) {
    return this.db.assignment.findUnique({
      where: { assignment_id: id },
      include: { 
        submissions: true, 
        course: true, 
        module: true,
        creator: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });
  }

  async findByCourse(courseId: string): Promise<Assignment[]> {
    return this.db.assignment.findMany({
      where: { course_id: courseId },
      include: { 
        submissions: true,
        module: true,
        creator: {
          select: {
            user_id: true,
            full_name: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findByModule(moduleId: string): Promise<Assignment[]> {
    return this.db.assignment.findMany({
      where: { module_id: moduleId },
      include: { 
        submissions: true,
        course: true,
        creator: {
          select: {
            user_id: true,
            full_name: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findByCreator(creatorId: string, page: number = 1, limit: number = 10): Promise<{
    assignments: Assignment[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [assignments, total] = await Promise.all([
      this.db.assignment.findMany({
        where: { created_by: creatorId },
        skip,
        take: limit,
        include: { 
          course: true,
          module: true,
          submissions: true,
        },
        orderBy: { created_at: 'desc' },
      }),
      this.db.assignment.count({
        where: { created_by: creatorId },
      }),
    ]);

    return {
      assignments,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  const [assignments, total] = await Promise.all([
    this.db.assignment.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    this.db.assignment.count(),
  ]);

   const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    assignments,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}


  async update(
    id: string,
    assignmentData: Prisma.AssignmentUpdateInput
  ): Promise<Assignment> {
    return this.db.assignment.update({
      where: { assignment_id: id },
      data: assignmentData,
    });
  }

  async delete(id: string): Promise<Assignment> {
    return this.db.assignment.delete({
      where: { assignment_id: id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const assignment = await this.db.assignment.findUnique({
      where: { assignment_id: id },
      select: { assignment_id: true },
    });
    return !!assignment;
  }

  async courseExists(courseId: string): Promise<boolean> {
    const course = await this.db.course.findUnique({
      where: { course_id: courseId },
      select: { course_id: true },
    });
    return !!course;
  }

  async moduleExists(moduleId: string, courseId?: string): Promise<boolean> {
    const whereClause: any = { module_id: moduleId };
    if (courseId) {
      whereClause.course_id = courseId;
    }

    const module = await this.db.module.findFirst({
      where: whereClause,
      select: { module_id: true },
    });
    return !!module;
  }

  async userExists(userId: string): Promise<boolean> {
    const user = await this.db.user.findUnique({
      where: { user_id: userId },
      select: { user_id: true },
    });
    return !!user;
  }

  async hasSubmissions(assignmentId: string): Promise<boolean> {
    const submission = await this.db.submission.findFirst({
      where: { assignment_id: assignmentId },
      select: { submission_id: true },
    });
    return !!submission;
  }

  async getAssignmentStats(assignmentId: string): Promise<{
    totalSubmissions: number;
    completedSubmissions: number;
    averageScore: number;
  }> {
    const [totalSubmissions, completedSubmissions, submissions] = await Promise.all([
      this.db.submission.count({
        where: { assignment_id: assignmentId },
      }),
      this.db.submission.count({
        where: { 
          assignment_id: assignmentId,
          graded_at: { not: null },
        },
      }),
      this.db.submission.findMany({
        where: { 
          assignment_id: assignmentId,
          graded_at: { not: null },
        },
        select: { marks_obtained : true },
      }),
    ]);

    const averageScore = submissions.length > 0 
      ? submissions.reduce((sum, sub) => sum + (sub.marks_obtained  || 0), 0) / submissions.length
      : 0;

    return {
      totalSubmissions,
      completedSubmissions,
      averageScore: Math.round(averageScore * 100) / 100,
    };
  }

  async searchAssignments(query: string, page: number = 1, limit: number = 10): Promise<{
    assignments: Assignment[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [assignments, total] = await Promise.all([
      this.db.assignment.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { language: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        include: { 
          course: true,
          module: true,
          creator: {
            select: {
              user_id: true,
              full_name:true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.db.assignment.count({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { language: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return {
      assignments,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
