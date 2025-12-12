import { Request, Response } from 'express';
import { ModuleService } from '../services/moduleService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class ModuleController {
  private moduleService: ModuleService;

  constructor() {
    this.moduleService = new ModuleService();
  }

  createModule = asyncHandler(async (req: Request, res: Response) => {
    const moduleData = req.body;

    const module = await this.moduleService.createModule(moduleData);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Module created successfully',
      data: module,
    });
  });

//   getAllModules = asyncHandler(async (req: Request, res: Response) => {
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;

//   const modules = await this.moduleService.getAllModules(page, limit);

//   res.status(HTTP_STATUS.OK).json({
//     success: true,
//     message: 'Modules retrieved successfully',
//     data: modules,
//   });
// });
getAllModules = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await this.moduleService.getAllModules(page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Modules retrieved successfully',
    data: result.modules,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
      totalItemsLeft:result.totalItemsLeft,
    },
  });
});



  getModuleById = asyncHandler(async (req: Request, res: Response) => {
    const { module_id } = req.params;

    const module = await this.moduleService.getModuleById(module_id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Module retrieved successfully',
      data: module,
    });
  });

  updateModule = asyncHandler(async (req: Request, res: Response) => {
    const { module_id } = req.params;
    const moduleData = req.body;

    const module = await this.moduleService.updateModule(module_id, moduleData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Module updated successfully',
      data: module,
    });
  });

  deleteModule = asyncHandler(async (req: Request, res: Response) => {
    const { module_id } = req.params;

    const result = await this.moduleService.deleteModule(module_id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  getModulesByCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const modules = await this.moduleService.getModulesByCourse(courseId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Modules retrieved successfully',
      data: modules,
    });
  });

  getModuleStats = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;

    const stats = await this.moduleService.getModuleStats(moduleId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Module statistics retrieved successfully',
      data: stats,
    });
  });

  searchModules = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!query) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const result = await this.moduleService.searchModules(query as string, page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Modules retrieved successfully',
      data: result,
    });
  });
}

// Export controller instance
export const moduleController = new ModuleController();