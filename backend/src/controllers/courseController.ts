import { Request, Response } from 'express';
import { CourseService } from '../services/courseService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  createCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseData = req.body;

    const course = await this.courseService.createCourse(courseData);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  });

// getCourses = asyncHandler(async (req: Request, res: Response) => {
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;

//   const courses = await this.courseService.getAllCourses(page, limit);

//   res.status(HTTP_STATUS.OK).json({
//     success: true,
//     message: 'Courses retrieved successfully',
//     data: courses,
//   });
// });
getCourses = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await this.courseService.getAllCourses(page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Courses retrieved successfully',
    data: result.courses,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
       totalItemsLeft: result.totalItemsLeft,
    },
  });
});



  getCourseById = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const course = await this.courseService.getCourseById(courseId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Course retrieved successfully',
      data: course,
    });
  });

  updateCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const courseData = req.body;

    const course = await this.courseService.updateCourse(courseId, courseData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Course updated successfully',
      data: course,
    });
  });

  deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const result = await this.courseService.deleteCourse(courseId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  getCoursesByCategory = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    const courses = await this.courseService.getCoursesByCategory(categoryId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Courses retrieved successfully',
      data: courses,
    });
  });



  getPurchasedCourses = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id; // set in authMiddleware
    console.log("user id :", userId)
    const courses = await this.courseService.getPurchasedCourses(userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Purchased courses retrieved successfully',
      data: courses,
    });
  });

}

// Export controller instance
export const courseController = new CourseController();