import { Request, Response } from 'express';
import { AnswerService } from '../services/answerService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class AnswerController {
  private answerService: AnswerService;

  constructor() {
    this.answerService = new AnswerService();
  }

  createAnswer = asyncHandler(async (req: Request, res: Response) => {
    const answer = await this.answerService.createAnswer(req.body);
    res.status(HTTP_STATUS.CREATED).json({ success: true, data: answer });
  });

  getAnswerById = asyncHandler(async (req: Request, res: Response) => {
    const answer = await this.answerService.getAnswerById(req.params.id);
    res.status(HTTP_STATUS.OK).json({ success: true, data: answer });
  });

  updateAnswer = asyncHandler(async (req: Request, res: Response) => {
    const updated = await this.answerService.updateAnswer(req.params.id, req.body);
    res.status(HTTP_STATUS.OK).json({ success: true, data: updated });
  });

  deleteAnswer = asyncHandler(async (req: Request, res: Response) => {
    await this.answerService.deleteAnswer(req.params.id);
    res.status(HTTP_STATUS.OK).json({ success: true, message: 'Answer deleted successfully' });
  });

  getAnswersByAttemptId = asyncHandler(async (req: Request, res: Response) => {
    const answers = await this.answerService.getAnswersByAttemptId(req.params.attempt_id);
    res.status(HTTP_STATUS.OK).json({ success: true, data: answers });
  });
}

export const answerController = new AnswerController();
