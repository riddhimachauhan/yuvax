import { PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class WherebyRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async getSessionById(sessionId: string) {
    return this.db.session.findUnique({
      where: { session_id: sessionId },
    });
  }

  async getSessionWithTeacher(sessionId: string) {
    return this.db.session.findUnique({
      where: { session_id: sessionId },
      include: { teacher: true },
    });
  }

  async getSessionForSchedule(sessionId: string) {
    return this.db.session.findUnique({
      where: { session_id: sessionId },
      include: { course: true, teacher: { include: { user: true } } },
    });
  }

  async updateSessionWhereby(sessionId: string, data: {
    whereby_meeting_id: string;
    whereby_room_url: string;
    whereby_host_url: string;
    whiteboard_url: string;
  }) {
    return this.db.session.update({
      where: { session_id: sessionId },
      data,
    });
  }

  async updateWhiteboard(sessionId: string, whiteboardUrl: string) {
    return this.db.session.update({
      where: { session_id: sessionId },
      data: { whiteboard_url: whiteboardUrl },
    });
  }

  async getUserClasses(userId: string) {
    const sessions = await this.db.session.findMany({
      where: {
        OR: [
          { user_id: userId },
          { enrollments: { some: { user_id: userId } } },
        ],
      },
      include: { course: true, teacher: { include: { user: true } } },
      orderBy: { schedule_at: 'asc' },
    });

    return sessions.map((s: any) => ({
      session_id: s.session_id,
      course_name: s.course.course_name,
      teacher_name: s.teacher.user.full_name,
      schedule_at: s.schedule_at instanceof Date ? s.schedule_at.toISOString() : new Date(s.schedule_at as any).toISOString(),
      hasWhereby: Boolean(s.whereby_room_url),
      whiteboardUrl: (s as any).whiteboard_url ?? null,
    }));
  }

  async getTeacherClasses(teacherId: string) {
    const sessions = await this.db.session.findMany({
      where: { teacher_id: teacherId },
      include: { course: true, teacher: { include: { user: true } } },
      orderBy: { schedule_at: 'asc' },
    });

    return sessions.map((s: any) => ({
      session_id: s.session_id,
      course_name: s.course.course_name,
      teacher_name: s.teacher.user.full_name,
      schedule_at: s.schedule_at instanceof Date ? s.schedule_at.toISOString() : new Date(s.schedule_at as any).toISOString(),
      hasWhereby: Boolean(s.whereby_host_url),
      whiteboardUrl: (s as any).whiteboard_url ?? null,
    }));
  }
}
