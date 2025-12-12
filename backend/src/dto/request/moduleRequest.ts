export interface CreateModuleRequest {
  course_id: string;
  module_title: string;
  duration: number;
  module_description?: string;
  student_note_link?: string;
  teacher_note_link?: string;
  PPT_link?: string;
}

export interface UpdateModuleRequest {
  module_title?: string;
  duration?: number;
  module_description?: string;
  student_note_link?: string;
  teacher_note_link?: string;
  PPT_link?: string;
}

export interface ModuleQueryParams {
  page?: number;
  limit?: number;
  course_id?: string;
  search?: string;
}
