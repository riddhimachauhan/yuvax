export interface CreateAssignmentRequest {
  course_id: string;
  module_id: string;
  title: string;
  description?: string;
  type: 'QUIZ' | 'PUZZLE' | 'CODE_EXERCISE';
  language?: string;
  starter_code?: string;
  metadata?: any;
  reward_points?: number;
  created_by: string;
}

export interface UpdateAssignmentRequest {
  title?: string;
  description?: string;
  type?: 'QUIZ' | 'PUZZLE' | 'CODE_EXERCISE';
  language?: string;
  starter_code?: string;
  metadata?: any;
  reward_points?: number;
}

export interface AssignmentQueryParams {
  page?: number;
  limit?: number;
  course_id?: string;
  module_id?: string;
  type?: string;
  created_by?: string;
  search?: string;
}