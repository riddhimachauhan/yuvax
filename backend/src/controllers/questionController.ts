import { Request, Response } from 'express';
import { QuestionService } from '../services/questionService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class QuestionController {
  private questionService: QuestionService;

  constructor() {
    this.questionService = new QuestionService();
  }

  createQuestion = asyncHandler(async (req: Request, res: Response) => {
    const questionData = req.body;

    const question = await this.questionService.createQuestion(questionData);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Question created successfully',
      data: question,
    });
  });

  getQuestionById = asyncHandler(async (req: Request, res: Response) => {
    const { questionId } = req.params;

    const question = await this.questionService.getQuestionById(questionId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Question retrieved successfully',
      data: question,
    });
  });

  getAllQuestions = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await this.questionService.getAllQuestions(page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Questions retrieved successfully',
    data: result.questions,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
      totalItemsLeft: result.totalItemsLeft,
    },
  });
});


  getQuestionsByQuiz = asyncHandler(async (req: Request, res: Response) => {
    const { quizId } = req.params;

    const questions = await this.questionService.getQuestionsByQuiz(quizId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Questions retrieved successfully',
      data: questions,
    });
  });

  updateQuestion = asyncHandler(async (req: Request, res: Response) => {
    const { questionId } = req.params;
    const questionData = req.body;
    console.log("question data :", questionData)

    const question = await this.questionService.updateQuestion(questionId, questionData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Question updated successfully',
      data: question,
    });
  });

  deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
    const { questionId } = req.params;

    const result = await this.questionService.deleteQuestion(questionId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  getQuestionStats = asyncHandler(async (req: Request, res: Response) => {
    const { questionId } = req.params;

    const stats = await this.questionService.getQuestionStats(questionId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Question statistics retrieved successfully',
      data: stats,
    });
  });

  searchQuestions = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!query) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const result = await this.questionService.searchQuestions(query as string, page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Questions retrieved successfully',
      data: result,
    });
  });
}

// Export controller instance
export const questionController = new QuestionController();
