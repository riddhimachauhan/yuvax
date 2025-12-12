export interface ModuleResponse {
  module_id: string;
  course_id: string;
  module_title: string;
  duration: number;
  module_description?: string;
  student_note_link?: string;
  teacher_note_link?: string;
  PPT_link?: string;
  createdAt: Date;
  updatedAt: Date;
  course?: {
    course_id: string;
    course_name: string;
    course_description?: string;
  };
  chapters?: Array<{
    chapter_id: string;
    chapter_name: string;
    description?: string;
    capacity?: number;
  }>;
  assignments?: Array<{
    assignment_id: string;
    title: string;
    type: string;
    reward_points: number;
  }>;
}

export interface ModuleStatsResponse {
  totalChapters: number;
  totalAssignments: number;
  totalSessions: number;
  totalDuration: number;
}

export interface ModuleListResponse {
  modules: ModuleResponse[];
  total: number;
  totalPages: number;
  currentPage: number;
}
