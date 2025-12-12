import { validateRequest, commonValidations } from '../middlewares/validationMiddleware';

// User registration validation
export const validateUserRegistration = validateRequest([
  commonValidations.email('email'),
  commonValidations.password('password'),
  commonValidations.requiredString('full_name', 2, 50),
  commonValidations.phone('phone'),
  {
    field: 'role',
    required: true,
    type: 'string',
    custom: (value: string) => {
      const validRoles = ['SuperAdmin', 'Teacher', 'Student','Admin','Sales'];
      return validRoles.includes(value) || 'Role must be admin, teacher, or student';
    },
  },
  {
    field: 'dateOfBirth',
    required: false,
    type: 'string',
    custom: (value: string) => {
      if (!value) return true; // Optional field
      const date = new Date(value);
      return !isNaN(date.getTime()) || 'Date of birth must be a valid date';
    },
  },
]);

// User login validation
export const validateUserLogin = validateRequest([
  {
    field: 'identifier',
    required: true,
    type: 'string',
    minLength: 1,
  },
  commonValidations.password('password'),
]);

// User update validation
export const validateUserUpdate = validateRequest([
  {
    field: 'firstName',
    required: false,
    type: 'string',
    minLength: 2,
    maxLength: 50,
  },
  {
    field: 'lastName',
    required: false,
    type: 'string',
    minLength: 2,
    maxLength: 50,
  },
  {
    field: 'email',
    required: false,
    type: 'email',
  },
  {
    field: 'phone',
    required: false,
    type: 'phone',
  },
  {
    field: 'role',
    required: false,
    type: 'string',
    custom: (value: string) => {
      const validRoles = ['SuperAdmin', 'Teacher', 'Student','Admin','Sales'];
      return validRoles.includes(value) || 'Role must be admin, teacher, or student';
    },
  },
]);

// Password reset validation
export const validatePasswordReset = validateRequest([
  commonValidations.email('email'),
]);

// New password validation
export const validateNewPassword = validateRequest([
  commonValidations.password('password'),
  {
    field: 'token',
    required: true,
    type: 'string',
    minLength: 1,
  },
]);
