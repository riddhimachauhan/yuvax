// ============================================
// API RESPONSE TYPES
// ============================================

export interface Question {
  question_id: string;
  quiz_id: string;
  text: string;
  marks: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_answer: number;
  created_at: string;
}

export interface Course {
  course_id: string;
  course_name: string;
  category_id: string;
  course_description: string;
  course_content: string;
  course_image: string;
  difficulty: string;
  course_duration: string;
  language: string;
  min_age: string;
  max_age: string;
  teacher_id: string;
  created_at: string;
  updated_at: string;
}

export interface Module {
  module_id: string;
  course_id: string;
  student_note_link: string;
  teacher_note_link: string;
  PPT_link: string;
  module_description: string;
  module_title: string;
  duration: number;
  created_at: string;
  updated_at: string;
  course: Course;
}

export interface Chapter {
  chapter_id: string;
  module_id: string;
  chapter_name: string;
  description: string;
  capacity: number;
  updated_at: string;
  created_at: string;
  module: Module;
}

export interface Quiz {
  quiz_id: string;
  chapter_id: string;
  title: string;
  description: string;
  type: string;
  total_marks: number;
  created_at: string;
  updated_at: string;
  chapter: Chapter;
  questions: Question[];
}

export interface QuizApiResponse {
  success: boolean;
  message: string;
  data: {
    quizzes: Quiz[];
    total: number;
    totalPages: number;
  };
}