import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  FileText,
  Download,
  MessageSquare,
  Settings,
  RotateCcw,
  PlayCircle,
  List,
  Trophy,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/DashboardLayout";

export default function VideoPage() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showModules, setShowModules] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2, 3]);

  // Simplified course data
  const courseData = {
    id: parseInt(courseId || "1"),
    title: "Advanced React Development",
    instructor: "Ananya Mehta",
    instructorAvatar: "AM",
    rating: 4.8,
    totalModules: 8,
    completedModules: 3,
    progress: 45,
  };

  const currentLesson = {
    id: 7,
    title: "React Context API",
    duration: "7:15",
    description: "Learn how to use React Context API for state management across your application.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    resources: [
      { name: "React Context Documentation", type: "link", url: "#" },
      { name: "Code Examples", type: "file", url: "#" },
      { name: "Exercise Files", type: "download", url: "#" },
    ]
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const markLessonComplete = (lessonId: number) => {
    setCompletedLessons(prev => [...prev, lessonId]);
  };

  const getNextLesson = () => {
    return { moduleId: 3, lessonId: 8 };
  };

  const getPreviousLesson = () => {
    return { moduleId: 2, lessonId: 6 };
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="relative z-10 p-4 md:p-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-4 md:mb-6">
            <nav className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600 overflow-x-auto">
              <Link to="/courses" className="hover:text-teal-600 transition-colors flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                Courses
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link to={`/courses/${courseId}`} className="hover:text-teal-600 transition-colors">
                {courseData.title}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">{currentLesson.title}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Main Video Area */}
            <div className="xl:col-span-3 lg:col-span-2 space-y-4 md:space-y-6">
              {/* Video Player */}
              <Card className="overflow-hidden shadow-xl bg-white border-gray-200">
                <div className="relative bg-black">
                  <div className="aspect-video relative">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                          {isPlaying ? (
                            <Pause className="h-6 w-6 md:h-8 md:w-8 text-white" />
                          ) : (
                            <Play className="h-6 w-6 md:h-8 md:w-8 text-white ml-1" />
                          )}
                        </div>
                        <p className="text-white text-base md:text-lg font-medium px-4">{currentLesson.title}</p>
                        <p className="text-gray-300 text-sm">{currentLesson.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Lesson Info */}
              <Card className="bg-white shadow-lg border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg md:text-xl text-gray-900 mb-2">{currentLesson.title}</CardTitle>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {currentLesson.duration}
                        </div>
                        <div className="flex items-center">
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarFallback className="text-xs bg-teal-100 text-teal-700">
                              {courseData.instructorAvatar}
                            </AvatarFallback>
                          </Avatar>
                          {courseData.instructor}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                          {courseData.rating}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{currentLesson.description}</p>
                    </div>
                    <Button
                      onClick={() => markLessonComplete(currentLesson.id)}
                      className="lg:ml-4 w-full lg:w-auto bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                      disabled={completedLessons.includes(currentLesson.id)}
                    >
                      {completedLessons.includes(currentLesson.id) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Target className="h-4 w-4 mr-2" />
                          Mark Complete
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Navigation Controls */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <Button
                  variant="outline"
                  onClick={() => {
                    const prev = getPreviousLesson();
                    navigate(`/courses/${courseId}/video/${prev.moduleId}/${prev.lessonId}`);
                  }}
                  className="flex items-center space-x-2 bg-white border-gray-300 hover:bg-gray-50 w-full md:w-auto"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous Lesson</span>
                  <span className="sm:hidden">Previous</span>
                </Button>

                <div className="text-center order-first md:order-none">
                  <div className="text-sm text-gray-600 mb-1">Module Progress</div>
                  <div className="flex items-center space-x-2">
                    <Progress value={33} className="w-24 md:w-32 h-2" />
                    <span className="text-sm font-medium text-gray-700">1 of 3</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    const next = getNextLesson();
                    navigate(`/courses/${courseId}/video/${next.moduleId}/${next.lessonId}`);
                  }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white w-full md:w-auto"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 lg:col-span-1 order-first lg:order-last">
              <Card className="bg-white shadow-lg border-gray-200 lg:sticky lg:top-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-900 flex items-center">
                    <List className="h-5 w-5 mr-2 text-teal-600" />
                    Course Progress
                  </CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{courseData.completedModules} of {courseData.totalModules} completed</span>
                    <span>{courseData.progress}%</span>
                  </div>
                  <Progress value={courseData.progress} className="h-2" />
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
