import { validateRequest } from '../middlewares/validationMiddleware';

// Quiz creation validation
export const validateQuizCreation = validateRequest([
  {
    field: 'chapter_id',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'title',
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 200,
  },
  {
    field: 'description',
    required: false,
    type: 'string',
    maxLength: 1000,
  },
  {
    field: 'type',
    required: false,
    type: 'string',
    custom: (value: string) => {
      const validTypes = ['practice', 'assessment', 'final'];
      return validTypes.includes(value.toLowerCase()) || 'Type must be practice, assessment, or final';
    },
  },
  {
    field: 'total_marks',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value >= 0 || 'Total marks must be 0 or greater';
    },
  },
]);

// Quiz update validation
export const validateQuizUpdate = validateRequest([
  {
    field: 'title',
    required: false,
    type: 'string',
    minLength: 2,
    maxLength: 200,
  },
  {
    field: 'description',
    required: false,
    type: 'string',
    maxLength: 1000,
  },
  {
    field: 'type',
    required: false,
    type: 'string',
    custom: (value: string) => {
      const validTypes = ['practice', 'assessment', 'final'];
      return validTypes.includes(value.toLowerCase()) || 'Type must be practice, assessment, or final';
    },
  },
  {
    field: 'total_marks',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value >= 0 || 'Total marks must be 0 or greater';
    },
  },
]);

// Quiz ID validation (for params)
export const validateQuizId = validateRequest([
  {
    field: 'quizId',
    required: true,
    type: 'string',
    minLength: 1,
    custom: (value: string) => {
      return /^[a-zA-Z0-9\-_]+$/.test(value) || 'Quiz ID must be alphanumeric';
    },
  },
]);
