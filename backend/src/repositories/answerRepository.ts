import { PrismaClient, Answer } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class AnswerRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: {
    attempt_id: string;
    question_id: string;
    selected_option: number;
  }): Promise<Answer> {
    const question = await this.db.question.findUnique({
      where: { question_id: data.question_id },
      select: { correct_answer: true },
    });

    const is_correct = question ? data.selected_option === question.correct_answer : false;

    return this.db.answer.create({
      data: { ...data, is_correct },
    });
  }

  async findById(id: string): Promise<Answer & { question: any; attempt: any } | null> {
    return this.db.answer.findUnique({
      where: { answer_id: id },
      include: { question: true, attempt: true },
    });
  }

  async update(id: string, selected_option: number): Promise<Answer> {
    const existing = await this.db.answer.findUnique({
      where: { answer_id: id },
      include: { question: true },
    });

    if (!existing) throw new Error('Answer not found');

    const is_correct = selected_option === existing.question.correct_answer;

    return this.db.answer.update({
      where: { answer_id: id },
      data: { selected_option, is_correct },
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.answer.delete({ where: { answer_id: id } });
  }

  async findByAttemptId(attempt_id: string): Promise<Answer[]> {
    return this.db.answer.findMany({ where: { attempt_id }, include: { question: true } });
  }
}
