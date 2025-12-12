import { PrismaClient, QuizAttempt, Prisma } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class QuizAttemptRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: {
    quiz_id: string;
    student_id: string;
  }): Promise<QuizAttempt> {
    return this.db.quizAttempt.create({ data });
  }

  async findById(id: string): Promise<QuizAttempt | null> {
    return this.db.quizAttempt.findUnique({
      where: { attempt_id: id },
      include: { quiz: true, student: true, answers: true },
    });
  }

  async update(id: string, data: Partial<QuizAttempt>): Promise<QuizAttempt> {
    return this.db.quizAttempt.update({
      where: { attempt_id: id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.quizAttempt.delete({ where: { attempt_id: id } });
  }

  
    async findByQuizId(
    quiz_id: string,
    page: number,
    limit: number
  ): Promise<{
    data: (QuizAttempt & { student: any })[];
    total: number;
    totalPages: number;
    currentPage: number;
    pagesLeft: number;
    totalItemsLeft: number;
  }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.db.quizAttempt.findMany({
        where: { quiz_id },
        include: { student: true },
        skip,
        take: limit,
      }),
      this.db.quizAttempt.count({ where: { quiz_id } }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagesLeft = totalPages - page;
    const totalItemsLeft = total - page * limit;

    return {
      data,
      total,
      totalPages,
      currentPage: page,
      pagesLeft: pagesLeft > 0 ? pagesLeft : 0,
      totalItemsLeft: totalItemsLeft > 0 ? totalItemsLeft : 0,
    };
  }

  // Get attempts by student with pagination and full pagination info
  async findByStudentId(
    student_id: string,
    page: number,
    limit: number
  ): Promise<{
    data: (QuizAttempt & { quiz: any })[];
    total: number;
    totalPages: number;
    currentPage: number;
    pagesLeft: number;
    totalItemsLeft: number;
  }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.db.quizAttempt.findMany({
        where: { student_id },
        include: { quiz: true },
        skip,
        take: limit,
      }),
      this.db.quizAttempt.count({ where: { student_id } }),
    ]);

     const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

    return {
      data,
      total,
      totalPages,
      currentPage: page,
      pagesLeft: pagesLeft ,
      totalItemsLeft: totalItemsLeft ,
  }


};
}


