import { validateRequest } from '../middlewares/validationMiddleware';

// Feedback creation validation
export const validateFeedbackCreation = validateRequest([
  {
    field: 'sessionId',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'giverId',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'takerId',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'rating',
    required: true,
    type: 'number',
    custom: (value: number) => {
      return value >= 1 && value <= 5 || 'Rating must be between 1 and 5';
    },
  },
  {
    field: 'comments',
    required: false,
    type: 'string',
    maxLength: 1000,
  },
  {
    field: 'giverRole',
    required: true,
    type: 'string',
    custom: (value: string) => {
      const validRoles = ['STUDENT', 'TEACHER'];
      return validRoles.includes(value) || 'Giver role must be STUDENT or TEACHER';
    },
  },
  {
    field: 'takerRole',
    required: true,
    type: 'string',
    custom: (value: string) => {
      const validRoles = ['STUDENT', 'TEACHER'];
      return validRoles.includes(value) || 'Taker role must be STUDENT or TEACHER';
    },
  },
]);

// Feedback update validation
export const validateFeedbackUpdate = validateRequest([
  {
    field: 'rating',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value >= 1 && value <= 5 || 'Rating must be between 1 and 5';
    },
  },
  {
    field: 'comments',
    required: false,
    type: 'string',
    maxLength: 1000,
  },
]);

// Feedback ID validation (for params)
export const validateFeedbackId = validateRequest([
  {
    field: 'feedbackId',
    required: true,
    type: 'string',
    minLength: 1,
    custom: (value: string) => {
      return /^[a-zA-Z0-9\-_]+$/.test(value) || 'Feedback ID must be alphanumeric';
    },
  },
]);
