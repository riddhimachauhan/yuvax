import { DyteRepository } from "../repositories/dyteRepository";
import { createRealtimeMeeting, addRealtimeParticipant } from "../lib/realtimekit";
import { Prisma } from "@prisma/client";

export class DyteClassService {
  private repo: DyteRepository;

  constructor() {
    this.repo = new DyteRepository();
  }

  async startClass(sessionId: string) {
    const session = await this.repo.getSessionWithParticipants(sessionId);
    if (!session) {
      return { status: 404 as const, body: { message: "Session not found" } };
    }

    if (session.dyte_session_id) {
      return {
        status: 200 as const,
        body: {
          success: true,
          message: "Dyte meeting already exists",
          data: {
            dyte_session_id: session.dyte_session_id,
            dyte_host_token: session.dyte_host_token,
            dyte_join_tokens: session.dyte_join_tokens as Record<string, string> | null,
          },
        },
      };
    }

    const meeting = await createRealtimeMeeting(`Class-${session.session_id}`);

    const teacherData = await addRealtimeParticipant(
      meeting.id,
      session.teacher_id,
      session.teacher.user.full_name,
      "Teacher_Preset"
    );

    const studentTokens: Record<string, string> = {};
    for (const enrollment of session.enrollments) {
      const student = enrollment.user;
      const studentData = await addRealtimeParticipant(
        meeting.id,
        student.user_id,
        student.full_name,
        "Student_Preset"
      );
      studentTokens[student.user_id] = studentData.token;
    }

    const updated = await this.repo.updateSessionDyteData(sessionId, {
      dyte_session_id: meeting.id,
      dyte_app_id: process.env.CF_ORG_ID || null,
      dyte_host_token: teacherData.token,
      dyte_join_tokens: studentTokens as unknown as Prisma.InputJsonValue,
    });

    return {
      status: 200 as const,
      body: {
        success: true,
        message: "Dyte meeting created",
        data: {
          meetingId: updated.dyte_session_id,
          teacherToken: updated.dyte_host_token,
          studentTokens: updated.dyte_join_tokens as Record<string, string> | null,
        },
      },
    };
  }

  async joinClass(sessionId: string, userId: string, role: "teacher" | "student") {
    const session = await this.repo.getSessionById(sessionId);
    if (!session) {
      return { status: 404 as const, body: { message: "Session not found" } };
    }

    if (role === "teacher") {
      return { status: 200 as const, body: { token: session.dyte_host_token } };
    }

    const tokens = (session.dyte_join_tokens || {}) as unknown as Record<string, string>;
    return { status: 200 as const, body: { token: tokens[userId] } };
  }
}

