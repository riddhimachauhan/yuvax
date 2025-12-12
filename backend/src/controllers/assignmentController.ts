import { Request, Response } from "express";
import { AssignmentService } from "../services/assignmentService";
import { asyncHandler } from "../middlewares/errorHandler";
import { HTTP_STATUS } from "../utils/constants";

export class AssignmentController {
  private assignmentService: AssignmentService;

  constructor() {
    this.assignmentService = new AssignmentService();
  }

  createAssignment = asyncHandler(async (req: Request, res: Response) => {
    const assignmentData = req.body;

    const assignment = await this.assignmentService.createAssignment(
      assignmentData
    );

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Assignment created successfully",
      data: assignment,
    });
  });

 getAllAssignments = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await this.assignmentService.getAllAssignments(page, limit);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Assignments retrieved successfully',
    data: result.assignments,
    pagination: {
      totalItems: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pagesLeft: result.pagesLeft,
      totalItemsLeft: result.totalItemsLeft,
    },
  });
});


  getAssignments = asyncHandler(async (req: Request, res: Response) => {
    const { course_id } = req.params;

    const assignments = await this.assignmentService.getAssignmentsByCourse(
      course_id
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Assignments retrieved successfully",
      data: assignments,
    });
  });

  getAssignmentById = asyncHandler(async (req: Request, res: Response) => {
    const { assignment_id } = req.params;

    const assignment = await this.assignmentService.getAssignmentById(
      assignment_id
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Assignment retrieved successfully",
      data: assignment,
    });
  });

  updateAssignment = asyncHandler(async (req: Request, res: Response) => {
    const { assignment_id } = req.params;
    const assignmentData = req.body;

    const assignment = await this.assignmentService.updateAssignment(
      assignment_id,
      assignmentData
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Assignment updated successfully",
      data: assignment,
    });
  });

  deleteAssignment = asyncHandler(async (req: Request, res: Response) => {
    const assignment_id = req.params.assignmentId as string;
    console.log("assignment ID :",assignment_id)

    const result = await this.assignmentService.deleteAssignment(assignment_id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  getAssignmentsByModule = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;

    const assignments = await this.assignmentService.getAssignmentsByModule(
      moduleId
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Assignments retrieved successfully",
      data: assignments,
    });
  });

  getAssignmentsByCreator = asyncHandler(
    async (req: Request, res: Response) => {
      const { creatorId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.assignmentService.getAssignmentsByCreator(
        creatorId,
        page,
        limit
      );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Assignments retrieved successfully",
        data: result,
      });
    }
  );

  getAssignmentStats = asyncHandler(async (req: Request, res: Response) => {
    const { assignmentId } = req.params;

    const stats = await this.assignmentService.getAssignmentStats(assignmentId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Assignment statistics retrieved successfully",
      data: stats,
    });
  });
}

// Export controller instance
export const assignmentController = new AssignmentController();
