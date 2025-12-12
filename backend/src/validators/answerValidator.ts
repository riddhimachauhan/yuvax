import { validateRequest } from '../middlewares/validationMiddleware';

// Answer creation validation
export const validateAnswerCreation = validateRequest([
  {
    field: 'attempt_id',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'question_id',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'selected_option',
    required: true,
    type: 'number',
    custom: (value: number) => {
      if (![1, 2, 3, 4].includes(value)) {
        return 'Selected option must be between 1 and 4';
      }
      return true;
    },
  },
]);

// Answer update validation
export const validateAnswerUpdate = validateRequest([
  {
    field: 'selected_option',
    required: true,
    type: 'number',
    custom: (value: number) => {
      if (![1, 2, 3, 4].includes(value)) {
        return 'Selected option must be between 1 and 4';
      }
      return true;
    },
  },
]);

// Answer ID validation (for params)
export const validateAnswerId = validateRequest([
  {
    field: 'id',
    required: true,
    type: 'string',
    in: 'params',
    minLength: 1,
    custom: (value: string) => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value) || 'Answer ID must be a valid UUID';
    },
  },
]);
