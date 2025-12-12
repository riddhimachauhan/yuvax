export interface QuizResponse {
  quiz_id: string;
  chapter_id: string;
  title: string;
  description?: string;
  type?: string;
  total_marks?: number;
  createdAt: Date;
  updatedAt: Date;
  chapter?: {
    chapter_id: string;
    chapter_name: string;
    description?: string;
    module?: {
      module_id: string;
      module_title: string;
      course?: {
        course_id: string;
        course_name: string;
      };
    };
  };
  questions?: Array<{
    question_id: string;
    text: string;
    marks: number;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct_answer: string;
  }>;
  attempts?: Array<{
    attempt_id: string;
    user_id: string;
    score?: number;
    completed_at?: Date;
  }>;
}

export interface QuizStatsResponse {
  totalQuestions: number;
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
}

export interface QuizListResponse {
  quizzes: QuizResponse[];
  total: number;
  totalPages: number;
  currentPage: number;
}
