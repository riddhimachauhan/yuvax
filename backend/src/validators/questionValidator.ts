import { validateRequest } from '../middlewares/validationMiddleware';

// Question creation validation
export const validateQuestionCreation = validateRequest([
  {
    field: 'quiz_id',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'text',
    required: true,
    type: 'string',
    minLength: 10,
    maxLength: 1000,
  },
  {
    field: 'marks',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value > 0 || 'Marks must be greater than 0';
    },
  },
  {
    field: 'option1',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 500,
  },
  {
    field: 'option2',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 500,
  },
  {
    field: 'option3',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 500,
  },
  {
    field: 'option4',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 500,
  },
  {
    field: 'correct_answer',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 500,
  },
]);

// Question update validation
export const validateQuestionUpdate = validateRequest([
  {
    field: 'text',
    required: false,
    type: 'string',
    minLength: 10,
    maxLength: 1000,
  },
  {
    field: 'marks',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value > 0 || 'Marks must be greater than 0';
    },
  },
  {
    field: 'option1',
    required: false,
    type: 'string',
    minLength: 1,
    maxLength: 500,
  },
  {
    field: 'option2',
    required: false,
    type: 'string',
    minLength: 1,
    maxLength: 500,
  },
  {
    field: 'option3',
    required: false,
    type: 'string',
    minLength: 1,
    maxLength: 500,
  },
  {
    field: 'option4',
    required: false,
    type: 'string',
    minLength: 1,
    maxLength: 500,
  },
  {
    field: 'correct_answer',
    required: false,
    type: 'string',
    minLength: 1,
    maxLength: 500,
  },
]);

// Question ID validation (for params)
export const validateQuestionId = validateRequest([
  {
    field: 'questionId',
    required: true,
    type: 'string',
    minLength: 1,
    custom: (value: string) => {
      return /^[a-zA-Z0-9\-_]+$/.test(value) || 'Question ID must be alphanumeric';
    },
  },
]);
