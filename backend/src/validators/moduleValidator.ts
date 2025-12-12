import { validateRequest } from '../middlewares/validationMiddleware';

// Module creation validation
export const validateModuleCreation = validateRequest([
  {
    field: 'course_id',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'module_title',
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 200,
  },
  {
    field: 'duration',
    required: true,
    type: 'number',
    custom: (value: number) => {
      return value >= 0 || 'Duration must be 0 or greater';
    },
  },
  {
    field: 'module_description',
    required: false,
    type: 'string',
    maxLength: 1000,
  },
  {
    field: 'student_note_link',
    required: false,
    type: 'string',
    custom: (value: string) => {
      if (!value) return true; // Optional field
      try {
        new URL(value);
        return true;
      } catch {
        return 'Student note link must be a valid URL';
      }
    },
  },
  {
    field: 'teacher_note_link',
    required: false,
    type: 'string',
    custom: (value: string) => {
      if (!value) return true; // Optional field
      try {
        new URL(value);
        return true;
      } catch {
        return 'Teacher note link must be a valid URL';
      }
    },
  },
  {
    field: 'PPT_link',
    required: false,
    type: 'string',
    custom: (value: string) => {
      if (!value) return true; // Optional field
      try {
        new URL(value);
        return true;
      } catch {
        return 'PPT link must be a valid URL';
      }
    },
  },
]);

// Module update validation
export const validateModuleUpdate = validateRequest([
  {
    field: 'module_title',
    required: false,
    type: 'string',
    minLength: 2,
    maxLength: 200,
  },
  {
    field: 'duration',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value >= 0 || 'Duration must be 0 or greater';
    },
  },
  {
    field: 'module_description',
    required: false,
    type: 'string',
    maxLength: 1000,
  },
  {
    field: 'student_note_link',
    required: false,
    type: 'string',
    custom: (value: string) => {
      if (!value) return true; // Optional field
      try {
        new URL(value);
        return true;
      } catch {
        return 'Student note link must be a valid URL';
      }
    },
  },
  {
    field: 'teacher_note_link',
    required: false,
    type: 'string',
    custom: (value: string) => {
      if (!value) return true; // Optional field
      try {
        new URL(value);
        return true;
      } catch {
        return 'Teacher note link must be a valid URL';
      }
    },
  },
  {
    field: 'PPT_link',
    required: false,
    type: 'string',
    custom: (value: string) => {
      if (!value) return true; // Optional field
      try {
        new URL(value);
        return true;
      } catch {
        return 'PPT link must be a valid URL';
      }
    },
  },
]);

// Module ID validation (for params)
export const validateModuleId = validateRequest([
  {
    field: 'module_id',
    required: true,
    type: 'string',
    minLength: 1,
    custom: (value: string) => {
      return /^[a-zA-Z0-9\-_]+$/.test(value) || 'Module ID must be alphanumeric';
    },
  },
]);
