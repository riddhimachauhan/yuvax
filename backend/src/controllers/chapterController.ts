import { Request, Response } from 'express';
import { ChapterService } from '../services/chapterService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class ChapterController {
  private chapterService: ChapterService;

  constructor() {
    this.chapterService = new ChapterService();
  }

  createChapter = asyncHandler(async (req: Request, res: Response) => {
    const chapterData = req.body;

    const chapter = await this.chapterService.createChapter(chapterData);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Chapter created successfully',
      data: chapter,
    });
  });

  // getAllChapters = asyncHandler(async (req: Request, res: Response) => {
  //   const { module_id } = req.query;

  //   const chapters = await this.chapterService.getAllChapters(module_id as string);

  //   res.status(HTTP_STATUS.OK).json({
  //     success: true,
  //     message: 'Chapters retrieved successfully',
  //     data: chapters,
  //   });
  // });

//   getAllChapters = asyncHandler(async (req: Request, res: Response) => {
//   const { module_id } = req.query;
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;

//   const chapters = await this.chapterService.getAllChapters(
//     module_id as string,
//     page,
//     limit
//   );

//   res.status(HTTP_STATUS.OK).json({
//     success: true,
//     message: 'Chapters retrieved successfully',
//     data: chapters,
//   });
// });

getAllChapters = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await this.chapterService.getAllChapters(page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Chapters retrieved successfully',
    data: result.chapters,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
      totalItemsLeft: result.totalItemsLeft,
    },
  });
});


  getChapterById = asyncHandler(async (req: Request, res: Response) => {
    const { chapter_id } = req.params;

    const chapter = await this.chapterService.getChapterById(chapter_id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Chapter retrieved successfully',
      data: chapter,
    });
  });

  updateChapter = asyncHandler(async (req: Request, res: Response) => {
    const { chapter_id } = req.params;
    const chapterData = req.body;

    const chapter = await this.chapterService.updateChapter(chapter_id, chapterData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Chapter updated successfully',
      data: chapter,
    });
  });

  deleteChapter = asyncHandler(async (req: Request, res: Response) => {
    const { chapter_id } = req.params;

    const result = await this.chapterService.deleteChapter(chapter_id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  getChaptersByModule = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;

    const chapters = await this.chapterService.getChaptersByModule(moduleId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Chapters retrieved successfully',
      data: chapters,
    });
  });

  getChapterStats = asyncHandler(async (req: Request, res: Response) => {
    const { chapterId } = req.params;

    const stats = await this.chapterService.getChapterStats(chapterId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Chapter statistics retrieved successfully',
      data: stats,
    });
  });

  searchChapters = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!query) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const result = await this.chapterService.searchChapters(query as string, page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Chapters retrieved successfully',
      data: result,
    });
  });
}

// Export controller instance
export const chapterController = new ChapterController();