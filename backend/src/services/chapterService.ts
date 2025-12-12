import { ChapterRepository } from '../repositories/chapterRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export interface CreateChapterData {
  module_id: string;
  chapter_name: string;
  description?: string;
  capacity?: number;
}

export interface UpdateChapterData {
  chapter_name?: string;
  description?: string;
  capacity?: number;
}

export class ChapterService {
  private chapterRepository: ChapterRepository;

  constructor() {
    this.chapterRepository = new ChapterRepository();
  }

  async createChapter(chapterData: CreateChapterData) {
    // Validate required fields
    if (!chapterData.module_id || !chapterData.chapter_name) {
      throw new CustomError('module_id and chapter_name are required', HTTP_STATUS.BAD_REQUEST);
    }

    // Check if module exists
    const moduleExists = await this.chapterRepository.moduleExists(chapterData.module_id);
    if (!moduleExists) {
      throw new CustomError('Module not found', HTTP_STATUS.NOT_FOUND);
    }

    const chapter = await this.chapterRepository.create(chapterData);
    return chapter;
  }

async getAllChapters(page: number = 1, limit: number = 10) {
  return this.chapterRepository.findAll(page, limit);
}

  

  async getChapterById(chapterId: string) {
    const chapter = await this.chapterRepository.findByIdWithRelations(chapterId);
    if (!chapter) {
      throw new CustomError('Chapter not found', HTTP_STATUS.NOT_FOUND);
    }

    return chapter;
  }

  async updateChapter(chapterId: string, chapterData: UpdateChapterData) {
    // Check if chapter exists
    const existingChapter = await this.chapterRepository.findById(chapterId);
    if (!existingChapter) {
      throw new CustomError('Chapter not found', HTTP_STATUS.NOT_FOUND);
    }

    const updatedChapter = await this.chapterRepository.update(chapterId, chapterData);
    return updatedChapter;
  }

  async deleteChapter(chapterId: string) {
    // Check if chapter exists
    const existingChapter = await this.chapterRepository.findById(chapterId);
    if (!existingChapter) {
      throw new CustomError('Chapter not found', HTTP_STATUS.NOT_FOUND);
    }

    // Check if chapter has sessions
    const hasSessions = await this.chapterRepository.hasSessions(chapterId);
    if (hasSessions) {
      throw new CustomError('Cannot delete chapter with existing sessions', HTTP_STATUS.BAD_REQUEST);
    }

    await this.chapterRepository.delete(chapterId);
    return { message: 'Chapter deleted successfully' };
  }

  async getChaptersByModule(moduleId: string) {
    // Check if module exists
    const moduleExists = await this.chapterRepository.moduleExists(moduleId);
    if (!moduleExists) {
      throw new CustomError('Module not found', HTTP_STATUS.NOT_FOUND);
    }

    const chapters = await this.chapterRepository.findByModule(moduleId);
    return chapters;
  }

  async getChapterStats(chapterId: string) {
    const chapter = await this.chapterRepository.findById(chapterId);
    if (!chapter) {
      throw new CustomError('Chapter not found', HTTP_STATUS.NOT_FOUND);
    }

    return await this.chapterRepository.getChapterStats(chapterId);
  }

  async searchChapters(query: string, page: number = 1, limit: number = 10) {
    const result = await this.chapterRepository.searchChapters(query, page, limit);
    return result;
  }
}
