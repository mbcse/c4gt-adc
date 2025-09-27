
import React from "react";

import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CoursePage from "./pages/CoursePage";
import Progress from "./pages/Progress";
import Quizzes from "./pages/Quizzes";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import VideoPage from "./pages/VideoPage";
import NotFound from "./pages/NotFound";
import CourseVideoRedirect from "./pages/CourseVideoRedirect";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
<Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
<Route path="/courses/:courseId" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
<Route path="/courses/:courseId/video" element={<ProtectedRoute><CourseVideoRedirect /></ProtectedRoute>} />
<Route path="/courses/:courseId/video/:videoId" element={<ProtectedRoute><VideoPage /></ProtectedRoute>} />
<Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
<Route path="/quizzes" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
<Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
<Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Catch-all route for 404 Not Found */}

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

