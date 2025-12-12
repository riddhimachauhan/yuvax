import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../utils/constants';
import { CustomError } from './errorHandler';

export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'email' | 'phone' | 'array' | 'object';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  in?: 'body' | 'params' | 'query';
  custom?: (value: any) => boolean | string;
}

export const validateRequest = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    

    for (const rule of rules) {
      const value = rule.in === 'params'
        ? req.params[rule.field]
        : rule.in === 'query'
        ? req.query[rule.field]
        : req.body[rule.field];
      // Check required fields
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push(`${rule.field} is required`);
        continue;
      }

      // Skip validation if field is not provided and not required
      if (!rule.required && (value === undefined || value === null)) {
        continue;
      }

      // Type validation
      if (rule.type) {
        switch (rule.type) {
          case 'string':
            if (typeof value !== 'string') {
              errors.push(`${rule.field} must be a string`);
            }
            break;
          case 'number':
            if (typeof value !== 'number' && isNaN(Number(value))) {
              errors.push(`${rule.field} must be a number`);
            }
            break;
          case 'email':
            if (typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              errors.push(`${rule.field} must be a valid email`);
            }
            break;
          case 'phone':
            if (typeof value !== 'string' || !/^[+]?[\d\s\-\(\)]+$/.test(value)) {
              errors.push(`${rule.field} must be a valid phone number`);
            }
            break;
          case 'array':
            if (!Array.isArray(value)) {
              errors.push(`${rule.field} must be an array`);
            }
            break;
          case 'object':
            if (typeof value !== 'object' || Array.isArray(value)) {
              errors.push(`${rule.field} must be an object`);
            }
            break;
        }
      }

      // Length validation for strings
      if (rule.type === 'string' && typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          errors.push(`${rule.field} must be at least ${rule.minLength} characters long`);
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          errors.push(`${rule.field} must be no more than ${rule.maxLength} characters long`);
        }
      }

      // Pattern validation
      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        errors.push(`${rule.field} format is invalid`);
      }

      // Custom validation
      if (rule.custom) {
        const customResult = rule.custom(value);
        if (customResult !== true) {
          errors.push(typeof customResult === 'string' ? customResult : `${rule.field} is invalid`);
        }
      }
    }

    if (errors.length > 0) {
      throw new CustomError(`Validation failed: ${errors.join(', ')}`, HTTP_STATUS.BAD_REQUEST);
    }

    next();
  };
};

// Common validation rules
export const commonValidations = {
  email: (field: string = 'email'): ValidationRule => ({
    field,
    required: true,
    type: 'email',
  }),
  
  password: (field: string = 'password'): ValidationRule => ({
    field,
    required: true,
    type: 'string',
    minLength: 8,
  }),
  
  phone: (field: string = 'phone'): ValidationRule => ({
    field,
    required: true,
    type: 'phone',
  }),
  
  requiredString: (field: string, minLength?: number, maxLength?: number): ValidationRule => ({
    field,
    required: true,
    type: 'string',
    minLength,
    maxLength,
  }),
  
  optionalString: (field: string, minLength?: number, maxLength?: number): ValidationRule => ({
    field,
    required: false,
    type: 'string',
    minLength,
    maxLength,
  }),
};
