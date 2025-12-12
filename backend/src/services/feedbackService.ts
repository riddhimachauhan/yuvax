import { FeedbackRepository } from '../repositories/feedbackRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export interface CreateFeedbackData {
  sessionId: string;
  giverId: string;
  takerId: string;
  rating: number;
  comments?: string;
  giverRole: 'STUDENT' | 'TEACHER';
  takerRole: 'STUDENT' | 'TEACHER';
}

export interface UpdateFeedbackData {
  rating?: number;
  comments?: string;
}

export class FeedbackService {
  private feedbackRepository: FeedbackRepository;

  constructor() {
    this.feedbackRepository = new FeedbackRepository();
  }

  async createFeedback(feedbackData: CreateFeedbackData) {
    // Validate required fields
    if (!feedbackData.sessionId || !feedbackData.giverId || !feedbackData.takerId || !feedbackData.rating) {
      throw new CustomError('Missing required fields', HTTP_STATUS.BAD_REQUEST);
    }

    // Validate rating range
    if (feedbackData.rating < 1 || feedbackData.rating > 5) {
      throw new CustomError('Rating must be between 1 and 5', HTTP_STATUS.BAD_REQUEST);
    }

    // Validate roles
    const validRoles = ['STUDENT', 'TEACHER'];
    if (!validRoles.includes(feedbackData.giverRole) || !validRoles.includes(feedbackData.takerRole)) {
      throw new CustomError('Invalid role', HTTP_STATUS.BAD_REQUEST);
    }

    // Check if session exists
    const sessionExists = await this.feedbackRepository.sessionExists(feedbackData.sessionId);
    if (!sessionExists) {
      throw new CustomError('Session not found', HTTP_STATUS.BAD_REQUEST);
    }

    // Check if giver exists
    const giverExists = await this.feedbackRepository.userExists(feedbackData.giverId);
    if (!giverExists) {
      throw new CustomError('Giver not found', HTTP_STATUS.BAD_REQUEST);
    }

    // Check if taker exists
    const takerExists = await this.feedbackRepository.userExists(feedbackData.takerId);
    if (!takerExists) {
      throw new CustomError('Taker not found', HTTP_STATUS.BAD_REQUEST);
    }

    // Check if feedback already exists for this session and giver-taker pair
    const existingFeedback = await this.feedbackRepository.findBySessionAndUsers(
      feedbackData.sessionId,
      feedbackData.giverId,
      feedbackData.takerId
    );
    if (existingFeedback) {
      throw new CustomError('Feedback already exists for this session and user pair', HTTP_STATUS.CONFLICT);
    }

    const feedback = await this.feedbackRepository.create(feedbackData as any);
    return feedback;
  }

  async getFeedbackBySession(sessionId: string) {
    // Check if session exists
    const sessionExists = await this.feedbackRepository.sessionExists(sessionId);
    if (!sessionExists) {
      throw new CustomError('Session not found', HTTP_STATUS.NOT_FOUND);
    }

    const feedbacks = await this.feedbackRepository.findBySession(sessionId);
    return feedbacks;
  }

  async getFeedbackById(feedbackId: string) {
    const feedback = await this.feedbackRepository.findByIdWithRelations(feedbackId);
    if (!feedback) {
      throw new CustomError('Feedback not found', HTTP_STATUS.NOT_FOUND);
    }

    return feedback;
  }

  async updateFeedback(feedbackId: string, feedbackData: UpdateFeedbackData) {
    // Check if feedback exists
    const existingFeedback = await this.feedbackRepository.findById(feedbackId);
    if (!existingFeedback) {
      throw new CustomError('Feedback not found', HTTP_STATUS.NOT_FOUND);
    }

    // Validate rating range if being updated
    if (feedbackData.rating !== undefined && (feedbackData.rating < 1 || feedbackData.rating > 5)) {
      throw new CustomError('Rating must be between 1 and 5', HTTP_STATUS.BAD_REQUEST);
    }

    const updatedFeedback = await this.feedbackRepository.update(feedbackId, feedbackData);
    return updatedFeedback;
  }

  async deleteFeedback(feedbackId: string) {
    // Check if feedback exists
    const existingFeedback = await this.feedbackRepository.findById(feedbackId);
    if (!existingFeedback) {
      throw new CustomError('Feedback not found', HTTP_STATUS.NOT_FOUND);
    }

    await this.feedbackRepository.delete(feedbackId);
    return { message: 'Feedback deleted successfully' };
  }

  async getFeedbackByGiver(giverId: string, page: number = 1, limit: number = 10) {
    // Check if giver exists
    const giverExists = await this.feedbackRepository.userExists(giverId);
    if (!giverExists) {
      throw new CustomError('Giver not found', HTTP_STATUS.NOT_FOUND);
    }

    const result = await this.feedbackRepository.findByGiver(giverId, page, limit);
    return result;
  }

  async getFeedbackByTaker(takerId: string, page: number = 1, limit: number = 10) {
    // Check if taker exists
    const takerExists = await this.feedbackRepository.userExists(takerId);
    if (!takerExists) {
      throw new CustomError('Taker not found', HTTP_STATUS.NOT_FOUND);
    }

    const result = await this.feedbackRepository.findByTaker(takerId, page, limit);
    return result;
  }

  async getFeedbackStats(userId: string) {
    // Check if user exists
    const userExists = await this.feedbackRepository.userExists(userId);
    if (!userExists) {
      throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    return await this.feedbackRepository.getFeedbackStats(userId);
  }

  async getAverageRating(userId: string) {
    // Check if user exists
    const userExists = await this.feedbackRepository.userExists(userId);
    if (!userExists) {
      throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    return await this.feedbackRepository.getAverageRating(userId);
  }
}
