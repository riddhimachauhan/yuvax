import { validateRequest } from '../middlewares/validationMiddleware';

// Assignment creation validation
export const validateAssignmentCreation = validateRequest([
  {
    field: 'course_id',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'module_id',
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
    required: true,
    type: 'string',
    custom: (value: string) => {
      const validTypes = ['QUIZ', 'PUZZLE', 'CODE_EXERCISE'];
      return validTypes.includes(value) || 'Type must be QUIZ, PUZZLE, or CODE_EXERCISE';
    },
  },
  {
    field: 'language',
    required: false,
    type: 'string',
    minLength: 2,
    maxLength: 50,
  },
  {
    field: 'starter_code',
    required: false,
    type: 'string',
    maxLength: 10000,
  },
  {
    field: 'metadata',
    required: false,
    type: 'object',
  },
  {
    field: 'reward_points',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value >= 0 || 'Reward points must be 0 or greater';
    },
  },
  {
    field: 'created_by',
    required: true,
    type: 'string',
    minLength: 1,
  },
]);

// Assignment update validation
export const validateAssignmentUpdate = validateRequest([
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
      const validTypes = ['QUIZ', 'PUZZLE', 'CODE_EXERCISE'];
      return validTypes.includes(value) || 'Type must be QUIZ, PUZZLE, or CODE_EXERCISE';
    },
  },
  {
    field: 'language',
    required: false,
    type: 'string',
    minLength: 2,
    maxLength: 50,
  },
  {
    field: 'starter_code',
    required: false,
    type: 'string',
    maxLength: 10000,
  },
  {
    field: 'metadata',
    required: false,
    type: 'object',
  },
  {
    field: 'reward_points',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value >= 0 || 'Reward points must be 0 or greater';
    },
  },
]);

// Assignment ID validation (for params)
export const validateAssignmentId = validateRequest([
  {
    field: 'assignment_id',
    required: true,
    type: 'string',
    minLength: 1,
    custom: (value: string) => {
      return /^[a-zA-Z0-9\-_]+$/.test(value) || 'Assignment ID must be alphanumeric';
    },
  },
]);
