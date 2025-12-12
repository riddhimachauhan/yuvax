import { SessionRepository } from '../repositories/sessionRepository';

export class SessionService {
  private repo = new SessionRepository();

 async getSessionsByTeacher(
  teacherId: string,
  filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }
) {
  return await this.repo.getSessionsByTeacher(teacherId, filters);
}

}