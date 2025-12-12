// Application constants
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const USER_ROLES = {
  Admin: 'Admin',
  Teacher: 'Teacher',
  Student: 'Student',
  SuperAdmin:'SuperAdmin',
  Sales: 'Sales',
} as const;

export const CACHE_KEYS = {
  CATEGORIES: 'categories',
  CATEGORY_BY_ID_PREFIX: 'category:',
  USER_BY_ID_PREFIX: 'user:',
} as const;

export const CACHE_EXPIRATION = {
  ONE_HOUR: 3600,
  THIRTY_MINUTES: 1800,
  ONE_DAY: 86400,
} as const;

export const JWT_CONFIG = {
  EXPIRES_IN: '1h',
  REFRESH_EXPIRES_IN: '7d',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_REGEX: /^[+]?[\d\s\-\(\)]+$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;


export const RATE_LIMIT = {
  POINTS: 300,       
  DURATION: 60,     
};
