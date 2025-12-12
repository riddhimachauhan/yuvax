// dto/request/enrollmentRequest.ts
export interface EnrollmentCreateRequest {
  user_id: string;
  course_id: string;
  slot_id?: number;
  enrollment_type: "demo" | "trial" | "paid";
  sales_person_id?: string;
}

export interface EnrollmentUpdateRequest {
  expiry_date?: string;
  progress?: number;
  is_active?: boolean;
}