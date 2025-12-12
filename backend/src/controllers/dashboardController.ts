import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboardService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  getOverview = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id;
    console.log("User id :", userId)
    const data = await this.dashboardService.buildOverview(userId);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Dashboard overview retrieved successfully',
      data,
    });
  });

  getQuizStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id;
    const data = await this.dashboardService.getQuizStats(userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  getAttendanceStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id;
    const data = await this.dashboardService.getAttendanceStats(userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  getEnrollmentStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id;
    const data = await this.dashboardService.getEnrollmentStats(userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  getStudyTime = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id;
    const data = await this.dashboardService.getStudyTime(userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  getSubmissionStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id;
    const data = await this.dashboardService.getSubmissionStats(userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  getNotificationsCount = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id;
    const data = await this.dashboardService.getNotificationsCount(userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  getStreakAndXp = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id;
    const data = await this.dashboardService.getStreakAndXp(userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  // Optional: invalidate cache for current user or for a userId passed as param
  invalidateCache = asyncHandler(async (req: Request, res: Response) => {
    const targetUserId = (req.params as any).userId || (req as any).user?.user_id;
    await this.dashboardService.invalidateDashboardCache(targetUserId);
    return res.status(HTTP_STATUS.OK).json({ success: true, message: 'Dashboard cache invalidated' });
  });

  getStudentCourses = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id;
    const data = await this.dashboardService.getStudentCourses(userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  getStudentCoursesByUserId = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params as any;
    const data = await this.dashboardService.getStudentCourses(userId);
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  });
}

// Export controller instance
export const dashboardController = new DashboardController();
