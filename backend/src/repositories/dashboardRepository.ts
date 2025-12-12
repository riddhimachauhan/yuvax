


import { PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class DashboardRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async getQuizStats(userId: any) {
    // average score across quiz_attempts
    const attempts = await this.db.quizAttempt.findMany({
      where: { student_id: userId, submitted_at: { not: null } },
      select: { score: true }
    });
    if (!attempts.length) return { avgScore: 0, count: 0 };
    const sum = attempts.reduce((s, a) => s + (a.score || 0), 0);
    return { avgScore: Math.round(sum / attempts.length), count: attempts.length };
  }

  async getAttendanceStats(userId: any) {
    // attendance = completed sessions / total scheduled sessions for this user
    const total = await this.db.session.count({ where: { user_id: userId } });
    const completed = await this.db.session.count({ where: { user_id: userId, status: 'completed' } });
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pct };
  }

  async getEnrollmentStats(userId: any) {
    // courses complete = enrollments with progress >= 100
    const total = await this.db.enrollment.count({ where: { user_id: userId } });
    const complete = await this.db.enrollment.count({ where: { user_id: userId, progress: { gte: 100 } } });
    return { total, complete };
  }

  async getStudyTime(userId: any) {
    // sum of actual_end_time - actual_start_time in minutes for sessions by user
    const sessions = await this.db.session.findMany({
      where: { user_id: userId, actual_start_time: { not: null }, actual_end_time: { not: null } },
      select: { actual_start_time: true, actual_end_time: true }
    });

    const minutes = sessions.reduce((acc, session) => {
      const start = session.actual_start_time;
      const end = session.actual_end_time;
      if (!start || !end) return acc; // type-safe guard
      const diffMs = end.getTime() - start.getTime();
      const diffMin = Math.max(0, Math.round(diffMs / 60000)); // ms -> minutes
      return acc + diffMin;
    }, 0);
    return { minutes };
  }

  async getSubmissionStats(userId: any) {
    // submissionRate = graded submissions / total submissions
    const total = await this.db.submission.count({ where: { student_id: userId } });
    const graded = await this.db.submission.count({ where: { student_id: userId, graded_at: { not: null } } });
    const pct = total ? Math.round((graded / total) * 100) : 0;
    return { total, graded, pct };
  }

  async getNotificationsCount(userId: any) {
    // Placeholder: if you have notifications table use it. Return 0 otherwise.
    // Example assumes notifications table not present yet.
    return 0;
  }

  async getStreakAndXp(userId: any) {
    // Placeholder logic. Ideally compute using activity logs.
    // For demo return stored fields if available. Here return 10 and 500 as example.
    return { streakDays: 10, xp: 500 };
  }

  async getStudentCourses(userId: string) {
    const enrollments = await this.db.enrollment.findMany({
      where: { user_id: userId, is_active: true },
      include: { course: true },
      orderBy: { created_at: 'desc' },
    });

    const paid = enrollments.filter((e: any) => e.enrollment_type === 'paid').map((e: any) => e.course);
    const demo = enrollments.filter((e: any) => e.enrollment_type === 'demo').map((e: any) => e.course);
    const trial = enrollments.filter((e: any) => e.enrollment_type === 'trial').map((e: any) => e.course);

    return { paid, demo, trial };
  }

}
