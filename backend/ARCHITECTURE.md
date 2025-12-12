# Yuvax Backend - Clean Architecture

This document describes the clean architecture implementation for the Yuvax Backend API.

## Project Structure

```
src/
├── controllers/           # HTTP request/response handling
│   ├── authController.ts
│   ├── categoryController.ts
│   └── userController.ts
├── services/             # Business logic layer
│   ├── authService.ts
│   ├── categoryService.ts
│   └── userService.ts
├── repositories/         # Data access layer
│   ├── authRepository.ts
│   ├── categoryRepository.ts
│   └── userRepository.ts
├── dto/                  # Data Transfer Objects
│   ├── request/
│   │   ├── categoryRequest.ts
│   │   └── userRequest.ts
│   └── response/
│       ├── categoryResponse.ts
│       └── userResponse.ts
├── validators/           # Input validation schemas
│   ├── categoryValidator.ts
│   └── userValidator.ts
├── middlewares/          # Express middlewares
│   ├── authMiddleware.ts
│   ├── validationMiddleware.ts
│   └── errorHandler.ts
├── utils/               # Utility functions
│   ├── responseBuilder.js
│   ├── logger.js
│   └── constants.ts
├── config/              # Configuration files
│   ├── database.ts
│   └── env.ts
├── routes/              # Express route definitions
│   ├── authRoutes.ts
│   ├── categoryRoutes.ts
│   ├── userRoutes.ts
│   └── index.ts
└── lib/
    └── db.js            # Prisma client instance
```

## Architecture Layers

### 1. Controllers Layer
- **Purpose**: Handle HTTP requests and responses
- **Responsibilities**:
  - Parse request data
  - Call appropriate service methods
  - Format responses
  - Handle HTTP status codes

### 2. Services Layer
- **Purpose**: Contains business logic
- **Responsibilities**:
  - Implement business rules
  - Coordinate between repositories
  - Handle data transformation
  - Manage transactions

### 3. Repositories Layer
- **Purpose**: Data access abstraction
- **Responsibilities**:
  - Database operations
  - Data persistence
  - Query optimization
  - Data mapping

### 4. Validators Layer
- **Purpose**: Input validation
- **Responsibilities**:
  - Validate request data
  - Sanitize inputs
  - Provide validation rules
  - Error handling for invalid data

## Key Features

### Error Handling
- Centralized error handling with `errorHandler` middleware
- Custom error classes with proper HTTP status codes
- Development vs production error responses

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Teacher, Student)
- Protected route middleware

### Validation
- Request validation middleware
- Reusable validation rules
- Type-safe validation schemas

### Caching
- Redis integration for caching
- Cache invalidation strategies
- Performance optimization

### Security
- Helmet for security headers
- CORS configuration
- Input sanitization
- Password hashing with bcrypt

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `POST /api/auth/refresh-token` - Token refresh
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/change-password` - Change password

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/role/:role` - Get users by role (Admin only)
- `POST /api/users` - Create user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/:id/stats` - Get category statistics
- `POST /api/categories` - Create category (Admin/Teacher)
- `PUT /api/categories/:id` - Update category (Admin/Teacher)
- `DELETE /api/categories/:id` - Delete category (Admin only)

## Environment Variables

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=your-jwt-secret
REDIS_URL=redis://localhost:6379
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Best Practices

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Dependency Injection**: Services depend on abstractions, not concretions
3. **Error Handling**: Consistent error responses across the API
4. **Validation**: Input validation at the controller level
5. **Security**: Authentication and authorization on protected routes
6. **Performance**: Caching and database optimization
7. **Testing**: Unit tests for services and integration tests for controllers

## Future Improvements

1. Add comprehensive unit tests
2. Implement API documentation with Swagger
3. Add rate limiting
4. Implement request logging
5. Add database connection pooling
6. Implement graceful shutdown
7. Add health check endpoints
8. Implement API versioning
