import { validateRequest } from '../middlewares/validationMiddleware';

// Helper to check array of strings
const isStringArray = (v: any) => Array.isArray(v) && v.every(x => typeof x === 'string');

// Create validator
export const validateCreateRegionalConfig = validateRequest([
  { field: 'country_id', required: true, type: 'string', minLength: 1 },
  { field: 'default_timezone', required: true, type: 'string', minLength: 1 },
  { field: 'business_hours_start', required: true, type: 'string', minLength: 1 },
  { field: 'business_hours_end', required: true, type: 'string', minLength: 1 },
  {
    field: 'weekend_days',
    required: true,
    custom: (v: any) => isStringArray(v) || 'weekend_days must be an array of strings',
  },
  { field: 'default_currency', required: true, type: 'string', minLength: 1, maxLength: 5 },

  // optional numeric checks
  {
    field: 'minimum_session_price',
    required: false,
    custom: (v: any) =>
      v === undefined || v === null || (typeof v === 'number' && v >= 0) ? true : 'minimum_session_price must be number >= 0 or null',
  },
  {
    field: 'maximum_session_price',
    required: false,
    custom: (v: any) =>
      v === undefined || v === null || (typeof v === 'number' && v >= 0) ? true : 'maximum_session_price must be number >= 0 or null',
  },

  {
    field: 'payment_methods',
    required: false,
    custom: (v: any) => (v === undefined || isStringArray(v)) || 'payment_methods must be array of strings',
  },

  { field: 'payment_currency', required: false, type: 'string', minLength: 1, maxLength: 5 },

  {
    field: 'tax_inclusive',
    required: false,
    custom: (v: any) => v === undefined || typeof v === 'boolean' ? true : 'tax_inclusive must be boolean',
  },
]);

// Update validator (all optional)
export const validateUpdateRegionalConfig = validateRequest([
  { field: 'country_id', required: false, type: 'string', minLength: 1 },
  { field: 'default_timezone', required: false, type: 'string', minLength: 1 },
  { field: 'business_hours_start', required: false, type: 'string', minLength: 1 },
  { field: 'business_hours_end', required: false, type: 'string', minLength: 1 },
  {
    field: 'weekend_days',
    required: false,
    custom: (v: any) => v === undefined || isStringArray(v) || 'weekend_days must be an array of strings',
  },
  { field: 'default_currency', required: false, type: 'string', minLength: 1, maxLength: 5 },
  {
    field: 'minimum_session_price',
    required: false,
    custom: (v: any) => v === undefined || v === null || (typeof v === 'number' && v >= 0) || 'minimum_session_price must be number >= 0 or null',
  },
  {
    field: 'maximum_session_price',
    required: false,
    custom: (v: any) => v === undefined || v === null || (typeof v === 'number' && v >= 0) || 'maximum_session_price must be number >= 0 or null',
  },
  {
    field: 'payment_methods',
    required: false,
    custom: (v: any) => v === undefined || isStringArray(v) || 'payment_methods must be array of strings',
  },
  { field: 'payment_currency', required: false, type: 'string', minLength: 1, maxLength: 5 },
  {
    field: 'tax_inclusive',
    required: false,
    custom: (v: any) => v === undefined || typeof v === 'boolean' || 'tax_inclusive must be boolean',
  },
]);

// ID validation (params)
export const validateRegionalConfigId = validateRequest([
  {
    field: 'configId',
    required: true,
    type: 'string',
    minLength: 1,
    in: 'params',
    custom: (v: string) => {
      const cuidRegex = /^c[a-z0-9]{24}$/i;
      // allow either cuid or uuid
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(v) || cuidRegex.test(v) || 'configId must be valid UUID or CUID';
    },
  },
]);

// Country id param validation
export const validateCountryIdParam = validateRequest([
  {
    field: 'countryId',
    required: true,
    type: 'string',
    minLength: 1,
    in: 'params',
    custom: (v: string) => {
      const cuidRegex = /^c[a-z0-9]{24}$/i;
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(v) || cuidRegex.test(v) || 'countryId must be valid UUID or CUID';
    },
  },
]);
