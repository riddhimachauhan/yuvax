// src/dto/response/dashboardResponse.ts
export interface RawDashboard {
  quizStats: { avgScore: number };
  attendanceStats: { pct: number };
  enrollmentStats: { complete: number };
  sessionTimes: { minutes: number };
  submissionStats: { pct: number };
  streakXp: { streakDays: number; xp: number };
  notificationsCount?: number;
}

export interface DashboardDto {
  overallScore: number;
  quizzesScore: number;
  attendance: number;
  coursesComplete: number;
  studyHours: string;
  submissionRate: number;
  streakDays: number;
  xp: number;
  notificationsCount: number;
}

export function mapDashboardResponse(raw: RawDashboard): DashboardDto {
  const overallScore = raw.quizStats?.avgScore ?? 0;
  const quizzesScore = raw.quizStats?.avgScore ?? 0;
  const attendance = raw.attendanceStats?.pct ?? 0;
  const coursesComplete = raw.enrollmentStats?.complete ?? 0;
  const totalMinutes = raw.sessionTimes?.minutes ?? 0;
  const studyHours = Math.floor(totalMinutes / 60);
  const studyMins = totalMinutes % 60;
  const submissionRate = raw.submissionStats?.pct ?? 0;
  const streakDays = raw.streakXp?.streakDays ?? 0;
  const xp = raw.streakXp?.xp ?? 0;
  const notificationsCount = raw.notificationsCount ?? 0;

  return {
    overallScore,
    quizzesScore,
    attendance,
    coursesComplete,
    studyHours: `${studyHours} Hr ${studyMins} min`,
    submissionRate,
    streakDays,
    xp,
    notificationsCount
  };
}
