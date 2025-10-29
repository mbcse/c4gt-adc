# Frontend Documentation

This is the frontend application for the Rohtak Guided Learning Tracker platform. Built with React 18, TypeScript, and modern web technologies, it provides an intuitive and responsive user interface for students, instructors, and administrators.

## Architecture Overview

The frontend follows the following architecture with clear separation of concerns:

```
frontend/
├── src/
│   ├── admin/              # Admin-specific components and pages
│   ├── student/            # Student-specific components and pages
│   ├── shared/             # Shared components and utilities
│   ├── api/                # API integration layer
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets
└── dist/                   # Build output
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation (Local Dev)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Start Production Preview** (for testing production build)
   ```bash
   npm run start
   ```

The application will start on `http://localhost:8080` by default.

## 🔧 Environment Configuration

Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Optional: Additional configuration
VITE_APP_NAME="C4GT ADC"
VITE_APP_VERSION="1.0.0"
```

When running via Docker Compose, set:
```env
VITE_API_URL=http://localhost:5000
VITE_ENVIRONMENT=production
```
and use the root `docker-compose.yml` to build and run both services.

For production deployment with Caddy reverse proxy:
```env
VITE_API_URL=https://gyanseturohtak.in
VITE_ENVIRONMENT=production
```

## Technology Stack

### Core Technologies

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and development server
- **React Router v6**: Client-side routing

### UI & Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### Development Tools

- **TypeScript**: Static type checking
- **Prettier**: Code formatting
- **Vitest**: Testing framework
- **ESLint**: Code linting

### Data Visualization:
- **Recharts**: Chart library for analytics and reporting
- **Custom Chart Components**: Specialized educational analytics charts

## Directory Architecture and Responsibilities

```
frontend/src/
├── admin/                    # Admin-specific functionality
│   ├── components/          # Admin UI components
│   │   ├── charts/         # Analytics chart components
│   │   ├── Layout.tsx      # Admin layout wrapper
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── ...             # Admin-specific components
│   ├── hooks/              # Admin-specific hooks
│   │   └── useAdminAnalytics.ts
│   └── pages/              # Admin page components
│       ├── Analytics.tsx   # Analytics dashboard
│       ├── Courses.tsx     # Course management
│       ├── Students.tsx    # Student management
│       └── UserManagement.tsx
├── student/                 # Student-specific functionality
│   ├── components/         # Student UI components
│   │   ├── charts/        # Student analytics charts
│   │   ├── ui/            # Reusable UI components
│   │   ├── VideoPlayer.tsx # Video player component
│   │   ├── QuizModal.tsx   # Quiz interface
│   │   └── DashboardLayout.tsx
│   ├── hooks/             # Student-specific hooks
│   │   └── useStudentAnalytics.ts
│   ├── lib/               # Student utilities
│   │   └── utils.ts       # Utility functions
│   └── pages/             # Student page components
│       ├── Index.tsx      # Dashboard
│       ├── Courses.tsx    # Course listing
│       ├── VideoPage.tsx  # Video player page
│       └── Progress.tsx   # Progress tracking
├── shared/                 # Shared functionality
│   ├── components/        # Shared UI components
│   │   ├── ProtectedRoute.tsx
│   │   └── LandingRedirect.tsx
│   ├── context/           # Global context providers
│   │   └── AuthContext.tsx
│   └── pages/             # Shared pages
│       ├── Login.tsx
│       ├── Signup.tsx
│       ├── VerifyEmail.tsx
│       ├── ForgotPassword.tsx
│       ├── ResetPassword.tsx
│       ├── ChangePassword.tsx
│       └── NotFound.tsx
├── api/                   # API integration layer
│   ├── index.ts          # API client configuration
│   ├── authAPI.ts        # Authentication API
│   ├── courseAPI.ts      # Course management API
│   ├── videoAPI.ts       # Video management API
│   ├── quizAPI.ts        # Quiz management API
│   ├── analyticsAPI.ts   # Student analytics API
│   └── adminAnalyticsAPI.ts # Admin analytics API
├── types/                 # TypeScript type definitions
│   └── index.ts          # Global type definitions
├── utils/                 # Utility functions
│   └── format.ts         # Formatting utilities
└── App.tsx               # Main application component
```

### Key Module Responsibilities

#### 1. **Authentication Module** (`shared/context/AuthContext.tsx`)
- **Purpose**: Global authentication state management
- **Responsibilities**:
  - JWT token management and validation
  - User profile synchronization
  - Automatic token refresh and logout on expiration
  - Role-based access control state

#### 2. **API Integration Layer** (`api/`)
- **Purpose**: Centralized API communication and data fetching
- **Architecture**: Service-based pattern with role-aware routing
- **Key Features**:
  - **Role-based API routing**: Automatically switches between admin and student API endpoints
  - **Automatic token injection**: JWT tokens added to all requests
  - **Error handling**: Centralized 401 handling with automatic logout
  - **Request/Response interceptors**: Consistent error handling and token management

#### 3. **Student Interface Module** (`student/`)
- **Purpose**: Student-focused learning interface
- **Key Components**:
  - **DashboardLayout**: Responsive sidebar navigation with mobile support
  - **Courses**: Course library browsing
  - **VideoPlayer**: Video player with watch activity tracking
  - **VideoPage**: Video speed and seek violation detection
  - **QuizModal**: Interactive quiz interface with detailed review
  - **useVideoProgressWithAnalytics**: Real-time progress tracking
  - **Progress and useStudentAnalytics**: Progress visualization and learning insights

#### 4. **Admin Interface Module** (`admin/`)
- **Purpose**: Administrative and instructor management interface
- **Key Components**:
  - **Layout, Sidebar and Header**: Admin interface with sidebar navigation
  - **useAdminAnalytucs**: Comprehensive reporting and analytics
  - **Analytics**: Multi-dimensional analytics (by grade, school, block)
  - **AdminCourseWizard**: Course creation wizard with playlist integration
  - **AdminFilters**: Advanced filtering and search capabilities
  - **AssignCourseModal**: Bulk and individual course assignment
  - **AddUserModal**: User management
  - **AdminQuizModal**: Quiz management

#### 5. **Shared Components Module** (`shared/`)
- **Purpose**: Shared components and utilities
- **Key Components**:
  - **ProtectedRoute**: Role-based route protection
  - **LandingRedirect**: Smart routing based on user role
  - **AuthContext**: Role based access control
  - **Shared pages**: Login, Signup and NotFound pages

## Routing Structure & Navigation

### Routing Architecture

The application uses **nested routing** with **role-based access control**:

```typescript
// Main routing structure
<Routes>
  {/* Public routes */}
  <Route path="/" element={<LandingRedirect />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/verify-email" element={<VerifyEmail />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/change-password" element={<ChangePassword />} />

  {/* Admin routes with layout */}
  <Route path="/admin/*" element={
    <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN", "INSTRUCTOR"]}>
      <AdminLayout />
    </ProtectedRoute>
  }>
    <Route index element={<AnalyticsDashboard />} />
    <Route path="students" element={<ManageStudents />} />
    <Route path="courses" element={<ManageCourses />} />
    <Route path="users" element={<UserManagement />} />
  </Route>

  {/* Student routes */}
  <Route path="/\*" element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="courses/:courseId" element={<CoursePage />} />
        <Route path="courses/:courseId/video/:videoId" element={<VideoPage />} />
        <Route path="progress" element={<MyProgress />} />
      </Routes>
    </ProtectedRoute>
  } />
