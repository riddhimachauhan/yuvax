export interface SubmissionResponse {
  submission_id: string;
  assignment_id: string;
  student_id: string;
  response_data?: any;
  code?: string;
  language?: string;
  is_correct?: boolean;
  marks_obtained?: number;
  feedback?: string;
  graded_by?: string;
  submitted_at: string;
  graded_at?: string;
  
  // Relations
  assignment?: {
    assignment_id: string;
    title: string;
    description: string;
    type: "QUIZ" | "CODE_EXERCISE" | "PUZZLE";
    max_score?: number;
    reward_points: number;
  };
  student?: {
    user_id: string;
    full_name: string;
    email: string;
  };
  grader?: {
    user_id: string;
    full_name: string;
    email: string;
  };
}

export interface SubmissionListResponse {
  success: boolean;
  message: string;
  submissions: SubmissionResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SubmissionDetailResponse {
  success: boolean;
  message: string;
  data: SubmissionResponse;
}

export interface SubmissionStatsResponse {
  success: boolean;
  message: string;
  stats: {
    total: number;
    graded: number;
    ungraded: number;
    correct: number;
    incorrect: number;
    gradingProgress: number;
    accuracy: number;
  };
}

export interface QuizSubmissionData {
  answers: number[];
}

export interface PuzzleSubmissionData {
  solution: any;
}

export interface CodeSubmissionData {
  code: string;
  language: string;
  output?: string;
}
