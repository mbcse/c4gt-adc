# Rohtak Guided Learning Tracker

A comprehensive educational platform designed for digital learning management with advanced analytics and course tracking capabilities. This project provides a full-stack solution for educational institutions to manage courses, track student progress, and analyze learning patterns.

## Project Overview

The Rohtak Guided Learning Tracker is a modern educational platform built with a focus on scalability, user experience, and comprehensive analytics. It supports multiple user roles and provides detailed tracking of student learning progress through video content and quizzes.

### Primary Objectives

1. **Educational Excellence**: Provide a robust platform for course delivery with comprehensive progress tracking
2. **Data-Driven Insights**: Enable educators and administrators to make informed decisions through detailed analytics
3. **Scalable Learning**: Support (scalable) organizational hierarchy from state-level down to individual schools
4. **Engagement Optimization**: Track and analyze student engagement patterns to improve learning outcomes
5. **Administrative Efficiency**: Streamline course management, user administration, and reporting processes

### Target Users

- **Students**: Access courses, attempt quizzes, track progress, and engage with interactive content
- **Instructors**: Monitor student progress and access teaching analytics
- **Administrators**: Manage users, courses, and access comprehensive organizational analytics
- **Super Administrators**: System-wide configuration and advanced analytics capabilities

### Key Features

- **Multi-Role User Management**: Support for Students, Instructors, Admins, and Super Admins
- **Course Management**: Complete course lifecycle management with video content
- **Progress Tracking**: Detailed analytics on student learning progress and engagement
- **Quiz System**: Integrated quiz functionality with automated scoring
- **Organizational Hierarchy**: Support for state, district, block, and school-level organization
- **Real-time Analytics**: Comprehensive dashboards for administrators and instructors
- **Video Integration**: Support for YouTube video content with progress tracking

### System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React SPA)                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │   Student   │ │    Admin    │ │  Shared     │ │    API      ││
│  │  Interface  │ │  Interface  │ │ Components  │ │  Layer      ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Backend (Node.js/Express)                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │  Controllers│ │ Middleware  │ │  Services   │ │    Routes   ││
│  │    Layer    │ │    Stack    │ │    Layer    │ │    Layer    ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Database Layer (PostgreSQL)                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │    User     │ │   Course    │ │   Video     │ │  Analytics  ││
│  │ Management  │ │ Management  │ │ Tracking    │ │    Data     ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │   YouTube   │ │    JWT      │ │   Rate      │ │  Security   ││
│  │     API     │ │  Auth       │ │ Limiting    │ │  Headers    ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Backend:**
- Node.js with Express.js
- PostgreSQL database with Prisma ORM
- JWT authentication
- Comprehensive analytics services
- Rate limiting and security middleware

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Radix UI components
- React Query for state management
- React Router for navigation

## Project Structure

```
c4gt-adc/
├── backend/          # Node.js/Express API server
├── frontend/         # React/TypeScript web application
└── README.md         # This file
```

### Backend (`/backend`)
- **API Server**: RESTful API with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based auth with role-based access control
- **Analytics**: Comprehensive analytics services for tracking learning progress
- **Security**: Rate limiting, CORS, and input validation

[Detailed Backend Documentation](./backend/README.md)

### Frontend (`/frontend`)
- **Student Interface**: Course browsing, video watching, progress tracking
- **Admin Interface**: Course management, student analytics, user management
- **Shared Components**: Reusable UI components and utilities
- **Type Safety**: Full TypeScript implementation with comprehensive type definitions

[Detailed Frontend Documentation](./frontend/README.md)

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd c4gt-adc
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your environment variables
   npx prisma migrate dev  # Set up the database
   npx prisma generate     # Generate Prisma client
   npm run dev            # Start the development server
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run dev          # Start the development server
   ```

4. **Access the Application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000

## 🔧 Environment Configuration

### Backend Environment Variables
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your-jwt-secret"
CORS_ORIGIN="http://localhost:8080"
PORT=5000
NODE_ENV="development"
```

### Frontend Environment Variables
```env
VITE_API_URL="http://localhost:5000"
```

## User Roles & Permissions

### Student
- View assigned courses
- Watch video content with progress tracking
- Take quizzes and view results
- Track personal learning progress
- Access profile information

### Instructor
- View student progress for assigned courses
- Access teaching analytics

### Admin
- All instructor permissions
- Manage all courses and users of own organisation
- Access comprehensive analytics
- Manage organizational hierarchy
- Bulk course assignments

### Super Admin
- All admin permissions
- System-wide configuration
- User role management
- Advanced analytics and reporting

## Key Features

### Course Management
- **Course Creation**: Rich course creation with metadata, categories, and skill levels
- **Video Integration**: Support for adding YouTube videos with progress tracking
- **Content Organization**: Hierarchical course structure with video ordering
- **Assignment System**: Course assignment to individual users or organizational units

### Progress Tracking
- **Video Analytics**: Detailed tracking of video watch time, completion rates, and engagement
- **Quiz Analytics**: Comprehensive quiz performance tracking and scoring
- **Learning Paths**: Visual progress tracking through course content
- **Engagement Metrics**: Skip events, pause events, and interaction patterns

### Analytics Dashboard
- **Student Analytics**: Individual student progress and performance metrics
- **Course Analytics**: Course completion rates and engagement statistics
- **Organizational Analytics**: District and school-level performance insights
- **Real-time Reporting**: Live updates on learning progress and engagement

## Security Features

- **Authentication**: JWT-based authentication with secure token management
- **Authorization**: Role-based access control with granular permissions
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive input validation and sanitization
- **CORS Protection**: Configured CORS policies for secure cross-origin requests
- **Security Headers**: Helmet.js for security headers and protection

---