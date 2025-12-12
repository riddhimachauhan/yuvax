import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const categoryData = req.body;

    const category = await this.categoryService.createCategory(categoryData);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  });

  getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("Id is :",id);

    const category = await this.categoryService.getCategoryById(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Category retrieved successfully',
      data: category,
    });
  });

  // getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  //   const page = req.query.page ? parseInt(req.query.page as string) : 0;
  //   const limit = req.query.limit ? parseInt(req.query.limit as string) : 0;

  //   const categories = await this.categoryService.getAllCategories(page, limit);

  //   res.status(HTTP_STATUS.OK).json({
  //     success: true,
  //     message: 'Categories retrieved successfully',
  //     data: categories,
  //   });
  // });
  getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const result = await this.categoryService.getAllCategories(page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: result.categories,
      pagination: {
        totalItems: result.total,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pagesLeft: result.pagesLeft,
        totalItemsLeft: result.totalItemsLeft,
      },
    });
  });

  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const categoryData = req.body;

    const category = await this.categoryService.updateCategory(id, categoryData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  });

  deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.categoryService.deleteCategory(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  getCategoryStats = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const stats = await this.categoryService.getCategoryStats(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Category statistics retrieved successfully',
      data: stats,
    });
  });












}

// Export controller instance
export const categoryController = new CategoryController();