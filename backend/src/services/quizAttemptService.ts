import { QuizAttemptRepository } from '../repositories/quizAttemptRepository';

import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export interface CreateQuizAttemptData {
  quiz_id: string;
  student_id: string;
}

export interface UpdateQuizAttemptData {
  score?: number;
  submitted_at?: Date;
  timer?: string[];
  AttemptedCount?: number;
  correctCount?: number;
}

export class QuizAttemptService {
  private quizAttemptRepository: QuizAttemptRepository;

  constructor() {
    this.quizAttemptRepository = new QuizAttemptRepository();
  }

  async createQuizAttempt(data: CreateQuizAttemptData) {
    // Validate quiz and student existence
    const attempt = await this.quizAttemptRepository.create(data);
    return attempt;
  }

  async getQuizAttemptById(id: string) {
    const attempt = await this.quizAttemptRepository.findById(id);
    if (!attempt) throw new CustomError('Quiz attempt not found', HTTP_STATUS.NOT_FOUND);
    return attempt;
  }

  async updateQuizAttempt(id: string, data: UpdateQuizAttemptData) {
    const attempt = await this.quizAttemptRepository.findById(id);
    if (!attempt) throw new CustomError('Quiz attempt not found', HTTP_STATUS.NOT_FOUND);
    return await this.quizAttemptRepository.update(id, data);
  }

  async deleteQuizAttempt(id: string) {
    const attempt = await this.quizAttemptRepository.findById(id);
    if (!attempt) throw new CustomError('Quiz attempt not found', HTTP_STATUS.NOT_FOUND);
    await this.quizAttemptRepository.delete(id);
  }

 

  // Users by quiz ID
  async getUsersByQuizId(quiz_id: string, page: number, limit: number) {
    const result = await this.quizAttemptRepository.findByQuizId(quiz_id, page, limit);

    if (!result.data || result.data.length === 0) {
      throw new CustomError('No attempts found for this quiz', HTTP_STATUS.NOT_FOUND);
    }

    // Map only student info
    result.data = result.data.map(a => a.student);
    return result;
  }

  // Attempts by student ID
  async getAttemptsByStudentId(student_id: string, page: number, limit: number) {
    const result = await this.quizAttemptRepository.findByStudentId(student_id, page, limit);

    if (!result.data || result.data.length === 0) {
      throw new CustomError('No quiz attempts found for this student', HTTP_STATUS.NOT_FOUND);
    }

    return result;
  }
 
  // NEW: Get all users who attempted a specific quiz




}
