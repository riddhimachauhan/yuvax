// dto/request/quizAttemptRequest.ts
export interface QuizAttemptCreateRequest {
  quiz_id: string;
  student_id: string;
}

export interface QuizAttemptUpdateRequest {
  score?: number;
  submitted_at?: Date;
  timer?: string[];
  AttemptedCount?: number;
  correctCount?: number;
}
