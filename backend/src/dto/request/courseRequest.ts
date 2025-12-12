export interface CreateCourseRequest {
  course_name: string;
  category_id: string;
  course_description?: string;
  course_content?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  course_duration: string;
  course_image: string;
  language: string;
  min_age?: string;
  max_age?: string;
}

export interface UpdateCourseRequest {
  course_name?: string;
  category_id?: string;
  course_description?: string;
  course_content?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  course_duration?: string;
  course_image?: string;
  language?: string;
  min_age?: string;
  max_age?: string;
}

export interface CourseQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  difficulty?: string;
  language?: string;
  search?: string;
}