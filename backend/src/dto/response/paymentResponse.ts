export interface PaymentResponse {
  payment_ID: string;
  no_of_session_purchase?: number;
  sales_person_id?: string;
  user_id: string;
  is_converted: boolean;
  course_id?: string;
  amount: number;
  currency: string;
  payment_method?: string;
  transaction_id: string;
  receipt?: string;
  status: "pending" | "Paid" | "Refund" | "processing";
  updated_at: string;
  created_at: string;
  refunded_at?: string;
  enrollment_id?: string;
}

export interface PaymentCaptureResponse {
  success: boolean;
  courseName: string;
  courseDescription?: string;
  thumbnail?: string;
  orderId: string;
  currency: string;
  amount: number;
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  payment_id: string;
}

export interface RefundResponse {
  success: boolean;
  message: string;
  refund_id: string;
}

export interface PaymentHistoryResponse {
  success: boolean;
  payments: PaymentResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
