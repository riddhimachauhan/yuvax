
import { validateRequest } from '../middlewares/validationMiddleware';

// ✅ Create Pricing Validation
export const validateCreateCoursePricing = validateRequest([
  { field: 'country_id', required: true, type: 'string', minLength: 1 },
  { field: 'course_id', required: true, type: 'string', minLength: 1 },
  { field: 'category_id', required: true, type: 'string', minLength: 1 },

  // numeric fields with custom checks
  {
    field: 'base_price',
    required: true,
    custom: (v: any) =>
      typeof v === 'number' && v >= 0 ? true : 'base_price must be a number >= 0',
  },
  {
    field: 'discounted_price',
    required: false,
    custom: (v: any) =>
      v === undefined || (typeof v === 'number' && v >= 0)
        ? true
        : 'discounted_price must be a number >= 0',
  },
  {
    field: 'current_price',
    required: true,
    custom: (v: any) =>
      typeof v === 'number' && v >= 0 ? true : 'current_price must be a number >= 0',
  },
  { field: 'currency', required: true, type: 'string', minLength: 1, maxLength: 5 },
  {
    field: 'discount_percentage',
    required: false,
    custom: (v: any) =>
      v === undefined || (typeof v === 'number' && v >= 0 && v <= 100)
        ? true
        : 'discount_percentage must be a number between 0-100',
  },
  {
    field: 'tax_rate',
    required: false,
    custom: (v: any) =>
      v === undefined || (typeof v === 'number' && v >= 0 && v <= 100)
        ? true
        : 'tax_rate must be a number between 0-100',
  },
  {
    field: 'price_factor',
    required: false,
    custom: (v: any) =>
      v === undefined || (typeof v === 'number' && v >= 0)
        ? true
        : 'price_factor must be a number >= 0',
  },

  // date fields
  {
    field: 'effective_from',
    required: false,
    custom: (v: any) =>
      !v || !isNaN(Date.parse(v)) ? true : 'effective_from must be a valid date',
  },
  {
    field: 'effective_until',
    required: false,
    custom: (v: any) =>
      !v || !isNaN(Date.parse(v)) ? true : 'effective_until must be a valid date',
  },

  // boolean field
  {
    field: 'is_active',
    required: false,
    custom: (v: any) =>
      typeof v === 'boolean' ? true : 'is_active must be boolean',
  },
]);

// ✅ Update Pricing Validation
export const validateUpdateCoursePricing = validateRequest([
  // all optional, same custom checks
  {
    field: 'base_price',
    required: false,
    custom: (v: any) =>
      v === undefined || (typeof v === 'number' && v >= 0)
        ? true
        : 'base_price must be a number >= 0',
  },
  {
    field: 'discounted_price',
    required: false,
    custom: (v: any) =>
      v === undefined || (typeof v === 'number' && v >= 0)
        ? true
        : 'discounted_price must be a number >= 0',
  },
  {
    field: 'current_price',
    required: false,
    custom: (v: any) =>
      v === undefined || (typeof v === 'number' && v >= 0)
        ? true
        : 'current_price must be a number >= 0',
  },
  { field: 'currency', required: false, type: 'string', minLength: 1, maxLength: 5 },
  {
    field: 'discount_percentage',
    required: false,
    custom: (v: any) =>
      v === undefined || (typeof v === 'number' && v >= 0 && v <= 100)
        ? true
        : 'discount_percentage must be a number between 0-100',
  },
  {
    field: 'tax_rate',
    required: false,
    custom: (v: any) =>
      v === undefined || (typeof v === 'number' && v >= 0 && v <= 100)
        ? true
        : 'tax_rate must be a number between 0-100',
  },
  {
    field: 'price_factor',
    required: false,
    custom: (v: any) =>
      v === undefined || (typeof v === 'number' && v >= 0)
        ? true
        : 'price_factor must be a number >= 0',
  },
  {
    field: 'effective_from',
    required: false,
    custom: (v: any) =>
      !v || !isNaN(Date.parse(v)) ? true : 'effective_from must be a valid date',
  },
  {
    field: 'effective_until',
    required: false,
    custom: (v: any) =>
      !v || !isNaN(Date.parse(v)) ? true : 'effective_until must be a valid date',
  },
  {
    field: 'is_active',
    required: false,
    custom: (v: any) =>
      v === undefined || typeof v === 'boolean'
        ? true
        : 'is_active must be boolean',
  },
]);

// ✅ ID validation (params)
export const validateCoursePricingId = validateRequest([
  {
    field: 'pricingId',
    required: true,
    type: 'string',
    minLength: 1,
    in: 'params',
    custom: (v: string) => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const cuidRegex = /^c[a-z0-9]{24}$/i;
      return uuidRegex.test(v) || cuidRegex.test(v) || 'Pricing ID must be valid UUID or CUID';
    },
  },
]);

