import { Request, Response } from 'express';
import { QuizAttemptService } from '../services/quizAttemptService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class QuizAttemptController {
  private quizAttemptService: QuizAttemptService;

  constructor() {
    this.quizAttemptService = new QuizAttemptService();
  }

  createQuizAttempt = asyncHandler(async (req: Request, res: Response) => {
    const attemptData = req.body;
    const attempt = await this.quizAttemptService.createQuizAttempt(attemptData);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Quiz attempt created successfully',
      data: attempt,
    });
  });

  getQuizAttemptById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const attempt = await this.quizAttemptService.getQuizAttemptById(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Quiz attempt retrieved successfully',
      data: attempt,
    });
  });

  updateQuizAttempt = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const attemptData = req.body;
    const updated = await this.quizAttemptService.updateQuizAttempt(id, attemptData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Quiz attempt updated successfully',
      data: updated,
    });
  });

  deleteQuizAttempt = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.quizAttemptService.deleteQuizAttempt(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Quiz attempt deleted successfully',
    });
  });



   // NEW: Get all users who attempted the same quiz
 

  // Get users by quiz ID
  getUsersByQuizId = asyncHandler(async (req: Request, res: Response) => {
    const { quiz_id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await this.quizAttemptService.getUsersByQuizId(quiz_id, page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Users retrieved successfully',
      ...result,
    });
  });

  // Get attempts by student ID
  getAttemptsByStudentId = asyncHandler(async (req: Request, res: Response) => {
    const { student_id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await this.quizAttemptService.getAttemptsByStudentId(student_id, page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Quiz attempts retrieved successfully',
      ...result,
    });
  });


}

export const quizAttemptController = new QuizAttemptController();
