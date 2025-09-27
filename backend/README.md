# Backend API Documentation

This is the backend API server for the Rohtak Guided Learning Tracker platform. Built with Node.js, Express.js, and PostgreSQL, it provides a comprehensive RESTful API for educational content management, user authentication, and analytics.

## Technology Stack

### Core Technologies
- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: PostgreSQL with Prisma ORM v6.12.0
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcrypt for password hashing
- **Rate Limiting**: express-rate-limit
- **Validation**: express-validator

### Key Dependencies
- `@prisma/client`: Database ORM
- `jsonwebtoken`: JWT token handling
- `bcrypt`: Password hashing
- `axios`: HTTP client for external APIs
- `express-rate-limit`: API rate limiting
- `express-validator`: Request validation
- `helmet`: Security headers
- `compression`: Response compression
- `nodemailer`: Email service for user verification

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │◄──►│   Express.js    │◄──►│   PostgreSQL    │
│   (Frontend)    │    │   Backend API   │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │  External APIs  │
                       │  (YouTube API)  │
                       └─────────────────┘
```

## Directory Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── controllers/           # Request handlers
│   ├── middlewares/          # Custom middleware
│   ├── routes/               # API route definitions
│   ├── services/             # Business logic services
│   └── utils/                # Utility functions
├── prisma/                   # Database schema and migrations
├── generated/                # Prisma client generated files
└── index.js                  # Application entry point
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

3. **Database Setup**
   ```bash
   npx prisma migrate dev    # Run database migrations
   npx prisma generate       # Generate Prisma client
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000` by default.

## 🔧 Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"

# Server Configuration
PORT=5000
NODE_ENV="development"

# CORS Configuration
CORS_ORIGIN="frontend-url"

# Youtube Data API key
YOUTUBE_API_KEY="your-youtube-api-key"

# Email Configuration (for user verification and notifications)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

## Core Modules

### 1. Application Entry Point (`index.js`)

The main entry point that:
- Loads environment variables
- Initializes the Express app
- Starts the server on the configured port

```javascript
require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```

### 2. Express App Configuration (`src/app.js`)

Configures the Express application with:
- **Security Middleware**: Helmet, CORS with credentials
- **Body Parsing**: JSON with 5MB limit
- **Route Registration**: Modular route organization
- **Error Handling**: Centralized error handling middleware
- **Health Check**: Basic health monitoring endpoint

#### Route Structure
```javascript
app.use('/api/admin', adminRoutes);        // Admin panel routes
app.use('/api/auth', authRoutes);          // Authentication routes
app.use('/api/user', userRoutes);          // User profile routes
app.use('/api/videos', videoRoutes);       // Video management routes
app.use('/api/courses', courseRoutes);     // Course management routes
app.use('/api/metadata', metadataRoutes);  // Metadata routes
app.use('/api/analytics', analyticsRoutes); // Analytics routes
app.use('/api/quizzes', quizRoutes);       // Quiz routes
```

## Routing Architecture

### Route Organization

The routing system follows a modular approach with clear separation of concerns:

#### 1. Admin Routes (`/api/admin/*`)
- **User Management**: Admin user CRUD operations
- **Student Management**: Student enrollment and tracking
- **Course Management**: Course creation and assignment
- **Quiz Management**: Quiz creation and management
- **Analytics**: Admin-level analytics and reporting
- **Metadata**: System metadata management

#### 2. Public Routes (`/api/auth/*`)
- **Authentication**: Login, signup, signup options
- **Rate Limited**: Login (5/10min), Signup (10/hour)

#### 3. User Routes (`/api/user/*`)
- **Profile Management**: User profile with activity summary
- **Recent Activity**: Recent enrollments, quizzes, study sessions

#### 4. Video Routes (`/api/videos/*`)
- **Course Videos**: Get videos for a specific course
- **Video Details**: Individual video information
- **Progress Tracking**: Video watch progress updates
- **Security**: Video security with anti-gaming measures

#### 5. Course Routes (`/api/courses/*`)
- **Course Listing**: Paginated course list with filters
- **Course Details**: Detailed course information with progress

#### 6. Analytics Routes (`/api/analytics/*`)
- **Student Analytics**: Comprehensive student performance metrics
- **Activity Tracking**: Study patterns and trends
- **Event Logging**: Real-time activity event logging

#### 7. Quiz Routes (`/api/quizzes/*`)
- **Quiz Management**: Quiz listing and attempts
- **Video-based Quizzes**: Quizzes tied to video completion


## Controllers

### Authentication Controller (`authController.js`)
Handles user authentication and registration:

- **Signup**: User registration with role assignment and organization validation
- **Login**: JWT-based authentication with user context
- **Signup Options**: Provides organizational hierarchy for registration
- **Email Verification**: User account verification through email tokens
- **Forgot Password**: Password reset request with email notification
- **Reset Password**: Password reset with secure token validation

### User Controller (`userController.js`)
Manages user profile operations:

- **Profile Retrieval**: User profile with activity summary
- **Profile Updates**: Basic profile modification
- **Change Password**: Secure password change with old password verification

### Video Controller (`videoController.js`)
Comprehensive video management with anti-gaming features:

- **Course Videos**: Paginated video listing with progress
- **Video Details**: Individual video information
- **Progress Updates**: Secure progress tracking with validation
- **Anti-Gaming**: Speed validation, skip detection, session management

### Course Controller (`courseController.js`)
Course management and progress tracking:

- **Course Listing**: Advanced filtering and pagination
- **Course Details**: Comprehensive course information with progress metrics
- **Progress Calculation**: Weighted progress (70% video, 30% quiz)

### Quiz Controller (`quizController.js`)
Quiz system management:

- **Quiz Listing**: Filtered quiz access
- **Quiz Attempts**: Quiz completion and scoring
- **Video Integration**: Quiz unlocking based on video completion

### Admin Controllers
Specialized controllers for administrative functions:

- **User Management**: CRUD operations for admin users with email notifications
- **Student Management**: Student tracking
- **Course Management**: Course creation and assignment
- **Quiz Management**: Quiz creation and administration

## Middleware Stack

### Authentication Middleware (`requireAuth.js`)
- **JWT Verification**: Validates Bearer tokens
- **Token Extraction**: Extracts user context from JWT payload
- **Error Handling**: Comprehensive token validation errors

### Authorization Middleware (`requireRole.js`)
- **Role-based Access**: Enforces role-based permissions
- **Flexible Configuration**: Supports multiple allowed roles per route
- **Hierarchical Access**: Role hierarchy enforcement

### Security Middleware

#### Rate Limiting (`rateLimiters.js`)
- **Login Protection**: 5 attempts per 10 minutes
- **Signup Protection**: 10 attempts per hour
- **Progress Updates**: 30 updates per minute per user

#### Video Security (`videoSecurity.js`)
- **Progress Validation**: Data integrity checks
- **Session Management**: Multi-device detection
- **Anti-Gaming**: Speed and skip detection
- **Security Headers**: Content security policies

#### Production Middleware (`productionMiddleware.js`)
- **Helmet Configuration**: Comprehensive security headers
- **CSP Policies**: Content Security Policy for production
- **Compression**: Response compression for performance

### Validation Middleware (`authValidation.js`)
- **Input Validation**: Express-validator integration
- **Signup Validation**: Name, email, password requirements
- **Login Validation**: Email and password validation

## Services Layer

### Analytics Service Architecture

The analytics system uses a modular service architecture:

```
AnalyticsService (Main Interface)
├── CoreAnalyticsService (Basic metrics)
├── CourseAnalyticsService (Course-specific analytics)
├── ActivityAnalyticsService (Activity patterns)
└── QuizAnalyticsService (Quiz performance)
```

#### Core Analytics Service
- **Student Summary**: Overall performance metrics
- **Course Counts**: Enrolled vs completed courses
- **Streak Calculation**: Study streak tracking

#### Course Analytics Service
- **Course Progress**: Detailed progress tracking
- **Completion Statistics**: Course completion metrics
- **Video Progress**: Individual video tracking
- **Quiz Analytics**: Course-specific quiz performance

#### Activity Analytics Service
- **Activity Trends**: Time-based activity patterns
- **Study Patterns**: Study time analysis
- **Peak Hours**: Optimal study time identification
- **Calendar Integration**: Activity calendar views

#### Quiz Analytics Service
- **Quiz Performance**: Comprehensive quiz metrics
- **Detailed Analytics**: Question-level analysis
- **Course Integration**: Course-specific quiz data

### YouTube Service (`youtubeService.js`)
External API integration for video management:

- **Video Metadata**: YouTube video information retrieval
- **Playlist Management**: Playlist parsing and video extraction
- **Duration Parsing**: ISO 8601 duration format handling
- **Thumbnail Generation**: Video thumbnail URL generation

### Event Logger Service (`eventLoggerService.js`)
Real-time activity tracking:

- **Progress Events**: Video watch progress logging
- **Session Tracking**: User session management
- **Device Detection**: Multi-device session handling

### Video Helper Service (`videoHelper.js`)
- **VideoHelper**: Video processing and validation utilities

### Email Service (`email.js`)
Email notification system for user management:

- **Verification Emails**: User account verification with secure tokens
- **Password Reset Emails**: Password reset notifications with time-limited tokens
- **Welcome Emails**: New user notifications for admin-created accounts
- **SMTP Configuration**: Configurable email service integration

## Database Integration

### Prisma ORM Configuration

The application uses Prisma as the ORM with PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}
```

### Database Schema

#### Core Models

**User Model**
- Hierarchical role system (SUPERADMIN, ADMIN, INSTRUCTOR, STUDENT)
- Organization unit association
- Grade assignment for students
- Comprehensive user tracking
- Email verification system with verification tokens
- Password reset functionality with time-limited tokens

**Organization Unit Model**
- Hierarchical structure (STATE → DISTRICT → BLOCK → SCHOOL)
- Self-referencing parent-child relationships
- Type-based organization management

**Course Model**
- Rich metadata (category, skill level, grade, language, tags)
- Video associations through CourseVideo junction table
- Assignment tracking for users and organizations

**Video Model**
- Platform integration (YouTube support)
- Duration and metadata tracking
- Quiz associations
- Watch log tracking

**WatchLog Model**
- Comprehensive progress tracking
- Anti-gaming features (skip/pause events)
- Session management (user agent, timestamps)
- Completion tracking

**Quiz Model**
- JSON-based question storage
- Video association
- Attempt tracking with scoring

### Relationships

- Users belong to OrganizationUnits and Grades
- Courses have multiple Videos in sequence
- Videos can have associated Quizzes
- WatchLogs track student video progress
- OrganizationAssignments link courses to organizational units

## Authentication & Authorization

### JWT Implementation

**Token Structure**
```javascript
{
  userId: number,
  role: string,
  organizationUnitId: number
}
```

**Token Configuration**
- **Expiration**: 7 days
- **Algorithm**: HMAC SHA256
- **Secret**: Environment-based JWT_SECRET

### Role-Based Access Control

#### Role Hierarchy

- **STUDENT**: Can view assigned courses, watch videos, take quizzes
- **INSTRUCTOR**: Can view student progress
- **ADMIN**: Can manage all courses, users, and view analytics
- **SUPERADMIN**: Full system access and configuration

### Security Features

#### Anti-Gaming Measures
- **Speed Validation**: Maximum 1.6x playback speed
- **Skip Detection**: Large skip threshold monitoring
- **Session Validation**: Multi-device detection
- **Progress Integrity**: Duration overflow protection

#### Rate Limiting
- **Authentication**: Login/signup protection
- **Progress Updates**: User-specific rate limiting
- **API Protection**: Comprehensive rate limiting strategy

## API Endpoint Structure

### Authentication Endpoints
```
POST /api/auth/signup          # User registration
POST /api/auth/login           # User authentication
GET  /api/auth/signup-options  # Registration options
POST /api/auth/verify-email    # Email verification
POST /api/auth/forgot-password # Password reset request
POST /api/auth/reset-password  # Password reset
```

### User Endpoints
```
GET /api/user/profile          # User profile with activity
PUT /api/user/profile          # Update user profile
POST /api/user/change-password # Change user password
```

### Video Endpoints
```
GET  /api/videos/courses/:courseId        # Course videos
GET  /api/videos/:videoId                 # Video details
POST /api/videos/:videoId/progress        # Progress update
GET  /api/videos/courses/:courseId/progress # Course progress
```

### Course Endpoints
```
GET /api/courses              # Course listing
GET /api/courses/:courseId    # Course details
```

### Analytics Endpoints
```
GET  /api/analytics/student/summary                    # Student summary
GET  /api/analytics/student/activity-trends            # Activity trends
GET  /api/analytics/student/course-progress            # Course progress
GET  /api/analytics/student/quiz-analytics             # Quiz analytics
POST /api/analytics/event                              # Event logging
GET  /api/analytics/student/activity-calendar          # Activity calendar
GET  /api/analytics/student/study-time-patterns        # Study patterns
```

### Quiz Endpoints
```
GET  /api/quizzes                    # Quiz listing
GET  /api/quizzes/video/:videoId     # Video quiz
GET  /api/quizzes/attempts           # User attempts
POST /api/quizzes/attempts           # Create attempt
GET  /api/quizzes/:id                # Quiz details
```

### Admin Endpoints
```
# User Management
GET    /api/admin/users              # List users
POST   /api/admin/users              # Create user
PUT    /api/admin/users/:id/role     # Update role
DELETE /api/admin/users/:id          # Delete user

# Student Management
GET /api/admin/students              # List students
GET /api/admin/students/:id          # Student details

# Course Management
GET    /api/admin/courses            # List courses
POST   /api/admin/courses            # Create course
PUT    /api/admin/courses/:id        # Update course
DELETE /api/admin/courses/:id        # Delete course

# Analytics
GET /api/admin/analytics/*           # Admin analytics endpoints
```

## Data Validation & Error Handling

### Validation Strategy

#### Input Validation
- **Express-validator**: Request body validation
- **Type Checking**: Runtime type validation
- **Business Logic**: Domain-specific validation rules

#### Video Progress Validation
```javascript
// Anti-gaming validation
const validateProgressIntegrity = (current, previous, video, realTimeElapsed) => {
  // Speed validation
  // Skip detection
  // Duration overflow protection
}
```

### Error Handling

#### Centralized Error Handler
```javascript
app.use((err, req, res, next) => {
  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Invalid request data',
      details: err.message
    });
  }
  
  // Database conflicts
  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'Data conflict occurred'
    });
  }
  
  // Generic error handling
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

#### Error Types
- **Validation Errors**: 400 Bad Request
- **Authentication Errors**: 401 Unauthorized
- **Authorization Errors**: 403 Forbidden
- **Not Found Errors**: 404 Not Found
- **Conflict Errors**: 409 Conflict
- **Rate Limit Errors**: 429 Too Many Requests
- **Server Errors**: 500 Internal Server Error

## External Services Integration

### YouTube API Integration

#### Video Metadata Retrieval
- **API Endpoints**: YouTube Data API v3
- **Video Information**: Title, description, duration, thumbnails
- **Playlist Support**: Bulk video processing
- **Error Handling**: Graceful API failure handling

#### Features
- **Video ID Extraction**: URL parsing for various YouTube formats
- **Duration Parsing**: ISO 8601 duration format conversion
- **Thumbnail Generation**: High-quality thumbnail URLs
- **Rate Limiting**: API quota management

## Performance & Scalability

### Database Optimization

#### Indexing Strategy
```sql
-- User indexes
@@index([organizationUnitId])
@@index([gradeId])
@@index([role])

-- WatchLog indexes
@@index([userId, updatedAt(sort: Desc)])
@@index([videoId, isCompleted])
@@index([lastUpdateTime])

-- CourseVideo indexes
@@index([courseId, order])
```

#### Query Optimization
- **Prisma Relations**: Efficient relationship loading
- **Selective Fields**: Minimal data fetching
- **Pagination**: Cursor-based pagination for large datasets
- **Aggregation**: Database-level calculations

### Security Considerations
- **Input Sanitization**: Comprehensive input validation
- **SQL Injection**: Prisma ORM protection
- **XSS Protection**: Content Security Policy
- **CSRF Protection**: CORS configuration
- **Rate Limiting**: Multi-layer rate limiting

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=your-production-database-url
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://your-frontend-domain.com
PORT=5000
```

## API Documentation

### Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details (development only)"
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error

### Pagination

List endpoints support pagination:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```
## Monitoring & Analytics

### Health Monitoring
```
GET /api/health
```
Returns server status and timestamp for monitoring systems.

## Development

### Code Structure

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and data processing
- **Middlewares**: Request processing and validation
- **Routes**: API endpoint definitions
- **Utils**: Helper functions and utilities

### Adding New Features

1. Create database migration if needed
2. Update Prisma schema
3. Create/update service layer
4. Create/update controller
5. Define routes
6. Add middleware if needed
7. Update documentation

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name your-migration-name

# Apply migrations to production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

---
