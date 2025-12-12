// dto/response/quizAttemptResponse.ts
export interface QuizAttemptResponse {
  attempt_id: string;
  quiz_id: string;
  student_id: string;
  started_at: string;
  submitted_at?: string;
  score?: number;
  timer: string[];
  AttemptedCount?: number;
  correctCount?: number;
}
