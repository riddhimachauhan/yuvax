import { PrismaClient, Quiz,QuizType } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class QuizRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(quizData: {
    module_id: string;
    chapter_id: string;
    title: string;
    description?: string;
    type?: QuizType;
    total_marks: number;
  }): Promise<Quiz> {
    return this.db.quiz.create({
      data: quizData,
    });
  }

  async findById(id: string): Promise<Quiz | null> {
    return this.db.quiz.findUnique({
      where: { quiz_id: id },
    });
  }

  async findByIdWithRelations(id: string) {
    return this.db.quiz.findUnique({
      where: { quiz_id: id },
      include: {
        chapter: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
        questions: true,
        attempts: true,
      },
    });
  }

  async findByChapter(chapterId: string): Promise<Quiz[]> {
    return this.db.quiz.findMany({
      where: { chapter_id: chapterId },
      include: {
        questions: true,
        attempts: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  const [quizzes, total] = await Promise.all([
    this.db.quiz.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    this.db.quiz.count(),
  ]);

 const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    quizzes,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}


  async update(id: string, quizData: Partial<Quiz>): Promise<Quiz> {
    return this.db.quiz.update({
      where: { quiz_id: id },
      data: quizData,
    });
  }

  async delete(id: string): Promise<Quiz> {
    return this.db.quiz.delete({
      where: { quiz_id: id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const quiz = await this.db.quiz.findUnique({
      where: { quiz_id: id },
      select: { quiz_id: true },
    });
    return !!quiz;
  }

  async chapterExists(chapterId: string): Promise<boolean> {
    const chapter = await this.db.chapter.findUnique({
      where: { chapter_id: chapterId },
      select: { chapter_id: true },
    });
    return !!chapter;
  }

  async hasQuestions(quizId: string): Promise<boolean> {
    const question = await this.db.question.findFirst({
      where: { quiz_id: quizId },
      select: { question_id: true },
    });
    return !!question;
  }

  async hasAttempts(quizId: string): Promise<boolean> {
    const attempt = await this.db.quizAttempt.findFirst({
      where: { quiz_id: quizId },
      select: { attempt_id: true },
    });
    return !!attempt;
  }

  async getQuizStats(quizId: string): Promise<{
    totalQuestions: number;
    totalAttempts: number;
    averageScore: number;
    highestScore: number;
  }> {
    const [totalQuestions, attempts] = await Promise.all([
      this.db.question.count({
        where: { quiz_id: quizId },
      }),
      this.db.quizAttempt.findMany({
        where: { quiz_id: quizId },
        select: { score: true },
      }),
    ]);

    const totalAttempts = attempts.length;
    const averageScore = totalAttempts > 0 
      ? attempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / totalAttempts
      : 0;
    const highestScore = totalAttempts > 0 
      ? Math.max(...attempts.map(attempt => attempt.score || 0))
      : 0;

    return {
      totalQuestions,
      totalAttempts,
      averageScore: Math.round(averageScore * 100) / 100,
      highestScore,
    };
  }

  async searchQuizzes(query: string, page: number = 1, limit: number = 10): Promise<{
    quizzes: Quiz[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [quizzes, total] = await Promise.all([
      this.db.quiz.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        include: {
          chapter: {
            include: {
              module: {
                include: {
                  course: true,
                },
              },
            },
          },
          questions: true,
        },
        orderBy: { created_at: 'desc' },
      }),
      this.db.quiz.count({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return {
      quizzes,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByUserPurchasedCourses(userId: string) {
    // Get active paid enrollments for this user
    const enrollments = await this.db.enrollment.findMany({
      where: { user_id: userId, is_active: true, enrollment_type: 'paid' },
      select: { course_id: true },
    });

    const courseIds = Array.from(new Set(enrollments.map((e) => e.course_id)));
    if (courseIds.length === 0) return [] as Quiz[];
    
    console.log("courseIds :",courseIds)
    console.log("enrollments :",enrollments)

    const quizzes = await this.db.quiz.findMany({
      where: {
        chapter: {
          module: {
            course_id: { in: courseIds },
          },
        },
      },
      include: {
        chapter: {
          include: {
            module: {
              include: { course: { select: { course_id: true, course_name: true } } },
            },
          },
        },
        questions: true,
      },
      orderBy: { created_at: 'desc' },
    });
    
    console.log("quizes:",quizzes)

    return this.db.quiz.findMany({
      where: {
        chapter: {
          module: {
            course_id: { in: courseIds },
          },
        },
      },
      include: {
        chapter: {
          include: {
            module: {
              include: { course: { select: { course_id: true, course_name: true } } },
            },
          },
        },
        questions: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }
}
