import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }



  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await this.userService.getUserById(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  });

  getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;

    const user = await this.userService.getUserByEmail(email);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  });

  getUsersByRole = asyncHandler(async (req: Request, res: Response) => {
  const { role } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await this.userService.getUsersByRole(role, page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Users retrieved successfully',
    data: result.users,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
      totalItemsLeft: result.totalItemsLeft,
    },
  });
});


  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await this.userService.getAllUsers(page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Users retrieved successfully',
    data: result.users,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
      totalItemsLeft: result.totalItemsLeft,
    },
  });
});


  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;

    const user = await this.userService.updateUser(id, userData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.userService.deleteUser(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

}

// Export controller instance
export const userController = new UserController();
