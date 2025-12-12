export interface SlotResponse {
  slot_id: number
  slot_date: string
  start_time: string
  end_time: string
  capacity: number
  status: "open" | "trial_reserved" | "paid_reserved"
  teacherId: string
  courseId?: string
  reservedByUserId?: string
  created_at: string
}
