import { Request, Response } from 'express';
import { FeedbackService } from '../services/feedbackService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class FeedbackController {
  private feedbackService: FeedbackService;

  constructor() {
    this.feedbackService = new FeedbackService();
  }

  createFeedback = asyncHandler(async (req: Request, res: Response) => {
    const feedbackData = req.body;

    const feedback = await this.feedbackService.createFeedback(feedbackData);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Feedback created successfully',
      data: feedback,
    });
  });

  getFeedbackBySession = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;

    const feedbacks = await this.feedbackService.getFeedbackBySession(sessionId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: feedbacks,
    });
  });

  getFeedbackById = asyncHandler(async (req: Request, res: Response) => {
    const { feedbackId } = req.params;

    const feedback = await this.feedbackService.getFeedbackById(feedbackId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: feedback,
    });
  });

  updateFeedback = asyncHandler(async (req: Request, res: Response) => {
    const { feedbackId } = req.params;
    const feedbackData = req.body;

    const feedback = await this.feedbackService.updateFeedback(feedbackId, feedbackData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Feedback updated successfully',
      data: feedback,
    });
  });

  deleteFeedback = asyncHandler(async (req: Request, res: Response) => {
    const { feedbackId } = req.params;

    const result = await this.feedbackService.deleteFeedback(feedbackId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  getFeedbackByGiver = asyncHandler(async (req: Request, res: Response) => {
    const { giverId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await this.feedbackService.getFeedbackByGiver(giverId, page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: result,
    });
  });

  getFeedbackByTaker = asyncHandler(async (req: Request, res: Response) => {
    const { takerId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await this.feedbackService.getFeedbackByTaker(takerId, page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: result,
    });
  });

  getFeedbackStats = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const stats = await this.feedbackService.getFeedbackStats(userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Feedback statistics retrieved successfully',
      data: stats,
    });
  });

  getAverageRating = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const averageRating = await this.feedbackService.getAverageRating(userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Average rating retrieved successfully',
      data: { averageRating },
    });
  });
}

// Export controller instance
export const feedbackController = new FeedbackController();