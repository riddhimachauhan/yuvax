// dto/request/sessionRequest.ts
export interface SessionCreateRequest {
  schedule_at: string;
  class_type: "one_to_one" | "one_to_many" | "recorded";
  session_type: "demo" | "paid" | "trial";
  teacher_id: string;
  user_id: string;
  category_id: string;
  course_id: string;
  slot_id: number;
  module_id?: string;
  chapter_id?: string;
}

export interface SessionUpdateRequest {
  status?: "schedule" | "completed" | "cancelled" | "no_show" | "Reschedule";
  teacher_join_url?: string;
  student_join_url?: string;
  recording_url?: string;
  actual_start_time?: string;
  actual_end_time?: string;
}