</Routes>
```

## User Interfaces

### Student Interface

The student interface provides a clean, focused learning experience:

#### Key Features
- **Dashboard**: Overview of courses and progress
- **Courses**: Browse and access course library and assigned courses
- **Video Player**: Integrated video player with progress tracking
- **Quiz Interface**: Interactive quiz taking with immediate feedback
- **Progress Tracking**: Visual progress indicators and analytics
- **Profile Management**: View personal information
- **Email Verification**: Account verification through email links

#### Pages
- `/dashboard` - Student dashboard with course overview
- `/courses` - List of all courses
- `/courses/:courseId` - Course detail page with video list
- `/courses/:courseId/video/:videoId` - Video player page
- `/progress` - Personal learning progress and analytics
- `/quizzes` - Quiz history and performance
- `/profile` - Profile management
- `/change-password` - Change account password
- `/verify-email` - Email verification page
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset with token

### Admin Interface

The admin interface provides comprehensive management capabilities:

#### Key Features
- **Analytics Dashboard**: Comprehensive analytics and reporting
- **Student Management**: View student list
- **Course Management**: Create, edit, and manage courses
- **User Management**: Manage all user accounts and roles
- **Content Management**: Upload and organize video content

#### Pages
- `/admin` - Analytics dashboard
- `/admin/students` - Student management
- `/admin/courses` - Course management
- `/admin/users` - User management
- `/admin/courses/:id` - Course detail management

## Component Architecture

### Component Structure

The application uses a hierarchical component structure:

```
components/
├── ui/                    # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── charts/                # Data visualization components
│   ├── ActivityHeatmap.tsx
│   ├── CourseProgressChart.tsx
│   └── ...
└── [feature]/             # Feature-specific components
    ├── [Feature]Form.tsx
    ├── [Feature]List.tsx
    └── ...
