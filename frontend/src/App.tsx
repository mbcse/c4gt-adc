// src/App.tsx
import React from "react";

// Import your global CSS here if not imported in main.tsx
import "./global.css";

// Import UI components, routes, providers etc.
// Make sure these paths and files exist in your project
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

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/courses/:courseId/video" element={<CourseVideoRedirect />} />
            <Route path="/courses/:courseId/video/:videoId" element={<VideoPage />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

