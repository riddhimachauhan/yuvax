export interface AssignTeacherRequest {
  course_id: string;
  teacher_ids: string[]; // multiple teacher IDs
}
