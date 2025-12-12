import { Request, Response } from 'express';
import { SessionService } from '../services/sessionService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

const sessionService = new SessionService();

export class SessionController {
 getSessionsByTeacher = asyncHandler(async (req: Request, res: Response) => {
  const teacherId = req.params.teacherId;
  const { status, dateFrom, dateTo, page = '1', limit = '50' } = req.query;

  const filters = {
    status: status as string | undefined,
    dateFrom: dateFrom as string | undefined,
    dateTo: dateTo as string | undefined,
    page: Number(page),
    limit: Number(limit),
  };

  const result = await sessionService.getSessionsByTeacher(teacherId, filters);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: result.sessions,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
      totalItemsLeft: result.totalItemsLeft,
    },
  });
});

}

export const sessionController = new SessionController();