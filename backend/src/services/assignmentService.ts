import { AssignmentRepository } from '../repositories/assignmentRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export interface CreateAssignmentData {
  course_id: string;
  module_id: string;
  title: string;
  description?: string;
  type: 'QUIZ' | 'PUZZLE' | 'CODE_EXERCISE';
  language?: string;
  starter_code?: string;
  metadata?: any;
  reward_points?: number;
  created_by: string;
}

export interface UpdateAssignmentData {
  title?: string;
  description?: string;
  type?: 'QUIZ' | 'PUZZLE' | 'CODE_EXERCISE';
  language?: string;
  starter_code?: string;
  metadata?: any;
  reward_points?: number;
}

export class AssignmentService {
  private assignmentRepository: AssignmentRepository;

  constructor() {
    this.assignmentRepository = new AssignmentRepository();
  }

  async createAssignment(assignmentData: CreateAssignmentData) {
    // Validate required fields
    if (!assignmentData.course_id || !assignmentData.module_id || 
        !assignmentData.title || !assignmentData.type || !assignmentData.created_by) {
      throw new CustomError('Missing required fields', HTTP_STATUS.BAD_REQUEST);
    }

    // Validate assignment type
    const validTypes = ['QUIZ', 'PUZZLE', 'CODE_EXERCISE'];
    if (!validTypes.includes(assignmentData.type)) {
      throw new CustomError('Invalid assignment type', HTTP_STATUS.BAD_REQUEST);
    }

    // Check if course exists
    const courseExists = await this.assignmentRepository.courseExists(assignmentData.course_id);
    if (!courseExists) {
      throw new CustomError('Course not found', HTTP_STATUS.BAD_REQUEST);
    }

    // Check if module exists and belongs to the course
    const moduleExists = await this.assignmentRepository.moduleExists(assignmentData.module_id, assignmentData.course_id);
    if (!moduleExists) {
      throw new CustomError('Module not found or does not belong to the course', HTTP_STATUS.BAD_REQUEST);
    }

    // Check if creator exists
    const creatorExists = await this.assignmentRepository.userExists(assignmentData.created_by);
    if (!creatorExists) {
      throw new CustomError('Creator not found', HTTP_STATUS.BAD_REQUEST);
    }

    const assignment = await this.assignmentRepository.create({
      ...assignmentData,
      reward_points: assignmentData.reward_points || 10,
    } as any);

    return assignment;
  }

  async getAssignmentsByCourse(courseId: string) {
    // Check if course exists
    const courseExists = await this.assignmentRepository.courseExists(courseId);
    if (!courseExists) {
      throw new CustomError('Course not found', HTTP_STATUS.NOT_FOUND);
    }

    const assignments = await this.assignmentRepository.findByCourse(courseId);
    return assignments;
  }

 async getAllAssignments(page: number = 1, limit: number = 10) {
  return this.assignmentRepository.findAll(page, limit);
}


  async getAssignmentById(assignmentId: string) {
    const assignment = await this.assignmentRepository.findByIdWithRelations(assignmentId);
    if (!assignment) {
      throw new CustomError('Assignment not found', HTTP_STATUS.NOT_FOUND);
    }

    return assignment;
  }

  async updateAssignment(assignmentId: string, assignmentData: UpdateAssignmentData) {
    // Check if assignment exists
    const existingAssignment = await this.assignmentRepository.findById(assignmentId);
    if (!existingAssignment) {
      throw new CustomError('Assignment not found', HTTP_STATUS.NOT_FOUND);
    }

    // Validate assignment type if being updated
    if (assignmentData.type) {
      const validTypes = ['QUIZ', 'PUZZLE', 'CODE_EXERCISE'];
      if (!validTypes.includes(assignmentData.type)) {
        throw new CustomError('Invalid assignment type', HTTP_STATUS.BAD_REQUEST);
      }
    }

    const updatedAssignment = await this.assignmentRepository.update(assignmentId, assignmentData);
    return updatedAssignment;
  }

  async deleteAssignment(assignmentId: string) {
    // Check if assignment exists
    const existingAssignment = await this.assignmentRepository.findById(assignmentId);
    if (!existingAssignment) {
      throw new CustomError('Assignment not found', HTTP_STATUS.NOT_FOUND);
    }

    // Check if assignment has submissions
    const hasSubmissions = await this.assignmentRepository.hasSubmissions(assignmentId);
    if (hasSubmissions) {
      throw new CustomError('Cannot delete assignment with existing submissions', HTTP_STATUS.BAD_REQUEST);
    }

    await this.assignmentRepository.delete(assignmentId);
    return { message: 'Assignment deleted successfully' };
  }

  async getAssignmentsByModule(moduleId: string) {
    // Check if module exists
    const moduleExists = await this.assignmentRepository.moduleExists(moduleId);
    if (!moduleExists) {
      throw new CustomError('Module not found', HTTP_STATUS.NOT_FOUND);
    }

    const assignments = await this.assignmentRepository.findByModule(moduleId);
    return assignments;
  }

  async getAssignmentsByCreator(creatorId: string, page: number = 1, limit: number = 10) {
    // Check if creator exists
    const creatorExists = await this.assignmentRepository.userExists(creatorId);
    if (!creatorExists) {
      throw new CustomError('Creator not found', HTTP_STATUS.NOT_FOUND);
    }

    const result = await this.assignmentRepository.findByCreator(creatorId, page, limit);
    return result;
  }

  async getAssignmentStats(assignmentId: string) {
    const assignment = await this.assignmentRepository.findById(assignmentId);
    if (!assignment) {
      throw new CustomError('Assignment not found', HTTP_STATUS.NOT_FOUND);
    }

    return await this.assignmentRepository.getAssignmentStats(assignmentId);
  }
}
