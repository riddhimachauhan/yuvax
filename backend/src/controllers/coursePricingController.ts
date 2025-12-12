import { Request, Response } from 'express';
import { CoursePricingService } from '../services/coursePricingService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class CoursePricingController {
  private service: CoursePricingService;

  constructor() {
    this.service = new CoursePricingService();
  }

  createPricing = asyncHandler(async (req: Request, res: Response) => {
    const pricing = await this.service.createPricing(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Course pricing created successfully',
      data: pricing,
    });
  });

  getPricingById = asyncHandler(async (req: Request, res: Response) => {
    const { pricingId } = req.params;
    const pricing = await this.service.getPricingById(pricingId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Course pricing retrieved successfully',
      data: pricing,
    });
  });

  getAllPricing = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

  const result = await this.service.getAllPricing(page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Course pricing retrieved successfully',
    data: result.pricing,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
      totalItemsLeft: result.totalItemsLeft,
    },
  });
});


  updatePricing = asyncHandler(async (req: Request, res: Response) => {
    const { pricingId } = req.params;
    const pricing = await this.service.updatePricing(pricingId, req.body);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Course pricing updated successfully',
      data: pricing,
    });
  });

  deactivatePricing = asyncHandler(async (req: Request, res: Response) => {
    const { pricingId } = req.params;
    const pricing = await this.service.deactivatePricing(pricingId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Course pricing deactivated successfully',
      data: pricing,
    });
  });
}

// Export instance
export const coursePricingController = new CoursePricingController();
