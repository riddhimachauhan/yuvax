// dto/request/feedbackRequest.ts
export interface FeedbackCreateRequest {
  sessionId?: string;
  giverId: string;
  giverRole: "student" | "teacher";
  takerId: string;
  takerRole: "student" | "teacher";
  rating: number;
  comments: string;
}