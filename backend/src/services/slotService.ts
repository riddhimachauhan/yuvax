import { SlotRepository } from '../repositories/slotRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { SlotStatus } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { CreateSlotRequest, ListSlotsRequest, ReserveDemoRequest, } from '../dto/request/slotRequest';

dayjs.extend(utc);
dayjs.extend(timezone);






export class SlotService {
  private slotRepository: SlotRepository;

  constructor() {
    this.slotRepository = new SlotRepository();
  }

  async createSlots(request: CreateSlotRequest) {
    const { teacherId, slots } = request;

    if (!teacherId || !slots || !Array.isArray(slots) || slots.length === 0) {
      throw new CustomError('Invalid input: teacherId and an array of slots are required', HTTP_STATUS.BAD_REQUEST);
    }

    // Get teacher information
    const teacher = await this.slotRepository.getTeacherWithTimezone(teacherId);
    if (!teacher) {
      throw new CustomError('Teacher not found in TeachersRoaster', HTTP_STATUS.NOT_FOUND);
    }

    const teacherTimezone = teacher.user?.zone || teacher.countries?.[0]?.zone?.name;
    if (!teacherTimezone) {
      throw new CustomError('Teacher timezone not found. Assign a zone to the teacher', HTTP_STATUS.NOT_FOUND);
    }

    // Determine assigned course
    let assignedCourseId: string | undefined = undefined;
    if (teacher.courses && teacher.courses.length === 1) {
      assignedCourseId = teacher.courses[0].course_id;
    } else if (teacher.courses && teacher.courses.length === 1) {
      assignedCourseId = teacher.courses[0].course_id;
    }

    // Validate slots
    const newSlotsData: any[] = [];

    for (const slot of slots) {
      const slotCourseId = slot.courseId ?? assignedCourseId;
      if (!slotCourseId) {
        throw new CustomError('courseId is required for each slot when teacher has no single assigned course', HTTP_STATUS.BAD_REQUEST);
      }

      if (assignedCourseId && slot.courseId && slot.courseId !== assignedCourseId) {
        throw new CustomError(`Slot courseId ${slot.courseId} does not match teacher's assigned course ${assignedCourseId}`, HTTP_STATUS.BAD_REQUEST);
      }

      // Convert times to UTC
      let startDateTimeUTC: Date;
      let endDateTimeUTC: Date;

      if (typeof slot.start_time === 'string' && (slot.start_time.includes('+') || slot.start_time.endsWith('Z'))) {
        startDateTimeUTC = dayjs(slot.start_time).utc().toDate();
        endDateTimeUTC = dayjs(slot.end_time).utc().toDate();
      } else {
        startDateTimeUTC = dayjs.tz(slot.start_time, teacherTimezone).utc().toDate();
        endDateTimeUTC = dayjs.tz(slot.end_time, teacherTimezone).utc().toDate();
      }

      newSlotsData.push({
        teacherId,
        courseId: slotCourseId,
        slot_date: startDateTimeUTC,
        start_time: startDateTimeUTC,
        end_time: endDateTimeUTC,
        capacity: slot.capacity || 1,
        status: SlotStatus.open,
      });
    }

    return await this.slotRepository.createMany(newSlotsData);
  }

  async listSlots(request: ListSlotsRequest) {
    const { teacherId, dateFrom, dateTo, courseId, timezone: userTimezone, page = 0, limit = 100 } = request;

    const where: any = {};

    if (teacherId) {
      where.teacherId = teacherId;
    }

    if (courseId) {
      where.courseId = courseId;
    }

    if (dateFrom || dateTo) {
      if (!userTimezone) {
        throw new CustomError('Timezone is required when filtering by date range', HTTP_STATUS.BAD_REQUEST);
      }

      const startUtc = dateFrom
        ? dayjs.tz(dateFrom, userTimezone).startOf('day').utc().toDate()
        : undefined;

      const endUtc = dateTo
        ? dayjs.tz(dateTo, userTimezone).endOf('day').utc().toDate()
        : undefined;

      where.slot_date = {};
      if (startUtc) where.slot_date.gte = startUtc;
      if (endUtc) where.slot_date.lte = endUtc;
    } else {
      // Default: only future slots
      where.start_time = { gt: new Date() };
    }

    // Purge expired slots before listing
    try { await this.slotRepository.deleteExpiredOpenSlots(); } catch {}

    const slots = await this.slotRepository.findMany(where, page, limit);

    // Enrich with additional data
    const enriched = await Promise.all(
      slots.map(async (slot) => {
        const reservedCount = await this.slotRepository.getReservedCount(slot.slot_id);

        // Convert from UTC to user's timezone for display
        const localStartTime = userTimezone
          ? dayjs(slot.start_time).utc().tz(userTimezone)
          : dayjs(slot.start_time);
        const localEndTime = userTimezone
          ? dayjs(slot.end_time).utc().tz(userTimezone)
          : dayjs(slot.end_time);

        return {
          ...slot,
          reservedCount,
          start_time_local: localStartTime.format('YYYY-MM-DD HH:mm'),
          end_time_local: localEndTime.format('YYYY-MM-DD HH:mm'),
          isAvailable: reservedCount < slot.capacity,
        };
      })
    );

    return {
      count: enriched.length,
      data: enriched,
    };
  }

