import { validateRequest } from '../middlewares/validationMiddleware';

// Zone creation validation (body)
export const validateZoneCreation = validateRequest([
  {
    field: 'name',
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'gmtOffset',
    required: true,
    type: 'string',
    custom: (value: string) => /^UTC[+-]\d{2}:\d{2}$/.test(value) || 'Invalid GMT offset',
  },
  {
    field: 'primeTimeStart',
    required: true,
    type: 'string',
    custom: (value: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value) || 'Invalid time HH:MM',
  },
  {
    field: 'primeTimeEnd',
    required: true,
    type: 'string',
    custom: (value: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value) || 'Invalid time HH:MM',
  },
]);

// Zone update validation (body)
export const validateZoneUpdate = validateRequest([
  {
    field: 'name',
    required: false,
    type: 'string',
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'gmtOffset',
    required: false,
    type: 'string',
    custom: (value: string) => /^UTC[+-]\d{2}:\d{2}$/.test(value) || 'Invalid GMT offset',
  },
  {
    field: 'primeTimeStart',
    required: false,
    type: 'string',
    custom: (value: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value) || 'Invalid time HH:MM',
  },
  {
    field: 'primeTimeEnd',
    required: false,
    type: 'string',
    custom: (value: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value) || 'Invalid time HH:MM',
  },
]);

// Zone ID validation (params)
export const validateZoneIdParam = (req: any, res: any, next: any) => {
  const { zoneId } = req.params;
  if (!zoneId || !/^[a-zA-Z0-9\-_]+$/.test(zoneId)) {
    return res.status(400).json({ success: false, message: 'Zone ID is invalid' });
  }
  next();
};
