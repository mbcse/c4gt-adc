// src/App.tsx

import React from "react";
import "./global.css";
import { Toaster } from "@/student/components/ui/toaster";
import { Toaster as Sonner } from "@/student/components/ui/sonner";
import { TooltipProvider } from "@/student/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom"; // No BrowserRouter

import ProtectedRoute from "./shared/components/ProtectedRoute";
import LandingRedirect from "./shared/components/LandingRedirect";

// --- Import all your pages ---
import Dashboard from "./student/pages/Index";
import MyCourses from "./student/pages/Courses";
import CoursePage from "./student/pages/CoursePage";
import MyProgress from "./student/pages/Progress";
import Quizzes from "./student/pages/Quizzes";
import Profile from "./student/pages/Profile";
import VideoPage from "./student/pages/VideoPage";
import CourseVideoRouteHandler from "./student/components/CourseVideoRouteHandler";
import AdminLayout from "./admin/components/Layout";
import AnalyticsDashboard from "./admin/pages/Analytics";
import ManageStudents from "./admin/pages/Students";
import ManageCourses from "./admin/pages/Courses";
import UserManagement from "./admin/pages/UserManagement";
import CourseDetailPage from "@/admin/pages/CourseDetailPage";
import Login from "./shared/pages/Login";
import Signup from "./shared/pages/Signup";
import NotFound from "./shared/pages/NotFound";
import VerifyEmail from './shared/pages/VerifyEmail';
import ForgotPassword from './shared/pages/ForgotPassword';
import ResetPassword from './shared/pages/ResetPassword';
import ChangePassword from './shared/pages/ChangePassword';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<LandingRedirect />}>
            {/* Public routes */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route
              path="change-password"
              element={<ProtectedRoute allowedRoles={["STUDENT", "ADMIN", "SUPERADMIN", "INSTRUCTOR"]}><ChangePassword /></ProtectedRoute>}
            />
            {/* Admin routes under /admin with layout */}
            <Route
              path="admin/*"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN", "INSTRUCTOR"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AnalyticsDashboard />} />
              <Route path="students" element={<ManageStudents />} />
              <Route path="courses" element={<ManageCourses />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="courses/:id" element={<CourseDetailPage />} />
            </Route>

            {/* Student routes */}
            <Route
              path="dashboard"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><Dashboard /></ProtectedRoute>}
            />
            <Route
              path="courses"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><MyCourses /></ProtectedRoute>}
            />
            <Route
              path="courses/:courseId"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><CoursePage /></ProtectedRoute>}
            />
            <Route
              path="courses/:courseId/video"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><CourseVideoRouteHandler /></ProtectedRoute>}
            />
            <Route
              path="courses/:courseId/video/:videoId"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><VideoPage /></ProtectedRoute>}
            />
            <Route
              path="progress"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><MyProgress /></ProtectedRoute>}
            />
            <Route
              path="quizzes"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><Quizzes /></ProtectedRoute>}
            />
            <Route
              path="profile"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><Profile /></ProtectedRoute>}
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;