  async reserveAndConfirmDemo(request: ReserveDemoRequest) {
    const { slotId, userId, courseId } = request;

    if (!slotId || !userId || !courseId) {
      throw new CustomError('slotId, userId and courseId are required', HTTP_STATUS.BAD_REQUEST);
    }

    return await this.slotRepository.reserveAndConfirmDemo(slotId, userId, courseId);
  }

  async getTeacherOpenSlots(teacherId: string, filters: {
    courseId?: string;
    timezone?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }) {
    if (!teacherId) {
      throw new CustomError('teacherId is required', HTTP_STATUS.BAD_REQUEST);
    }

    // Get teacher timezone
    const teacher = await this.slotRepository.getTeacherWithTimezone(teacherId);
    if (!teacher) {
      throw new CustomError('Teacher not found', HTTP_STATUS.NOT_FOUND);
    }

    const resolvedTz = filters.timezone || teacher.user?.zone || teacher.countries?.[0]?.zone?.name || 'UTC';

    const where: any = {
      teacherId,
      status: SlotStatus.open,
    };

    if (filters.courseId) {
      where.courseId = filters.courseId;
    }

    // Date filtering
    if (filters.dateFrom || filters.dateTo) {
      const start = filters.dateFrom
        ? /[Z+\-]\d*$/.test(filters.dateFrom) || filters.dateFrom.endsWith('Z')
          ? dayjs(filters.dateFrom).utc().toDate()
          : dayjs.tz(filters.dateFrom, resolvedTz).utc().toDate()
        : undefined;

      const end = filters.dateTo
        ? /[Z+\-]\d*$/.test(filters.dateTo) || filters.dateTo.endsWith('Z')
          ? dayjs(filters.dateTo).utc().toDate()
          : dayjs.tz(filters.dateTo, resolvedTz).utc().toDate()
        : undefined;

      where.start_time = {};
      if (start) where.start_time.gte = start;
      if (end) where.start_time.lte = end;
    } else {
      // Default to future slots
      where.start_time = { gt: new Date() };
    }

    // Purge expired slots before listing
    try { await this.slotRepository.deleteExpiredOpenSlots(); } catch {}

    const slots = await this.slotRepository.findMany(where, filters.page || 0, filters.limit || 100);

    // Enrich with reserved count and local times
    const enriched = await Promise.all(
      slots.map(async (slot) => {
        const reservedCount = await this.slotRepository.getReservedCount(slot.slot_id);

        const startLocal = dayjs(slot.start_time)
          .utc()
          .tz(resolvedTz)
          .format('YYYY-MM-DD HH:mm');
        const endLocal = dayjs(slot.end_time)
          .utc()
          .tz(resolvedTz)
          .format('YYYY-MM-DD HH:mm');

        return {
          slot_id: slot.slot_id,
          course: slot.course,
          slot_date: slot.slot_date,
          start_time_utc: slot.start_time,
          end_time_utc: slot.end_time,
          start_time_local: startLocal,
          end_time_local: endLocal,
          capacity: slot.capacity,
          status: slot.status,
          reservedCount,
          isAvailable: reservedCount < slot.capacity,
        };
      })
    );

    return {
      count: enriched.length,
      data: enriched,
    };
  }

  async getStudentDemoSchedule(userId: string, timezone: string) {
    if (!userId) {
      throw new CustomError('userId is required to fetch the schedule', HTTP_STATUS.BAD_REQUEST);
    }

    if (!timezone) {
      throw new CustomError('Timezone is required to display the schedule in local time', HTTP_STATUS.BAD_REQUEST);
    }

    const demoEnrollments = await this.slotRepository.getStudentDemoEnrollments(userId);

    const enrichedEnrollments = demoEnrollments.map((enrollment) => {
      const session = enrollment.sessions.length > 0 ? enrollment.sessions[0] : null;

      const sessionWithLocalTime = session
        ? {
            ...session,
            schedule_at_local: dayjs(session.schedule_at).tz(timezone).format(),
          }
        : null;

      const { sessions, ...restOfEnrollment } = enrollment;

      return {
        ...restOfEnrollment,
        session: sessionWithLocalTime,
      };
    });

    return {
      data: enrichedEnrollments,
    };
  }
}
