import { DashboardRepository } from '../repositories/dashboardRepository';
import { mapDashboardResponse } from '../dto/response/dashboardResponse';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { redisClient } from '../lib/redis';

export class DashboardService {
  private dashboardRepository: DashboardRepository;
  private readonly CACHE_KEYS = {
    DASHBOARD_PREFIX: 'dashboard:user:',
  };
  private readonly CACHE_EXPIRATION = 300; // 5 minutes

  constructor() {
    this.dashboardRepository = new DashboardRepository();
  }

  /**
   * Build full dashboard overview for a user.
   * Cached per-user for CACHE_EXPIRATION seconds.
   */
  async buildOverview(userId: string) {

    console.log("user ID :", userId)

    if (!userId) {
      throw new CustomError('Missing userId', HTTP_STATUS.BAD_REQUEST);
    }

    const cacheKey = `${this.CACHE_KEYS.DASHBOARD_PREFIX}${userId}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) return JSON.parse(cached);

    const [
      quizStats,
      attendanceStats,
      enrollmentStats,
      sessionTimes,
      submissionStats,
      notificationsCount,
      streakXp
    ] = await Promise.all([
      this.dashboardRepository.getQuizStats(userId),
      this.dashboardRepository.getAttendanceStats(userId),
      this.dashboardRepository.getEnrollmentStats(userId),
      this.dashboardRepository.getStudyTime(userId),
      this.dashboardRepository.getSubmissionStats(userId),
      this.dashboardRepository.getNotificationsCount(userId),
      this.dashboardRepository.getStreakAndXp(userId)
    ]);

    const dto = mapDashboardResponse({
      quizStats,
      attendanceStats,
      enrollmentStats,
      sessionTimes,
      submissionStats,
      notificationsCount,
      streakXp
    });

    await redisClient.setEx(cacheKey, this.CACHE_EXPIRATION, JSON.stringify(dto));
    return dto;
  }

  /**
   * Invalidate cached dashboard for a user.
   * If userId omitted invalidate nothing (explicit is safer).
   */
  async invalidateDashboardCache(userId?: string) {
    if (!userId) return;
    const cacheKey = `${this.CACHE_KEYS.DASHBOARD_PREFIX}${userId}`;
    await redisClient.del(cacheKey);
  }

  // Optional granular pass-throughs (useful for controllers or partial refresh)
  async getQuizStats(userId: string) {
    if (!userId) throw new CustomError('Missing userId', HTTP_STATUS.BAD_REQUEST);
    return this.dashboardRepository.getQuizStats(userId);
  }

  async getAttendanceStats(userId: string) {
    if (!userId) throw new CustomError('Missing userId', HTTP_STATUS.BAD_REQUEST);
    return this.dashboardRepository.getAttendanceStats(userId);
  }

  async getEnrollmentStats(userId: string) {
    if (!userId) throw new CustomError('Missing userId', HTTP_STATUS.BAD_REQUEST);
    return this.dashboardRepository.getEnrollmentStats(userId);
  }

  async getStudyTime(userId: string) {
    if (!userId) throw new CustomError('Missing userId', HTTP_STATUS.BAD_REQUEST);
    return this.dashboardRepository.getStudyTime(userId);
  }

  async getSubmissionStats(userId: string) {
    if (!userId) throw new CustomError('Missing userId', HTTP_STATUS.BAD_REQUEST);
    return this.dashboardRepository.getSubmissionStats(userId);
  }

  async getNotificationsCount(userId: string) {
    if (!userId) throw new CustomError('Missing userId', HTTP_STATUS.BAD_REQUEST);
    return this.dashboardRepository.getNotificationsCount(userId);
  }

  async getStreakAndXp(userId: string) {
    if (!userId) throw new CustomError('Missing userId', HTTP_STATUS.BAD_REQUEST);
    return this.dashboardRepository.getStreakAndXp(userId);
  }

  async getStudentCourses(userId: string) {
    if (!userId) throw new CustomError('Missing userId', HTTP_STATUS.BAD_REQUEST);
    return this.dashboardRepository.getStudentCourses(userId);
  }
}
