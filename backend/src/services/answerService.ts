import { AnswerRepository } from '../repositories/answerRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { CreateAnswerRequest, UpdateAnswerRequest } from '../dto/request/answerRequest';

export class AnswerService {
  private answerRepository: AnswerRepository;

  constructor() {
    this.answerRepository = new AnswerRepository();
  }

  async createAnswer(data: CreateAnswerRequest) {
    return this.answerRepository.create(data);
  }

  async getAnswerById(id: string) {
    const answer = await this.answerRepository.findById(id);
    if (!answer) throw new CustomError('Answer not found', HTTP_STATUS.NOT_FOUND);
    return answer;
  }

  async updateAnswer(id: string, data: UpdateAnswerRequest) {
    return this.answerRepository.update(id, data.selected_option);
  }

  async deleteAnswer(id: string) {
    await this.answerRepository.delete(id);
  }

  async getAnswersByAttemptId(attempt_id: string) {
    return this.answerRepository.findByAttemptId(attempt_id);
  }
}
