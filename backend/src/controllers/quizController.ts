import { Request, Response } from 'express';
import { QuizService } from '../services/quizService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class QuizController {
  private quizService: QuizService;

  constructor() {
    this.quizService = new QuizService();
  }

  createQuiz = asyncHandler(async (req: Request, res: Response) => {
    const quizData = req.body;

    const quiz = await this.quizService.createQuiz(quizData);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Quiz created successfully',
      data: quiz,
    });
  });

  getQuizById = asyncHandler(async (req: Request, res: Response) => {
    const { quizId } = req.params;

    const quiz = await this.quizService.getQuizById(quizId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Quiz retrieved successfully',
      data: quiz,
    });
  });

  getAllQuizzes = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await this.quizService.getAllQuizzes(page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Quizzes retrieved successfully',
    data: result.quizzes,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
      totalItemsLeft: result.totalItemsLeft,
    },
  });
});


  getQuizzesByChapter = asyncHandler(async (req: Request, res: Response) => {
    const { chapterId } = req.params;

    const quizzes = await this.quizService.getQuizzesByChapter(chapterId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Quizzes retrieved successfully',
      data: quizzes,
    });
  });

  updateQuiz = asyncHandler(async (req: Request, res: Response) => {
    const { quizId } = req.params;
    const quizData = req.body;

    const quiz = await this.quizService.updateQuiz(quizId, quizData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Quiz updated successfully',
      data: quiz,
    });
  });

  deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
    const { quizId } = req.params;

    const result = await this.quizService.deleteQuiz(quizId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  getQuizStats = asyncHandler(async (req: Request, res: Response) => {
    const { quizId } = req.params;

    const stats = await this.quizService.getQuizStats(quizId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Quiz statistics retrieved successfully',
      data: stats,
    });
  });

  searchQuizzes = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!query) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const result = await this.quizService.searchQuizzes(query as string, page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Quizzes retrieved successfully',
      data: result,
    });
  });

  getUserPurchasedQuizzes = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id || req.params.userId;
    
    console.log("userId :",userId)

    const quizzes = await this.quizService.getQuizzesForPurchasedCourses(userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Quizzes for purchased courses retrieved successfully',
      data: quizzes,
    });
  });
}

// Export controller instance
export const quizController = new QuizController();
