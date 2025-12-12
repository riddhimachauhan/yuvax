import { PrismaClient, SlotStatus, EnrollmentType, SessionType, SessionStatus, ClassType, Prisma } from '@prisma/client';
import { getPrismaClient } from '../config/database';

type SlotWithRelations = Prisma.SlotGetPayload<{
  include: {
    teacher: { include: { user: true } };
    course: true;
    enrollments: true;
    session: true;
  };
}>;

export class SlotRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: {
    teacherId: string;
    courseId?: string;
    slot_date: Date;
    start_time: Date;
    end_time: Date;
    capacity: number;
    status: SlotStatus;
    reservedByUserId?: string;
  }): Promise<SlotWithRelations> {
    return this.db.slot.create({
      data,
      include: {
        teacher: { include: { user: true } },
        course: true,
        enrollments: true,
        session: true,
      },
    });
  }

  async createMany(data: any[]): Promise<{ count: number }> {
    return this.db.slot.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async findById(slotId: number): Promise<SlotWithRelations | null> {
    return this.db.slot.findUnique({
      where: { slot_id: slotId },
      include: {
        teacher: { include: { user: true } },
        course: true,
        enrollments: true,
        session: true,
      },
    });
  }

  async findMany(where: any, page: number = 0, limit: number = 100): Promise<SlotWithRelations[]> {
    return this.db.slot.findMany({
      where,
      orderBy: { slot_date: 'asc' },
      include: {
        teacher: { include: { user: true } },
        course: true,
        enrollments: true,
        session: true,
      },
      skip: page * limit,
      take: limit,
    });
  }

  async getTeacherWithTimezone(teacherId: string) {
    return this.db.teachersRoaster.findUnique({
      where: { teacher_id: teacherId },
      include: {
        user: true,
        countries: { include: { zone: true } },
        courses: { select: { course_id: true } },
      },
    });
  }

  async getReservedCount(slotId: number): Promise<number> {
    return this.db.enrollment.count({
      where: { slot_id: slotId, is_active: true },
    });
  }

  async reserveAndConfirmDemo(slotId: number, userId: string, courseId: string) {
    return await this.db.$transaction(async (tx) => {
      // Lock the slot row to prevent concurrent bookings
      const rows: any[] = await tx.$queryRaw`
        SELECT *
        FROM "Slot"
        WHERE slot_id = ${slotId}
        FOR UPDATE
      `;
      const slot = rows[0];
      if (!slot) throw new Error('Slot not found.');

      // Convert possible string timestamps to Date
      const slotStart = slot.start_time instanceof Date ? slot.start_time : new Date(slot.start_time);
      const now = new Date();

      // Basic validations
      if (slot.status !== SlotStatus.open) throw new Error('Slot is not open for booking.');
      if (slot.courseId && slot.courseId !== courseId) throw new Error('Slot does not belong to this course.');
      if (slotStart <= now) throw new Error('Cannot book a past slot. Please choose a future time.');

      // Capacity check
      const reservedCount = await tx.enrollment.count({
        where: { slot_id: slotId, is_active: true },
      });
      if (reservedCount >= slot.capacity) throw new Error('Slot is full.');

      // Demo limit per user per course
      const demoCount = await tx.enrollment.count({
        where: {
          user_id: userId,
          course_id: courseId,
          enrollment_type: EnrollmentType.demo,
          is_active: true,
        },
      });
      if (demoCount >= 5) throw new Error('You can book only one demo session per course.');

      // Fetch course
      const course = await tx.course.findUnique({ where: { course_id: courseId } });
      if (!course) throw new Error('Course not found.');

      // Create session
      const newSession = await tx.session.create({
        data: {
          user_id: userId,
          teacher_id: slot.teacherId,
          slot_id: slotId,
          course_id: courseId,
          category_id: course.category_id,
          schedule_at: slotStart,
          session_type: SessionType.demo,
          status: SessionStatus.schedule,
          class_type: ClassType.one_to_one,
        },
      });

      // Create enrollment and link session
      const newEnrollment = await tx.enrollment.create({
        data: {
          user_id: userId,
          course_id: courseId,
          slot_id: slotId,
          enrollment_type: EnrollmentType.demo,
          enrollment_date: new Date(),
          is_active: true,
          sessions: { connect: [{ session_id: newSession.session_id }] },
        },
      });

      // Update slot status if capacity reached
      if (reservedCount + 1 >= slot.capacity) {
        await tx.slot.update({
          where: { slot_id: slotId },
          data: { status: SlotStatus.trial_reserved },
        });
      }

      return { enrollment: newEnrollment, session: newSession, reservedCount: reservedCount + 1 };
    }, { timeout: 10000 });
  }

  async getStudentDemoEnrollments(userId: string) {
    return this.db.enrollment.findMany({
      where: {
        user_id: userId,
        enrollment_type: EnrollmentType.demo,
        is_active: true,
      },
      include: {
        course: true,
        slot: {
          include: {
            teacher: {
              include: { user: true },
            },
          },
        },
        sessions: true,
      },
      orderBy: {
        enrollment_date: 'desc',
      },
    });
  }

  async updateSlotStatus(slotId: number, status: SlotStatus): Promise<SlotWithRelations> {
    return this.db.slot.update({
      where: { slot_id: slotId },
      data: { status },
      include: {
        teacher: { include: { user: true } },
        course: true,
        enrollments: true,
        session: true,
      },
    });
  }

  async reserveSlot(slotId: number, userId: string): Promise<SlotWithRelations> {
    return this.db.slot.update({
      where: { slot_id: slotId },
      data: { 
        reservedByUserId: userId,
        status: SlotStatus.trial_reserved,
      },
      include: {
        teacher: { include: { user: true } },
        course: true,
        enrollments: true,
        session: true,
      },
    });
  }

  async getSlotsByTeacher(teacherId: string, page: number = 0, limit: number = 100) {
    return this.db.slot.findMany({
      where: { teacherId },
      orderBy: { slot_date: 'asc' },
      include: {
        course: true,
        enrollments: true,
        session: true,
      },
      skip: page * limit,
      take: limit,
    });
  }

  async getSlotsByCourse(courseId: string, page: number = 0, limit: number = 100) {
    return this.db.slot.findMany({
      where: { courseId },
      orderBy: { slot_date: 'asc' },
      include: {
        teacher: { include: { user: true } },
        enrollments: true,
        session: true,
      },
      skip: page * limit,
      take: limit,
    });
  }

  async getAvailableSlots(filters: {
    courseId?: string;
    teacherId?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }, page: number = 0, limit: number = 100) {
    const where: any = {
      status: SlotStatus.open,
    };

    if (filters.courseId) where.courseId = filters.courseId;
    if (filters.teacherId) where.teacherId = filters.teacherId;
    if (filters.dateFrom || filters.dateTo) {
      where.slot_date = {};
      if (filters.dateFrom) where.slot_date.gte = filters.dateFrom;
      if (filters.dateTo) where.slot_date.lte = filters.dateTo;
    }

    return this.db.slot.findMany({
      where,
      orderBy: { slot_date: 'asc' },
      include: {
        teacher: { include: { user: true } },
        course: true,
        enrollments: true,
        session: true,
      },
      skip: page * limit,
      take: limit,
    });
  }

  async deleteSlot(slotId: number): Promise<void> {
    await this.db.slot.delete({
      where: { slot_id: slotId },
    });
  }

  async deleteExpiredOpenSlots(): Promise<number> {
    const now = new Date();
    const result = await this.db.slot.deleteMany({
      where: {
        end_time: { lt: now },
      },
    });
    return result.count;
  }
}
