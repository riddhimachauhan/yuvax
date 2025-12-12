import { Request, Response } from 'express';
import { SubmissionService } from '../services/submissionService';
import { CustomError } from '../middlewares/errorHandler';

const submissionService = new SubmissionService();

export const submitAssignment = async (req: Request, res: Response) => {
  try {
    const { assignment_id, student_id, response_data, code, language } = req.body;

    const result = await submissionService.submitAssignment({
      assignment_id,
      student_id,
      response_data,
      code,
      language,
    });

    return res.status(201).json({
      success: true,
      message: 'Assignment submitted successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Submit Assignment Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error submitting assignment',
      error: error.message,
    });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const { assignment_id, student_id, graded_by, page = 1, limit = 10 } = req.query;

    const result = await submissionService.getSubmissions({
      assignment_id: assignment_id as string,
      student_id: student_id as string,
      graded_by: graded_by as string,
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json({
      success: true,
      message: 'Submissions fetched successfully',
      ...result,
    });
  } catch (error: any) {
    console.error('Get Submissions Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message,
    });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const { submission_id } = req.params;

    const result = await submissionService.getSubmissionById(submission_id);

    return res.status(200).json({
      success: true,
      message: 'Submission fetched successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Get Submission By ID Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error fetching submission',
      error: error.message,
    });
  }
};

export const gradeSubmission = async (req: Request, res: Response) => {
  try {
    const { submission_id } = req.params;
    const { marks_obtained, is_correct, feedback, graded_by } = req.body;

    const result = await submissionService.gradeSubmission({
      submission_id,
      marks_obtained,
      is_correct,
      feedback,
      graded_by,
    });

    return res.status(200).json({
      success: true,
      message: 'Submission graded successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Grade Submission Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error grading submission',
      error: error.message,
    });
  }
};

export const deleteSubmission = async (req: Request, res: Response) => {
  try {
    const { submission_id } = req.params;

    const result = await submissionService.deleteSubmission(submission_id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    console.error('Delete Submission Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error deleting submission',
      error: error.message,
    });
  }
};

export const getSubmissionsByStudent = async (req: Request, res: Response) => {
  try {
    const { student_id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const result = await submissionService.getSubmissionsByStudent(student_id, Number(page), Number(limit));

    return res.status(200).json({
      success: true,
      message: 'Student submissions fetched successfully',
      ...result,
    });
  } catch (error: any) {
    console.error('Get Submissions By Student Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error fetching student submissions',
      error: error.message,
    });
  }
};

export const getSubmissionsByAssignment = async (req: Request, res: Response) => {
  try {
    const { assignment_id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const result = await submissionService.getSubmissionsByAssignment(assignment_id, Number(page), Number(limit));

    return res.status(200).json({
      success: true,
      message: 'Assignment submissions fetched successfully',
      ...result,
    });
  } catch (error: any) {
    console.error('Get Submissions By Assignment Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error fetching assignment submissions',
      error: error.message,
    });
  }
};