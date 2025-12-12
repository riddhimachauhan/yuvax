import { PrismaClient, Submission } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class SubmissionRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: {
    assignment_id: string;
    student_id: string;
    response_data?: any;
    code?: string;
    language?: string;
    is_correct?: boolean | null;
    marks_obtained?: number;
    feedback?: string;
    graded_by?: string;
  }): Promise<Submission> {
    return this.db.submission.create({
      data,
      include: {
        assignment: true,
        student: true,
        grader: true,
      },
    });
  }

  async findById(submissionId: string): Promise<Submission | null> {
    return this.db.submission.findUnique({
      where: { submission_id: submissionId },
      include: {
        assignment: true,
        student: true,
        grader: true,
      },
    });
  }

  async findMany(where: any, skip: number = 0, take: number = 10): Promise<Submission[]> {
    return this.db.submission.findMany({
      where,
      include: {
        assignment: true,
        student: true,
        grader: true,
      },
      orderBy: { submitted_at: 'desc' },
      skip,
      take,
    });
  }

  async update(submissionId: string, data: {
    marks_obtained?: number;
    is_correct?: boolean;
    feedback?: string;
    graded_by?: string;
    graded_at?: Date;
  }): Promise<Submission> {
    return this.db.submission.update({
      where: { submission_id: submissionId },
      data,
      include: {
        assignment: true,
        student: true,
        grader: true,
      },
    });
  }

  async delete(submissionId: string): Promise<void> {
    await this.db.submission.delete({
      where: { submission_id: submissionId },
    });
  }

  async count(where: any): Promise<number> {
    return this.db.submission.count({ where });
  }

  async findByStudent(studentId: string, skip: number = 0, take: number = 10): Promise<Submission[]> {
    return this.db.submission.findMany({
      where: { student_id: studentId },
      include: {
        assignment: true,
        grader: true,
      },
      orderBy: { submitted_at: 'desc' },
      skip,
      take,
    });
  }

  async countByStudent(studentId: string): Promise<number> {
    return this.db.submission.count({
      where: { student_id: studentId },
    });
  }

  async findByAssignment(assignmentId: string, skip: number = 0, take: number = 10): Promise<Submission[]> {
    return this.db.submission.findMany({
      where: { assignment_id: assignmentId },
      include: {
        student: true,
        grader: true,
      },
      orderBy: { submitted_at: 'desc' },
      skip,
      take,
    });
  }

  async countByAssignment(assignmentId: string): Promise<number> {
    return this.db.submission.count({
      where: { assignment_id: assignmentId },
    });
  }

  async findByGrader(graderId: string, skip: number = 0, take: number = 10): Promise<Submission[]> {
    return this.db.submission.findMany({
      where: { graded_by: graderId },
      include: {
        assignment: true,
        student: true,
      },
      orderBy: { graded_at: 'desc' },
      skip,
      take,
    });
  }

  async countByGrader(graderId: string): Promise<number> {
    return this.db.submission.count({
      where: { graded_by: graderId },
    });
  }

  async getGradedSubmissions(skip: number = 0, take: number = 10): Promise<Submission[]> {
    return this.db.submission.findMany({
      where: {
        graded_at: { not: null },
      },
      include: {
        assignment: true,
        student: true,
        grader: true,
      },
      orderBy: { graded_at: 'desc' },
      skip,
      take,
    });
  }

  async getUngradedSubmissions(skip: number = 0, take: number = 10): Promise<Submission[]> {
    return this.db.submission.findMany({
      where: {
        graded_at: null,
      },
      include: {
        assignment: true,
        student: true,
      },
      orderBy: { submitted_at: 'desc' },
      skip,
      take,
    });
  }

  async getSubmissionsByDateRange(startDate: Date, endDate: Date, skip: number = 0, take: number = 10): Promise<Submission[]> {
    return this.db.submission.findMany({
      where: {
        submitted_at: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        assignment: true,
        student: true,
        grader: true,
      },
      orderBy: { submitted_at: 'desc' },
      skip,
      take,
    });
  }

  async getSubmissionStats(assignmentId?: string, studentId?: string) {
    const where: any = {};
    if (assignmentId) where.assignment_id = assignmentId;
    if (studentId) where.student_id = studentId;

    const [total, graded, ungraded, correct, incorrect] = await Promise.all([
      this.db.submission.count({ where }),
      this.db.submission.count({ where: { ...where, graded_at: { not: null } } }),
      this.db.submission.count({ where: { ...where, graded_at: null } }),
      this.db.submission.count({ where: { ...where, is_correct: true } }),
      this.db.submission.count({ where: { ...where, is_correct: false } }),
    ]);

    return {
      total,
      graded,
      ungraded,
      correct,
      incorrect,
      gradingProgress: total > 0 ? (graded / total) * 100 : 0,
      accuracy: (correct + incorrect) > 0 ? (correct / (correct + incorrect)) * 100 : 0,
    };
  }
}
