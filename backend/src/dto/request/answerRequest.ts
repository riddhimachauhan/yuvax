export interface CreateAnswerRequest {
  attempt_id: string;
  question_id: string;
  selected_option: number;
}

export interface UpdateAnswerRequest {
  selected_option: number;
}
