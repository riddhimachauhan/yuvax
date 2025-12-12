export interface AssignmentResponse {
  assignment_id: string;
  course_id: string;
  module_id: string;
  title: string;
  description?: string;
  type: string;
  language?: string;
  starter_code?: string;
  metadata?: any;
  reward_points: number;
  created_by: string;
  createdAt: Date;
  updatedAt: Date;
  course?: {
    course_id: string;
    course_name: string;
    course_description?: string;
  };
  module?: {
    module_id: string;
    module_title: string;
    duration: number;
  };
  creator?: {
    user_id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  submissions?: Array<{
    submission_id: string;
    user_id: string;
    status: string;
    score?: number;
    submitted_at: Date;
  }>;
}

export interface AssignmentStatsResponse {
  totalSubmissions: number;
  completedSubmissions: number;
  averageScore: number;
}

export interface AssignmentListResponse {
  assignments: AssignmentResponse[];
  total: number;
  totalPages: number;
  currentPage: number;
}
