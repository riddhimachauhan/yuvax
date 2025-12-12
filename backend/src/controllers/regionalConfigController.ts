import { Request, Response } from 'express';
import { RegionalConfigService } from '../services/regionalConfigService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class RegionalConfigController {
  private service: RegionalConfigService;

  constructor() {
    this.service = new RegionalConfigService();
  }

  createConfig = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const created = await this.service.createConfig(body);
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Regional config created successfully',
      data: created,
    });
  });

  getConfigById = asyncHandler(async (req: Request, res: Response) => {
    const { configId } = req.params;
    const config = await this.service.getConfigById(configId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Regional config retrieved successfully',
      data: config,
    });
  });

  getConfigByCountry = asyncHandler(async (req: Request, res: Response) => {
    const { countryId } = req.params;
    const config = await this.service.getConfigByCountry(countryId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Regional config for country retrieved successfully',
      data: config,
    });
  });

  getAllConfigs = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

  const result = await this.service.getAllConfigs(page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Regional configs retrieved successfully',
    data: result.configs,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
      totalItemsLeft: result.totalItemsLeft,
    },
  });
});


  updateConfig = asyncHandler(async (req: Request, res: Response) => {
    const { configId } = req.params;
    const updated = await this.service.updateConfig(configId, req.body);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Regional config updated successfully',
      data: updated,
    });
  });

  deleteConfig = asyncHandler(async (req: Request, res: Response) => {
    const { configId } = req.params;
    const result = await this.service.deleteConfig(configId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });
}

// export instance
export const regionalConfigController = new RegionalConfigController();
