import React from "react";
import {
  Card,
  CardContent,
} from "@/student/components/ui/card";
import { Button } from "@/student/components/ui/button";
import { Progress } from "@/student/components/ui/progress";
import { Avatar, AvatarFallback } from "@/student/components/ui/avatar";
import {
  BookOpen,
  Trophy,
  Play,
  Star,
  User,
  ChevronRight,
  CheckCircle,
  Zap,
  Crown,
  Medal,
  Flame,
  Clock,
  Sparkles,
  Calendar,
  TrendingUp,
  GraduationCap,
  Loader2
} from "lucide-react";
import { cn } from "@/student/lib/utils";
import { Link } from "react-router-dom";
import DashboardLayout from "@/student/components/DashboardLayout";
import { useStudentAnalytics } from "@/student/hooks/useStudentAnalytics";

import { useEffect, useState } from "react";
import { courseAPI } from "@/api/courseAPI";
import { useAuth } from '@/shared/context/AuthContext';
import { useApi } from '@/api/index';
import { formatDuration } from "@/utils/format";

export default function Index() {
  const { user } = useAuth();
  const api = useApi();
  const [assignedCourses, setAssignedCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

const {
    summary,
    activityCalendar,
    studyTimePatterns, 
    fetchStudyTimePatterns,
    loading: loadingAnalytics, 
    error: analyticsError,
  } = useStudentAnalytics();



  useEffect(() => {
    async function fetchTopCourses() {
      try {
        setLoadingCourses(true);
        const response = await courseAPI.getAllCourses(api, 1, 10);
        const courses = response.data || [];

        // Sort by progress descending, pick top 3, shape data for dashboard
        const top3 = courses
          .sort((a: any, b: any) => b.progress - a.progress)
          .slice(0, 3)
          .map((course: any) => ({
            ...course,
            color:
              course.progress === 100
                ? "from-emerald-100 to-green-100"
                : course.progress > 0
                  ? "from-blue-100 to-indigo-100"
                  : "from-gray-100 to-slate-100",
            image: course.thumbnailUrl ? (
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <BookOpen className="h-16 w-16 text-gray-400" />
            ),
            instructor: course.creatorName || course.createdBy || "Unknown",
            timeLeft: "N/A",
          }));

        setAssignedCourses(top3);
      } catch (error) {
        console.error("Failed to fetch courses for dashboard", error);
      } finally {
        setLoadingCourses(false);
      }
    }

    fetchTopCourses();
  }, [api]);

  useEffect(() => {
    // Also fetch the data for the weekly chart
    if (fetchStudyTimePatterns) {
      fetchStudyTimePatterns('weekly');
    }
  }, [fetchStudyTimePatterns]);

 const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Create a map of the weekly pattern data for easy lookup
  // studyTimePatterns = [{period: 'Mon', studyTime: 0.01}, {period: 'Tue', studyTime: 0.02}, ...]
  const weeklyPatternMap = new Map(
     (studyTimePatterns || []).map(item => [item.period, item.studyTime])
  );

  // Build the final array for the chart, ensuring all 7 days are present in order
  const dynamicDailyData = dayLabels.map(day => {
    const hours = weeklyPatternMap.get(day) || 0;
    return {
      day: day,
      hours: hours,
      completed: hours > 0,
    };
  });


  if (loadingCourses || loadingAnalytics) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center p-6 space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <span className="text-gray-600 text-lg">
            {loadingCourses ? "Loading your courses..." : "Loading your progress..."}
          </span>
        </div>
      </DashboardLayout>
    );
  }

  if (analyticsError) {
    // Optionally handle analytics error (e.g., show a default state)
    console.error("Analytics Error:", analyticsError);
    // You could still render the dashboard but the stats cards will show 0
  }


  // Top 3 most recent achievements (from achievements page)
  const recentAchievements = [
    {
      id: 1,
      title: "Quick Learner",
      description: "Complete 15 lessons in a week",
      icon: Zap,
      bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
      earnedDate: "2024-02-15",
      points: 50,
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Get 100% on 8 quizzes",
      icon: Star,
      bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
      earnedDate: "2024-02-10",
      points: 100,
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Score 90%+ on 5 quizzes in a row",
      icon: Trophy,
      bgColor: "bg-gradient-to-r from-orange-500 to-amber-500",
      earnedDate: "2024-02-08",
      points: 75,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="text-center py-8 mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
              <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight pb-2">
              Learning Dashboard
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Step in • Power up • Rise high! 
          </p>
        </div>
        {/* Welcome Card */}
        <Card className="bg-transparent text-slate-800 border-4 border-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-[2px] overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
          <div className="bg-gradient-to-br from-white/95 via-white/98 to-white/95 rounded-lg h-full">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="h-6 w-6 text-purple-500" />
                    <span className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
                      Welcome Back!
                    </span>
                  </div>
                  <span className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent">
                    Hello, {user?.name || 'User'}!
                  </span>
                  <p className="text-xl text-slate-600 mb-6">
                    Ready to unlock new skills today? You're on fire! <Flame className="h-5 w-5 text-orange-500" />
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => {
                        const coursesSection = document.getElementById('courses-section');
                        coursesSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg px-6 py-3 rounded-xl"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Keep Going
                    </Button>
                  </div>
                </div>
                <div className="relative ml-8 hidden lg:block">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-inner">
                    <svg className="w-16 h-16 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.99 5.16-.25 9-4.44 9-9.99V7l-10-5z" />
                      <path d="M12 8.5L8.5 12L12 15.5L15.5 12L12 8.5z" fill="white" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-green-400 to-teal-400 rounded-full shadow-lg"></div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Achievement Badges Row */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Your Achievements
              </h2>
            </div>
            <Link
              to="/achievements"
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg px-3 py-2 text-sm font-medium transition-colors flex items-center"
            >
              View More <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentAchievements.map((badge) => (
              <Card
                key={badge.id}
                className={`${badge.bgColor} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <badge.icon className="h-6 w-6 text-white/80" />
                    <Trophy className="h-4 w-4 text-white/60" />
                  </div>
                  <div className="text-lg font-bold text-white mb-1">
                    {badge.title}
                  </div>
                  <p className="text-xs text-white/80 mb-2">{badge.description}</p>
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(badge.earnedDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {badge.points} pts
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mixed Layout Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Courses Section - 4 columns */}
          <div className="lg:col-span-4" id="courses-section">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-teal-500" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Continue Learning
                </h2>
              </div>
              <Link
                to="/courses"
                className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg px-3 py-2 text-sm font-medium transition-colors flex items-center"
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedCourses.map((course) => (
                <Link key={course.id} to={`/courses/${course.id}`}>
                  <Card
                    className="relative flex flex-col h-full min-h-[350px] max-h-[420px] bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 hover:border-teal-200 rounded-2xl"
                  >
                    <CardContent className="flex flex-col h-full p-0">
                      {/* Thumbnail */}
                      <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
                        {typeof course.image === "string" ? (
                          <div className="text-6xl flex items-center justify-center h-full">{course.image}</div>
                        ) : (
                          course.image
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                            {course.progress}% Complete
                          </div>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6 min-h-[180px]">
                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-teal-700 transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        {course.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                            {course.description}
                          </p>
                        )}
                        {/* Progress Bar */}
                        <div className="mt-auto space-y-2">
                          <Progress
                            value={course.progress}
                            className="h-2 rounded-md bg-gray-200 [&>div]:bg-teal-500"
                          />

                          <div className="flex justify-between text-xs text-gray-500">
                            <span className="flex items-center">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDuration(course.totalDuration)}
                            </span>
                          </div>
                          {/* Button */}
                          <Button className="w-full mt-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg transition-all duration-300 py-2.5 flex items-center justify-center gap-2">
                            <Play className="h-4 w-4" />
                            Resume
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

            </div>
          </div>

          {/* Side Panel - Weekly Progress */}
          <div className="space-y-4">
            {/* 6. Replace hardcoded data with summary hook data */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 shadow-xl border-4 border-blue-200">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-300 rounded-full opacity-70"></div>
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-70"></div>

              <CardContent className="relative p-4 text-center">
                <div className="relative">
                  <Flame className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                </div>
                <div className="text-xl font-bold text-white mb-1 drop-shadow-md">
                  {summary?.currentStreak || 0}
                </div>
                <p className="text-white/90 font-medium text-sm drop-shadow-sm">Day Streak</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 shadow-xl border-4 border-teal-200">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-50"></div>
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-70"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-teal-200 rounded-full opacity-70"></div>

              <CardContent className="relative p-4 text-center">
                <div className="relative">
                  <Clock className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                </div>
                <div className="text-xl font-bold text-white mb-1 drop-shadow-md">
                  {summary?.studyTimeThisWeek || 0}h
                </div>
                <p className="text-white/90 font-medium text-sm drop-shadow-sm">This Week</p>

                {/* Replaced Progress bar with dynamic lesson count, since target isn't available */}
                <div className="border-t border-white/20 mt-2 pt-2">
                  <p className="text-sm font-semibold text-white/90">
                    {summary?.lessonsCompletedThisWeek || 0} Lessons
                  </p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-purple-400 via-violet-400 to-indigo-500 shadow-xl border-4 border-purple-200">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-50"></div>
              <div className="absolute top-2 left-2 w-1 h-1 bg-pink-300 rounded-full opacity-70"></div>
              <div className="absolute bottom-1 right-2 w-1 h-1 bg-violet-200 rounded-full opacity-70"></div>

              <CardContent className="relative p-4 text-center">
                <div className="relative">
                  <Trophy className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                </div>
                <div className="text-xl font-bold text-white mb-1 drop-shadow-md">
                  {summary?.averageQuizScore || 0}%
                </div>
                <p className="text-white/90 font-medium text-sm drop-shadow-sm">Avg. Score</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Daily Activity Row */}
        <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-emerald-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                Weekly Activity
              </h3>
              <Link to="/progress">
                <Button variant="outline" size="sm" className="text-emerald-700 border-emerald-300 hover:bg-emerald-100">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View more stats
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-7 gap-3">
              {dynamicDailyData.map((day, index) => (
                <div key={index} className="text-center">
                  <div
                    className={cn(
                      "w-full h-16 rounded-xl mb-2 flex items-center justify-center transition-all duration-300 border-2",
                      day.completed
                        ? "bg-gradient-to-t from-emerald-500 to-green-400 shadow-lg border-emerald-300"
                        : "bg-emerald-100 hover:bg-emerald-200 border-emerald-200",
                    )}
                    title={`${day.hours} hours studied`} // Added a title for accessibility
                  >
                    {day.completed && (
                      <CheckCircle className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-emerald-800">
                    {day.day}
                  </div>
                  <div className="text-xs text-emerald-600">{day.hours}h</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
