import { validateRequest, commonValidations } from '../middlewares/validationMiddleware';

// Course creation validation
export const validateCourseCreation = validateRequest([
  {
    field: 'course_name',
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'category_id',
    required: true,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'course_description',
    required: false,
    type: 'string',
    maxLength: 1000,
  },
  {
    field: 'course_content',
    required: false,
    type: 'string',
    maxLength: 5000,
  },
  {
    field: 'difficulty',
    required: true,
    type: 'string',
    custom: (value: string) => {
      const validDifficulties = ['beginner', 'intermediate', 'advanced'];
      return validDifficulties.includes(value.toLowerCase()) || 'Difficulty must be beginner, intermediate, or advanced';
    },
  },
  {
    field: 'course_duration',
    required: true,
    type: 'number',
    custom: (value: number) => {
      return value > 0 || 'Course duration must be greater than 0';
    },
  },
  {
    field: 'course_image',
    required: true,
    type: 'string',
    minLength: 1,
    custom: (value: string) => {
      try {
        new URL(value);
        return true;
      } catch {
        return 'Course image must be a valid URL';
      }
    },
  },
  {
    field: 'language',
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 50,
  },
  {
    field: 'min_age',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value >= 0 || 'Minimum age must be 0 or greater';
    },
  },
  {
    field: 'max_age',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value >= 0 || 'Maximum age must be 0 or greater';
    },
  },
]);

// Course update validation
export const validateCourseUpdate = validateRequest([
  {
    field: 'course_name',
    required: false,
    type: 'string',
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'category_id',
    required: false,
    type: 'string',
    minLength: 1,
  },
  {
    field: 'course_description',
    required: false,
    type: 'string',
    maxLength: 1000,
  },
  {
    field: 'course_content',
    required: false,
    type: 'string',
    maxLength: 5000,
  },
  {
    field: 'difficulty',
    required: false,
    type: 'string',
    custom: (value: string) => {
      const validDifficulties = ['beginner', 'intermediate', 'advanced'];
      return validDifficulties.includes(value.toLowerCase()) || 'Difficulty must be beginner, intermediate, or advanced';
    },
  },
  {
    field: 'course_duration',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value > 0 || 'Course duration must be greater than 0';
    },
  },
  {
    field: 'course_image',
    required: false,
    type: 'string',
    minLength: 1,
    custom: (value: string) => {
      if (!value) return true; // Optional field
      try {
        new URL(value);
        return true;
      } catch {
        return 'Course image must be a valid URL';
      }
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
    field: 'min_age',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value >= 0 || 'Minimum age must be 0 or greater';
    },
  },
  {
    field: 'max_age',
    required: false,
    type: 'number',
    custom: (value: number) => {
      return value >= 0 || 'Maximum age must be 0 or greater';
    },
  },
]);

// Course ID validation (for params)
export const validateCourseId = validateRequest([
  {
    field: 'courseId',
    required: true,
    type: 'string',
    minLength: 1,
    custom: (value: string) => {
      return /^[a-zA-Z0-9\-_]+$/.test(value) || 'Course ID must be alphanumeric';
    },
  },
]);
