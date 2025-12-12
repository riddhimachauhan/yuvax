import { PrismaClient, Feedback, FeedbackRole } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class FeedbackRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(feedbackData: {
    sessionId?: string;
    giverId: string;
    takerId: string;
    rating: number;
    comments: string;
    giverRole: FeedbackRole;
    takerRole: FeedbackRole;
  }): Promise<Feedback> {
    return this.db.feedback.create({
      data: feedbackData,
    });
  }

  async findById(id: string): Promise<Feedback | null> {
    return this.db.feedback.findUnique({
      where: { feedback_id: id },
    });
  }

  async findByIdWithRelations(id: string) {
    return this.db.feedback.findUnique({
      where: { feedback_id: id },
      include: {
        session: true,
        giver: {
          select: {
            user_id: true,
            full_name:true,
            email: true,
            role: true,
          },
        },
        taker: {
          select: {
            user_id: true,
            full_name:true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findBySession(sessionId: string): Promise<Feedback[]> {
    return this.db.feedback.findMany({
      where: { sessionId },
      include: {
        session: true,
        giver: {
          select: {
            user_id: true,
            full_name:true,
            email: true,
            role: true,
          },
        },
        taker: {
          select: {
            user_id: true,
            full_name:true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByGiver(giverId: string, page: number = 1, limit: number = 10): Promise<{
    feedbacks: Feedback[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [feedbacks, total] = await Promise.all([
      this.db.feedback.findMany({
        where: { giverId },
        skip,
        take: limit,
        include: {
          session: true,
          taker: {
            select: {
              user_id: true,
              full_name:true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.db.feedback.count({
        where: { giverId },
      }),
    ]);

    return {
      feedbacks,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByTaker(takerId: string, page: number = 1, limit: number = 10): Promise<{
    feedbacks: Feedback[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [feedbacks, total] = await Promise.all([
      this.db.feedback.findMany({
        where: { takerId },
        skip,
        take: limit,
        include: {
          session: true,
          giver: {
            select: {
              user_id: true,
              full_name:true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.db.feedback.count({
        where: { takerId },
      }),
    ]);

    return {
      feedbacks,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findBySessionAndUsers(sessionId: string, giverId: string, takerId: string): Promise<Feedback | null> {
    return this.db.feedback.findFirst({
      where: {
        sessionId,
        giverId,
        takerId,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{
    feedbacks: Feedback[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [feedbacks, total] = await Promise.all([
      this.db.feedback.findMany({
        skip,
        take: limit,
        include: {
          session: true,
          giver: {
            select: {
              user_id: true,
              full_name:true,
              email: true,
              role: true,
            },
          },
          taker: {
            select: {
              user_id: true,
              full_name:true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.db.feedback.count(),
    ]);

    return {
      feedbacks,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: string, feedbackData: Partial<Feedback>): Promise<Feedback> {
    return this.db.feedback.update({
      where: { feedback_id: id },
      data: feedbackData,
    });
  }

  async delete(id: string): Promise<Feedback> {
    return this.db.feedback.delete({
      where: { feedback_id: id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const feedback = await this.db.feedback.findUnique({
      where: { feedback_id: id },
      select: { feedback_id: true },
    });
    return !!feedback;
  }

  async sessionExists(sessionId: string): Promise<boolean> {
    const session = await this.db.session.findUnique({
      where: { session_id: sessionId },
      select: { session_id: true },
    });
    return !!session;
  }

  async userExists(userId: string): Promise<boolean> {
    const user = await this.db.user.findUnique({
      where: { user_id: userId },
      select: { user_id: true },
    });
    return !!user;
  }

  async getFeedbackStats(userId: string): Promise<{
    totalGiven: number;
    totalReceived: number;
    averageGiven: number;
    averageReceived: number;
  }> {
    const [givenFeedbacks, receivedFeedbacks] = await Promise.all([
      this.db.feedback.findMany({
        where: { giverId: userId },
        select: { rating: true },
      }),
      this.db.feedback.findMany({
        where: { takerId: userId },
        select: { rating: true },
      }),
    ]);

    const totalGiven = givenFeedbacks.length;
    const totalReceived = receivedFeedbacks.length;
    
    const averageGiven = totalGiven > 0 
      ? givenFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / totalGiven
      : 0;
    
    const averageReceived = totalReceived > 0 
      ? receivedFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / totalReceived
      : 0;

    return {
      totalGiven,
      totalReceived,
      averageGiven: Math.round(averageGiven * 100) / 100,
      averageReceived: Math.round(averageReceived * 100) / 100,
    };
  }

  async getAverageRating(userId: string): Promise<number> {
    const result = await this.db.feedback.aggregate({
      where: { takerId: userId },
      _avg: { rating: true },
    });

    return Math.round((result._avg.rating || 0) * 100) / 100;
  }

  async getRatingDistribution(userId: string): Promise<{
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
  }> {
    const [rating1, rating2, rating3, rating4, rating5] = await Promise.all([
      this.db.feedback.count({ where: { takerId: userId, rating: 1 } }),
      this.db.feedback.count({ where: { takerId: userId, rating: 2 } }),
      this.db.feedback.count({ where: { takerId: userId, rating: 3 } }),
      this.db.feedback.count({ where: { takerId: userId, rating: 4 } }),
      this.db.feedback.count({ where: { takerId: userId, rating: 5 } }),
    ]);

    return { rating1, rating2, rating3, rating4, rating5 };
  }

  async searchFeedbacks(query: string, page: number = 1, limit: number = 10): Promise<{
    feedbacks: Feedback[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [feedbacks, total] = await Promise.all([
      this.db.feedback.findMany({
        where: {
          comments: { contains: query, mode: 'insensitive' },
        },
        skip,
        take: limit,
        include: {
          session: true,
          giver: {
            select: {
              user_id: true,
              full_name:true,
              email: true,
              role: true,
            },
          },
          taker: {
            select: {
              user_id: true,
              full_name:true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.db.feedback.count({
        where: {
          comments: { contains: query, mode: 'insensitive' },
        },
      }),
    ]);

    return {
      feedbacks,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