```

### UI Components

Built on Radix UI primitives with custom styling:

#### Form Components
- **Input**: Text input with validation
- **Select**: Dropdown selection
- **Checkbox**: Checkbox input
- **RadioGroup**: Radio button groups
- **Textarea**: Multi-line text input
- **Switch**: Toggle switch

#### Layout Components
- **Card**: Content containers
- **Dialog**: Modal dialogs
- **Sheet**: Slide-out panels
- **Tabs**: Tabbed interfaces
- **Accordion**: Collapsible content
- **Sidebar**: Navigation sidebar

#### Data Display
- **Table**: Data tables with sorting and pagination
- **Badge**: Status indicators
- **Avatar**: User profile images
- **Progress**: Progress bars
- **Skeleton**: Loading placeholders

### Chart Components

Built with Recharts for data visualization:

- **ActivityHeatmap**: Learning activity heatmap
- **CourseProgressChart**: Course completion progress
- **QuizPerformanceChart**: Quiz performance over time
- **StudyTimeChart**: Study time analytics
- **EngagementMetricsChart**: User engagement metrics

## Authentication & Authorization

### Authentication Flow

The application uses JWT-based authentication with automatic token management:

```typescript
// Authentication context
const { user, token, login, logout, isAuthenticated } = useAuth();
```

### Role-Based Access Control

Different interfaces are shown based on user roles:

- **STUDENT**: Student interface with course access
- **INSTRUCTOR**: Instructor interface with progress viewing
- **ADMIN**: Admin interface with course and user management capabilities
- **SUPERADMIN**: Super admin with system-wide access

### Protected Routes

Routes are protected using the `ProtectedRoute` component:

```typescript
<ProtectedRoute allowedRoles={["STUDENT"]}>
  <StudentComponent />
</ProtectedRoute>
```

## API Integration

### API Client

The application uses Axios for API communication with automatic token injection:

```typescript
// API instance with automatic authentication
const api = useApi();

// Making authenticated requests
const response = await api.get('/courses');
```

### API Services

Organized by feature area:

- **authAPI**: Authentication, email verification, password reset
- **courseAPI**: Course-related operations
- **videoAPI**: Video content management
- **quizAPI**: Quiz functionality
- **analyticsAPI**: Student analytics tracking
- **userAPI**: User management, profile updates, password changes
- **adminAnalyticsAPI**: Reporting analytics to admins
- **assignmentAPI**: Individual and bulk course assigmnent
- **metadataAPI**: Metadata for courses
- **indexAPI**: Global and static Axios api instances with RBAC
- **publicAPI**: Public api instance

### Error Handling

Comprehensive error handling with user-friendly messages:

```typescript
try {
  const data = await api.get('/courses');
} catch (error) {
  // Automatic error handling with toast notifications
  toast.error('Failed to load courses');
}
```

## State Management

### Local State

Component state is managed using React hooks:

- **useState**: Local component state
- **useEffect**: Side effects and lifecycle
- **useCallback**: Memoized functions
- **useMemo**: Memoized values

### Context API

Global state is managed using React Context:

- **AuthContext**: Authentication state

## Styling & Theming

### Tailwind CSS

Utility-first CSS framework:

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <Button variant="outline">Action</Button>
</div>
```

### Responsive Design

Mobile-first responsive design with Tailwind breakpoints:

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up

---