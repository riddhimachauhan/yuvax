import { WherebyRepository } from '../repositories/wherebyRepository';
import { HTTP_STATUS } from '../utils/constants';
import { CustomError } from '../middlewares/errorHandler';
import { createWherebyRoom } from '../lib/whereby';
import { createExcalidrawRoomURL } from '../lib/whiteboard';

const DEFAULT_DURATION_MINS = 60;

function computeEndDate(scheduleAt: Date, durationMins = DEFAULT_DURATION_MINS) {
  const plannedEnd = new Date(scheduleAt.getTime() + durationMins * 60000);
  const nowPlus5 = new Date(Date.now() + 5 * 60000);
  return plannedEnd > nowPlus5 ? plannedEnd : new Date(Date.now() + durationMins * 60000);
}

export class WherebyService {
  private repo: WherebyRepository;

  constructor() {
    this.repo = new WherebyRepository();
  }

  async scheduleWherebyClass(sessionId: string) {
    if (!sessionId) {
      throw new CustomError('sessionId is required', HTTP_STATUS.BAD_REQUEST);
    }

    const session = await this.repo.getSessionForSchedule(sessionId);
    if (!session) {
      throw new CustomError('Session not found', HTTP_STATUS.NOT_FOUND);
    }

    const scheduleAt = new Date(session.schedule_at as any);
    const endDate = computeEndDate(scheduleAt, DEFAULT_DURATION_MINS);

    const meeting = await createWherebyRoom(endDate.toISOString());

    let whiteboardUrl = (session as any).whiteboard_url as string | null | undefined;
    if (!whiteboardUrl) {
      whiteboardUrl = createExcalidrawRoomURL();
    }

    await this.repo.updateSessionWhereby(sessionId, {
      whereby_meeting_id: meeting.meetingId,
      whereby_room_url: meeting.roomUrl,
      whereby_host_url: meeting.hostRoomUrl,
      whiteboard_url: whiteboardUrl,
    });

    return { meeting, whiteboardUrl };
  }

  async joinWherebyClass(sessionId: string, userId: string) {
    if (!sessionId || !userId) {
      throw new CustomError('sessionId and userId are required', HTTP_STATUS.BAD_REQUEST);
    }

    const session = await this.repo.getSessionWithTeacher(sessionId);
    if (!session) {
      throw new CustomError('Session not found', HTTP_STATUS.NOT_FOUND);
    }

    if (!session.whereby_room_url || !session.whereby_host_url) {
      throw new CustomError('Whereby not scheduled for this session', HTTP_STATUS.BAD_REQUEST);
    }

    const isTeacher = (session as any).teacher_id === userId;
    const baseUrl = isTeacher ? session.whereby_host_url : session.whereby_room_url;

    const joinUrl = baseUrl.includes('?')
      ? `${baseUrl}&embed&iframe&chat=on&screenshare=on`
      : `${baseUrl}?embed&iframe&chat=on&screenshare=on`;

    return {
      joinUrl,
      whiteboardUrl: (session as any).whiteboard_url ?? null,
      isTeacher,
    };
  }

  async getUserClasses(userId: string) {
    if (!userId) {
      throw new CustomError('userId is required', HTTP_STATUS.BAD_REQUEST);
    }
    return this.repo.getUserClasses(userId);
  }

  async getTeacherClasses(teacherId: string) {
    if (!teacherId) {
      throw new CustomError('teacherId is required', HTTP_STATUS.BAD_REQUEST);
    }
    return this.repo.getTeacherClasses(teacherId);
  }

  async resetWhiteboard(sessionId: string) {
    if (!sessionId) {
      throw new CustomError('sessionId is required', HTTP_STATUS.BAD_REQUEST);
    }

    const session = await this.repo.getSessionById(sessionId);
    if (!session) {
      throw new CustomError('Session not found', HTTP_STATUS.NOT_FOUND);
    }

    const newWhiteboardUrl = createExcalidrawRoomURL();
    await this.repo.updateWhiteboard(sessionId, newWhiteboardUrl);

    return { sessionId, newWhiteboardUrl };
  }
}
