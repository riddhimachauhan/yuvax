import { ModuleRepository } from '../repositories/moduleRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export interface CreateModuleData {
  course_id: string;
  module_title: string;
  duration: number;
  module_description?: string;
  student_note_link?: string;
  teacher_note_link?: string;
  PPT_link?: string;
}

export interface UpdateModuleData {
  module_title?: string;
  duration?: number;
  module_description?: string;
  student_note_link?: string;
  teacher_note_link?: string;
  PPT_link?: string;
}

export class ModuleService {
  private moduleRepository: ModuleRepository;

  constructor() {
    this.moduleRepository = new ModuleRepository();
  }

  async createModule(moduleData: CreateModuleData) {
    if (!moduleData.course_id || !moduleData.module_title || moduleData.duration == null) {
      throw new CustomError('course_id, module_title and duration are required', HTTP_STATUS.BAD_REQUEST);
    }

    const courseExists = await this.moduleRepository.courseExists(moduleData.course_id);
    if (!courseExists) {
      throw new CustomError('Invalid course_id. Course does not exist.', HTTP_STATUS.BAD_REQUEST);
    }

    return this.moduleRepository.create(moduleData);
  }

  
async getAllModules(page: number = 1, limit: number = 10) {
  return this.moduleRepository.findAll(page, limit);
}




  async getModuleById(moduleId: string) {
    const module = await this.moduleRepository.findByIdWithCourse(moduleId);
    if (!module) {
      throw new CustomError('Module not found', HTTP_STATUS.NOT_FOUND);
    }
    return module;
  }

  async updateModule(moduleId: string, moduleData: UpdateModuleData) {
    const existingModule = await this.moduleRepository.findById(moduleId);
    if (!existingModule) {
      throw new CustomError('Module not found', HTTP_STATUS.NOT_FOUND);
    }
    return this.moduleRepository.update(moduleId, moduleData);
  }

  async deleteModule(moduleId: string) {
    const existingModule = await this.moduleRepository.findById(moduleId);
    if (!existingModule) {
      throw new CustomError('Module not found', HTTP_STATUS.NOT_FOUND);
    }

    if (await this.moduleRepository.hasChapters(moduleId)) {
      throw new CustomError('Cannot delete module with existing chapters', HTTP_STATUS.BAD_REQUEST);
    }

    if (await this.moduleRepository.hasAssignments(moduleId)) {
      throw new CustomError('Cannot delete module with existing assignments', HTTP_STATUS.BAD_REQUEST);
    }

    await this.moduleRepository.delete(moduleId);
    return { message: 'Module deleted successfully' };
  }

  async getModulesByCourse(courseId: string) {
    const courseExists = await this.moduleRepository.courseExists(courseId);
    if (!courseExists) {
      throw new CustomError('Course not found', HTTP_STATUS.NOT_FOUND);
    }
    return this.moduleRepository.findByCourse(courseId);
  }

  // --- New methods ---
  async searchModules(query: string, page: number = 1, limit: number = 10) {
    return this.moduleRepository.searchModules(query, page, limit);
  }

  async getModuleStats(moduleId: string) {
    const module = await this.moduleRepository.findById(moduleId);
    if (!module) {
      throw new CustomError('Module not found', HTTP_STATUS.NOT_FOUND);
    }
    return this.moduleRepository.getModuleStats(moduleId);
  }
}
