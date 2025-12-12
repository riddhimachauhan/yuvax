import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/errorHandler";
import { HTTP_STATUS } from "../utils/constants";
import { WherebyService } from "../services/wherebyService";

export class WherebyController {
  private wherebyService: WherebyService;

  constructor() {
    this.wherebyService = new WherebyService();
  }

  scheduleWherebyClass = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.body as { sessionId: string };
    const result = await this.wherebyService.scheduleWherebyClass(sessionId);
    res.status(HTTP_STATUS.OK).json({ success: true, ...result });
  });

  joinWherebyClass = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId, userId } = req.body as { sessionId: string; userId: string };
    const result = await this.wherebyService.joinWherebyClass(sessionId, userId);
    res.status(HTTP_STATUS.OK).json(result);
  });

  getUserClasses = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params as { userId: string };
    const data = await this.wherebyService.getUserClasses(userId);
    res.status(HTTP_STATUS.OK).json(data);
  });

  getTeacherClasses = asyncHandler(async (req: Request, res: Response) => {
    const { teacherId } = req.params as { teacherId: string };
    const data = await this.wherebyService.getTeacherClasses(teacherId);
    res.status(HTTP_STATUS.OK).json(data);
  });

  resetWhiteboard = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params as { sessionId: string };
    const result = await this.wherebyService.resetWhiteboard(sessionId);
    res.status(HTTP_STATUS.OK).json({ success: true, ...result });
  });
}

// Export controller instance
export const wherebyController = new WherebyController();
