import React from "react";
import "./global.css";
import { Toaster } from "@/student/components/ui/toaster";
import { Toaster as Sonner } from "@/student/components/ui/sonner";
import { TooltipProvider } from "@/student/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./shared/components/ProtectedRoute";

// Student pages 
import Dashboard from "./student/pages/Index";
import MyCourses from "./student/pages/Courses";
import CoursePage from "./student/pages/CoursePage";
import MyProgress from "./student/pages/Progress";
import Quizzes from "./student/pages/Quizzes";
import Profile from "./student/pages/Profile";
import VideoPage from "./student/pages/VideoPage";
import CourseVideoRouteHandler from "./student/components/CourseVideoRouteHandler";

// Admin layout + pages 
import AdminLayout from "./admin/components/Layout";
import AnalyticsDashboard from "./admin/pages/Analytics";
import ManageStudents from "./admin/pages/Students";
import ManageCourses from "./admin/pages/Courses";
import UserManagement from "./admin/pages/UserManagement";
import CourseDetailPage from "@/admin/pages/CourseDetailPage";

// Shared
import Login from "./shared/pages/Login";
import Signup from "./shared/pages/Signup";
import NotFound from "./shared/pages/NotFound";
import LandingRedirect from "./shared/components/LandingRedirect";

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
            <Route path="/" element={<LandingRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin routes under /admin with layout */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN", "INSTRUCTOR"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {/* Nested admin pages */}
              <Route index element={<AnalyticsDashboard />} />
              <Route path="students" element={<ManageStudents />} />
              <Route path="courses" element={<ManageCourses />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="courses/:id" element={<CourseDetailPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Student routes (pages include layout internally) */}
            <Route
              path="/*"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="courses" element={<MyCourses />} />
                    <Route path="courses/:courseId" element={<CoursePage />} />
                    <Route path="courses/:courseId/video" element={<CourseVideoRouteHandler />} />
                    <Route path="courses/:courseId/video/:videoId" element={<VideoPage />} />
                    <Route path="progress" element={<MyProgress />} />
                    <Route path="quizzes" element={<Quizzes />} />
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
