export interface CreateQuizRequest {
  chapter_id: string;
  title: string;
  description?: string;
  type?: 'practice' | 'assessment' | 'final';
  total_marks?: number;
}

export interface UpdateQuizRequest {
  title?: string;
  description?: string;
  type?: 'practice' | 'assessment' | 'final';
  total_marks?: number;
}

export interface QuizQueryParams {
  page?: number;
  limit?: number;
  chapter_id?: string;
  type?: string;
  search?: string;
}