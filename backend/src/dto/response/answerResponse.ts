export interface AnswerResponse {
  answer_id: string;
  attempt_id: string;
  question_id: string;
  selected_option: number;
  is_correct?: boolean;
}
