import { validateRequest } from '../middlewares/validationMiddleware';

// QuizAttempt creation validation
export const validateQuizAttemptCreation = validateRequest([
  {
    field: 'quiz_id',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'student_id',
    required: true,
    type: 'string',
    minLength: 1,
  },
]);

// QuizAttempt update validation
export const validateQuizAttemptUpdate = validateRequest([
  {
    field: 'score',
    required: false,
    type: 'number',
    custom: (value: number) => {
      if (value < 0) return 'Score cannot be negative';
      return true;
    },
  },
  {
    field: 'submitted_at',
    required: false,
    type: 'string', // ISO date string
    custom: (value: string) => {
      if (isNaN(Date.parse(value))) return 'submitted_at must be a valid date';
      return true;
    },
  },
  {
    field: 'timer',
    required: false,
    type: 'array',
  },
  {
    field: 'AttemptedCount',
    required: false,
    type: 'number',
    custom: (value: number) => {
      if (value < 0) return 'AttemptedCount cannot be negative';
      return true;
    },
  },
  {
    field: 'correctCount',
    required: false,
    type: 'number',
    custom: (value: number) => {
      if (value < 0) return 'correctCount cannot be negative';
      return true;
    },
  },
]);

// QuizAttempt ID validation (for params)
export const validateQuizAttemptId = validateRequest([
  {
    field: 'id',
    required: true,
    type: 'string',
    in: 'params',
    minLength: 1,
    custom: (value: string) => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value) || 'QuizAttempt ID must be a valid UUID';
    },
  },
]);

// Optional: Quiz ID validation (for fetching all attempts of a quiz)
export const validateQuizIdParam = validateRequest([
  {
    field: 'quiz_id',
    required: true,
    type: 'string',
    in: 'params',
    minLength: 1,
    custom: (value: string) => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value) || 'Quiz ID must be a valid UUID';
    },
  },
]);

// Optional: Student ID validation (for fetching all attempts of a student)
export const validateStudentIdParam = validateRequest([
  {
    field: 'student_id',
    required: true,
    type: 'string',
    in: 'params',
    minLength: 1,
    custom: (value: string) => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value) || 'Student ID must be a valid UUID';
    },
  },
]);
