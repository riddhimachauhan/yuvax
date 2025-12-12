// dto/request/paymentRequest.ts
export interface PaymentCreateRequest {
  user_id: string;
  amount: number;
  currency: string;
  course_id?: string;
  sales_person_id?: string;
  payment_method?: string;
  transaction_id: string;
  no_of_session_purchase?: number;
  receipt?: string;
}

export interface PaymentUpdateRequest {
  status?: "pending" | "Paid" | "Refund" | "processing";
  refunded_at?: string;
  is_converted?: boolean;
}

export interface PaymentCaptureRequest {
  course_id: string;
  user_id: string;
}

export interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  course_id: string;
  user_id: string;
}

export interface RefundRequest {
  paymentId: string;
  enrollmentId: string;
  user_id: string;
}

export interface PaymentHistoryRequest {
  user_id: string;
  page?: number;
  limit?: number;
}

export interface PaymentFilterRequest {
  user_id?: string;
  course_id?: string;
  status?: "pending" | "Paid" | "Refund" | "processing";
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}