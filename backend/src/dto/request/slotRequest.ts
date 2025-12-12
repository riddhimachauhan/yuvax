export interface CreateSlotRequest {
  teacherId: string;
  slots: Array<{
    start_time: string;
    end_time: string;
    capacity: number;
    courseId?: string;
  }>;
}



export interface CreateMultipleSlotsRequest {
  teacherId: string;
  slots: Array<{
    start_time: string;
    end_time: string;
    capacity: number;
    courseId?: string;
  }>;
}

export interface UpdateSlotRequest {
  status?: "open" | "trial_reserved" | "paid_reserved";
  reservedByUserId?: string;
  capacity?: number;
}

export interface ListSlotsRequest {
  teacherId?: string;
  courseId?: string;
  dateFrom?: string;
  dateTo?: string;
  timezone?: string;
  page?: number;
  limit?: number;
}

export interface ReserveDemoRequest {
  slotId: number;
  userId: string;
  courseId: string;
}

export interface GetTeacherSlotsRequest {
  courseId?: string;
  timezone?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface GetStudentScheduleRequest {
  timezone: string;
}
