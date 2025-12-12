import { QuizRepository } from '../repositories/quizRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { QuizType } from '@prisma/client';

export interface CreateQuizData {
  chapter_id: string;
  title: string;
  description?: string;
  type?: QuizType;
  total_marks?: number;
}

export interface UpdateQuizData {
  title?: string;
  description?: string;
  type?: QuizType;
  total_marks?: number;
}

export class QuizService {
  private quizRepository: QuizRepository;

  constructor() {
    this.quizRepository = new QuizRepository();
  }

  async createQuiz(quizData: CreateQuizData) {
    // Validate required fields
    if (!quizData.chapter_id || !quizData.title) {
      throw new CustomError('chapter_id and title are required', HTTP_STATUS.BAD_REQUEST);
    }

    // Check if chapter exists
    const chapterExists = await this.quizRepository.chapterExists(quizData.chapter_id);
    if (!chapterExists) {
      throw new CustomError('Chapter not found', HTTP_STATUS.BAD_REQUEST);
    }

    const quiz = await this.quizRepository.create(quizData as any);
    return quiz;
  }

  async getQuizById(quizId: string) {
    const quiz = await this.quizRepository.findByIdWithRelations(quizId);
    if (!quiz) {
      throw new CustomError('Quiz not found', HTTP_STATUS.NOT_FOUND);
    }

    return quiz;
  }

 async getAllQuizzes(page: number = 1, limit: number = 10) {
  return await this.quizRepository.findAll(page, limit);
}


  async getQuizzesByChapter(chapterId: string) {
    // Check if chapter exists
    const chapterExists = await this.quizRepository.chapterExists(chapterId);
    if (!chapterExists) {
      throw new CustomError('Chapter not found', HTTP_STATUS.NOT_FOUND);
    }

    const quizzes = await this.quizRepository.findByChapter(chapterId);
    return quizzes;
  }

  async updateQuiz(quizId: string, quizData: UpdateQuizData) {
    // Check if quiz exists
    const existingQuiz = await this.quizRepository.findById(quizId);
    if (!existingQuiz) {
      throw new CustomError('Quiz not found', HTTP_STATUS.NOT_FOUND);
    }

    const updatedQuiz = await this.quizRepository.update(quizId, quizData);
    return updatedQuiz;
  }

  async deleteQuiz(quizId: string) {
    // Check if quiz exists
    const existingQuiz = await this.quizRepository.findById(quizId);
    if (!existingQuiz) {
      throw new CustomError('Quiz not found', HTTP_STATUS.NOT_FOUND);
    }

    // Check if quiz has attempts
    const hasAttempts = await this.quizRepository.hasAttempts(quizId);
    if (hasAttempts) {
      throw new CustomError('Cannot delete quiz with existing attempts', HTTP_STATUS.BAD_REQUEST);
    }

    await this.quizRepository.delete(quizId);
    return { message: 'Quiz deleted successfully' };
  }

  async getQuizStats(quizId: string) {
    const quiz = await this.quizRepository.findById(quizId);
    if (!quiz) {
      throw new CustomError('Quiz not found', HTTP_STATUS.NOT_FOUND);
    }

    return await this.quizRepository.getQuizStats(quizId);
  }

  async searchQuizzes(query: string, page: number = 1, limit: number = 10) {
    const result = await this.quizRepository.searchQuizzes(query, page, limit);
    return result;
  }

  async getQuizzesForPurchasedCourses(userId: string) {
    if (!userId) {
      throw new CustomError('userId is required', HTTP_STATUS.BAD_REQUEST);
    }

    const quizzes = await this.quizRepository.findByUserPurchasedCourses(userId);
    return quizzes;
  }
}
