// dto/request/submissionRequest.ts
export interface SubmissionCreateRequest {
  assignment_id: string;
  student_id: string;
  response_data?: any;
  code: string;
  language: string;
}


export interface SubmissionGradeRequest {
  submission_id: string;
  marks_obtained: number;
  is_correct: boolean;
  feedback?: string;
  graded_by: string;
}




export interface GetSubmissionsRequest {
  assignment_id?: string;
  student_id?: string;
  graded_by?: string;
  page?: number;
  limit?: number;
}


export interface QuizSubmissionRequest {
  assignment_id: string;
  student_id: string;
  response_data: {
    answers: number[];
  };
}

export interface PuzzleSubmissionRequest {
  assignment_id: string;
  student_id: string;
  response_data: {
    solution: any;
  };
}

export interface CodeSubmissionRequest {
  assignment_id: string;
  student_id: string;
  code: string;
  language: string;
}

export interface SubmissionFilterRequest {
  assignment_id?: string;
  student_id?: string;
  graded_by?: string;
  is_correct?: boolean;
  graded?: boolean;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}