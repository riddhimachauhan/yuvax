import { validateRequest } from '../middlewares/validationMiddleware';

export const validateChapterCreation = validateRequest([
  {
    field: 'module_id',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'chapter_name',
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'description',
    required: false,
    type: 'string',
    minLength: 5,
    maxLength: 500,
  },
  {
    field: 'capacity',
    required: false,
    type: 'number',
    custom: (value: number) =>
      value >= 1 || 'Capacity must be greater than or equal to 1',
  },
]);

export const validateChapterUpdate = validateRequest([
  {
    field: 'module_id',
    required: false,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'chapter_name',
    required: false,
    type: 'string',
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'description',
    required: false,
    type: 'string',
    minLength: 5,
    maxLength: 500,
  },
  {
    field: 'capacity',
    required: false,
    type: 'number',
    custom: (value: number) =>
      value >= 1 || 'Capacity must be greater than or equal to 1',
  },
]);

export const validateChapterId = validateRequest([
  {
    field: 'chapter_id',
    required: true,
    type: 'string',
    minLength: 1,
    in: 'params',
    custom: (value: string) => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value) || 'Chapter ID must be a valid UUID';
    },
  },
]);
