import { PrismaClient, Prisma } from "@prisma/client";
import { getPrismaClient } from "../config/database";

export class DyteRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async getSessionWithParticipants(sessionId: string) {
    return this.db.session.findUnique({
      where: { session_id: sessionId },
      include: {
        teacher: { include: { user: true } },
        enrollments: { include: { user: true } },
      },
    });
  }

  async getSessionById(sessionId: string) {
    return this.db.session.findUnique({ where: { session_id: sessionId } });
  }

  async updateSessionDyteData(sessionId: string, data: Prisma.SessionUpdateInput) {
    return this.db.session.update({
      where: { session_id: sessionId },
      data,
    });
  }
}
