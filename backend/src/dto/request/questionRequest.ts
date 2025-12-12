// dto/request/questionRequest.ts
export interface QuestionCreateRequest {
  quiz_id: string;
  text: string;
  marks: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_answer: 1 | 2 | 3 | 4;
}