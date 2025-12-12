import { Request, Response } from 'express';
import { SlotService } from '../services/slotService';
import { CustomError } from '../middlewares/errorHandler';

const slotService = new SlotService();

export const createSlots = async (req: Request, res: Response) => {
  try {
    const { teacherId, slots } = req.body;

    const result = await slotService.createSlots({
      teacherId,
      slots,
    });

    return res.status(201).json({
      success: true,
      message: 'Slots created successfully',
      count: result.count,
    });
  } catch (error: any) {
    console.error('Create Slots Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to create slots',
      error: error.message,
    });
  }
};

export const listSlots = async (req: Request, res: Response) => {
  try {
    const {
      teacherId,
      dateFrom,
      dateTo,
      courseId,
      timezone,
      page = 0,
      limit = 100,
    } = req.query;

    const result = await slotService.listSlots({
      teacherId: teacherId as string,
      dateFrom: dateFrom as string,
      dateTo: dateTo as string,
      courseId: courseId as string,
      timezone: timezone as string,
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error('List Slots Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const reserveAndConfirmDemo = async (req: Request, res: Response) => {
  try {
    const slotId = Number(req.params.id);
    const { userId, courseId } = req.body;

    const result = await slotService.reserveAndConfirmDemo({
      slotId,
      userId,
      courseId,
    });

    return res.status(201).json({
      success: true,
      message: 'Demo booked successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Reserve Demo Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message || 'Booking failed',
    });
  }
};

export const getTeacherOpenSlots = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;
    const {
      courseId,
      timezone,
      dateFrom,
      dateTo,
      page = 0,
      limit = 100,
    } = req.query;

    const result = await slotService.getTeacherOpenSlots(teacherId, {
      courseId: courseId as string,
      timezone: timezone as string,
      dateFrom: dateFrom as string,
      dateTo: dateTo as string,
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error('Get Teacher Open Slots Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const getStudentDemoSchedule = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { timezone } = req.query;

    const result = await slotService.getStudentDemoSchedule(userId, timezone as string);

    return res.status(200).json({
      success: true,
      message: 'Demo schedule fetched successfully',
      ...result,
    });
  } catch (error: any) {
    console.error('Get Student Demo Schedule Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

