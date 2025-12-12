import { PrismaClient, Question } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class QuestionRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(questionData: {
    quiz_id: string;
    text: string;
    marks: number;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct_answer: number; // 1-4
  }): Promise<Question> {
    return this.db.question.create({
      data: questionData,
    });
  }

  async findById(id: string): Promise<Question | null> {
    return this.db.question.findUnique({
      where: { question_id: id },
    });
  }

  async findByIdWithRelations(id: string) {
    return this.db.question.findUnique({
      where: { question_id: id },
      include: {
        quiz: {
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
          },
        },
        answers: true,
      },
    });
  }

  async findByQuiz(quizId: string): Promise<Question[]> {
    return this.db.question.findMany({
      where: { quiz_id: quizId },
      orderBy: { created_at: 'asc' },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  const [questions, total] = await Promise.all([
    this.db.question.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    this.db.question.count(),
  ]);

 const totalPages = Math.ceil(total / limit);
  const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  return {
    questions,
    total,
    totalPages,
    currentPage: page,
    pagesLeft,
    totalItemsLeft,
  };
}

  async update(id: string, questionData: Partial<Question>): Promise<Question> {
    return this.db.question.update({
      where: { question_id: id },
      data: questionData,
    });
  }

  async delete(id: string): Promise<Question> {
    return this.db.question.delete({
      where: { question_id: id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const question = await this.db.question.findUnique({
      where: { question_id: id },
      select: { question_id: true },
    });
    return !!question;
  }

  async quizExists(quizId: string): Promise<boolean> {
    const quiz = await this.db.quiz.findUnique({
      where: { quiz_id: quizId },
      select: { quiz_id: true },
    });
    return !!quiz;
  }

  async getQuestionCountByQuiz(quizId: string): Promise<number> {
    return this.db.question.count({
      where: { quiz_id: quizId },
    });
  }

  async hasAnswers(questionId: string): Promise<boolean> {
    const answer = await this.db.answer.findFirst({
      where: { question_id: questionId },
      select: { answer_id: true },
    });
    return !!answer;
  }

  async findDuplicateQuestion(quizId: string, text: string): Promise<Question | null> {
    return this.db.question.findFirst({
      where: {
        quiz_id: quizId,
        text: { equals: text, mode: 'insensitive' },
      },
    });
  }

  async getQuestionStats(questionId: string): Promise<{
    totalAnswers: number;
    correctAnswers: number;
    incorrectAnswers: number;
    accuracy: number;
  }> {
    const [totalAnswers, correctAnswers] = await Promise.all([
      this.db.answer.count({
        where: { question_id: questionId },
      }),
      this.db.answer.count({
        where: { 
          question_id: questionId,
          is_correct: true,
        },
      }),
    ]);

    const incorrectAnswers = totalAnswers - correctAnswers;
    const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

    return {
      totalAnswers,
      correctAnswers,
      incorrectAnswers,
      accuracy: Math.round(accuracy * 100) / 100,
    };
  }

  async searchQuestions(query: string, page: number = 1, limit: number = 10): Promise<{
    questions: Question[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [questions, total] = await Promise.all([
      this.db.question.findMany({
        where: {
          OR: [
            { text: { contains: query, mode: 'insensitive' } },
            { option1: { contains: query, mode: 'insensitive' } },
            { option2: { contains: query, mode: 'insensitive' } },
            { option3: { contains: query, mode: 'insensitive' } },
            { option4: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        include: {
          quiz: {
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
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.db.question.count({
        where: {
          OR: [
            { text: { contains: query, mode: 'insensitive' } },
            { option1: { contains: query, mode: 'insensitive' } },
            { option2: { contains: query, mode: 'insensitive' } },
            { option3: { contains: query, mode: 'insensitive' } },
            { option4: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return {
      questions,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
