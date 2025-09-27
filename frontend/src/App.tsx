import React from "react";
import "./global.css";
import { Toaster } from "@/student/components/ui/toaster";
import { Toaster as Sonner } from "@/student/components/ui/sonner";
import { TooltipProvider } from "@/student/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./shared/components/ProtectedRoute";

// Student pages (pages contain internal layout)
import Dashboard from "./student/pages/Index";
import MyCourses from "./student/pages/Courses";
import CoursePage from "./student/pages/CoursePage";
import MyProgress from "./student/pages/Progress";
import Quizzes from "./student/pages/Quizzes";
import Achievements from "./student/pages/Achievements";
import Leaderboard from "./student/pages/Leaderboard";
import Profile from "./student/pages/Profile";
import VideoPage from "./student/pages/VideoPage";
import CourseVideoRedirect from "./student/pages/CourseVideoRedirect";

// Admin layout + pages (layout wraps pages via <Outlet />)
import AdminLayout from "./admin/components/Layout";
import AdminDashboard from "./admin/pages/Dashboard";
import ManageStudents from "./admin/pages/Students";
import ManageCourses from "./admin/pages/Courses";
import ViewProgress from "./admin/pages/Progress";
import QuizAnalytics from "./admin/pages/QuizAnalytics";
import Reports from "./admin/pages/Reports";
import UserManagement from "./admin/pages/UserManagement";
import ManageNotifications from "./admin/pages/Notifications";

// Shared
import Login from "./shared/pages/Login";
import Signup from "./shared/pages/Signup";
import NotFound from "./shared/pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin routes under /admin with layout */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {/* Nested admin pages */}
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<ManageStudents />} />
              <Route path="courses" element={<ManageCourses />} />
              <Route path="progress" element={<ViewProgress />} />
              <Route path="quiz-analytics" element={<QuizAnalytics />} />
              <Route path="reports" element={<Reports />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="notifications" element={<ManageNotifications />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Student routes (pages include layout internally) */}
            <Route
              path="/*"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  {/* Wrap student routes inside another <Routes> to avoid conflicts */}
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="courses" element={<MyCourses />} />
                    <Route path="courses/:courseId" element={<CoursePage />} />
                    <Route path="courses/:courseId/video" element={<CourseVideoRedirect />} />
                    <Route path="courses/:courseId/video/:videoId" element={<VideoPage />} />
                    <Route path="progress" element={<MyProgress />} />
                    <Route path="quizzes" element={<Quizzes />} />
                    <Route path="achievements" element={<Achievements />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
