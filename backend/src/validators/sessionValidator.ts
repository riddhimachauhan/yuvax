import { validateRequest } from '../middlewares/validationMiddleware';

export const validateGetSessionsByTeacher = validateRequest([
  {
    field: 'teacherId',
    required: true,
    type: 'string',
    in: 'params',
    minLength: 1,
    
  },
  {
    field: 'status',
    required: false,
    in:'query',
    type: 'string',
  },
  {
    field: 'dateFrom',
    required: false,
    in:'query',
    type: 'string',
  },
  {
    field: 'dateTo',
    required: false,
    in:'query',
    type: 'string',
  },
  {
    field: 'page',
    required: false,
    in:'query',
    type: 'number',
    custom: (value: number) => value >= 0 || 'Page must be non-negative',
  },
  {
    field: 'limit',
    required: false,
    type: 'number',
    in:'query',
    custom: (value: number) => value > 0 || 'Limit must be greater than 0',
  },
]);
