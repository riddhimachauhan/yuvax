import { validateRequest, commonValidations } from '../middlewares/validationMiddleware';

// Category creation validation
export const validateCategoryCreation = validateRequest([
  {
    field: 'category_name',
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'category_description',
    required: true,
    type: 'string',
    minLength: 10,
    maxLength: 500,
  },
  {
    field: 'category_image',
    required: true,
    type: 'string',
    minLength: 1,
    custom: (value: string) => {
      // Basic URL validation
      try {
        new URL(value);
        return true;
      } catch {
        return 'Category image must be a valid URL';
      }
    },
  },
]);

// Category update validation
export const validateCategoryUpdate = validateRequest([
  {
    field: 'category_name',
    required: false,
    type: 'string',
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'category_description',
    required: false,
    type: 'string',
    minLength: 10,
    maxLength: 500,
  },
  {
    field: 'category_image',
    required: false,
    type: 'string',
    minLength: 1,
    custom: (value: string) => {
      if (!value) return true; // Optional field
      try {
        new URL(value);
        return true;
      } catch {
        return 'Category image must be a valid URL';
      }
    },
  },
]);

// Category ID validation (for params)
export const validateCategoryId = validateRequest([
  {
    field: 'id',
    required: true,
    type: 'string',
    minLength: 1,
    in:'params',
    custom: (value: string) => {
      // Check if it's a valid UUID or alphanumeric ID
     const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const cuidRegex = /^c[a-z0-9]{24}$/i;
      return uuidRegex.test(value) || cuidRegex.test(value) || 'Category ID must be a valid UUID or CUID';
    },
  },
]);
