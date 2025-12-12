export interface AssignTeacherResponse {
  success: boolean;
  message: string;
  data?: {
    course_id: string;
    teacher_ids: string[];
  };
}
