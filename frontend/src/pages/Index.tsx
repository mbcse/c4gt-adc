import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

import { useEffect, useState } from "react";
import { courseAPI } from "../services/api";

export default function Index() {
  const [assignedCourses, setAssignedCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopCourses() {
      try {
        setLoading(true);
        const courses = await courseAPI.getAllCourses();

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
              "📚"
            ),
            instructor: course.creatorName || course.createdBy || "Unknown",
            // You can customize timeLeft if you have watch-time tracking
            timeLeft: "N/A",
          }));

        setAssignedCourses(top3);
      } catch (error) {
        console.error("Failed to fetch courses for dashboard", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopCourses();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center p-6">
          <span className="text-gray-600 text-lg">Loading courses...</span>
        </div>
      </DashboardLayout>
    );
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

  const weeklyProgress = {
    currentStreak: 7,
    hoursThisWeek: 12.5,
    lessonsCompleted: 15,
    target: 20,
    dailyData: [
      { day: "Mon", hours: 2.5, completed: true },
      { day: "Tue", hours: 1.8, completed: true },
      { day: "Wed", hours: 2.2, completed: true },
      { day: "Thu", hours: 1.5, completed: true },
      { day: "Fri", hours: 2.8, completed: true },
      { day: "Sat", hours: 1.7, completed: true },
      { day: "Sun", hours: 0, completed: false },
    ],
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard Header - Fixed with proper spacing */}
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
            Step in • Power up • Rise high! 🚀
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
                    Hello, Rohan! 
                  </span>
                  <span className="text-4xl font-bold mb-2">👋</span>
                  <p className="text-xl text-slate-600 mb-6">
                    Ready to unlock new skills today? You're on fire! 🔥
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
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.99 5.16-.25 9-4.44 9-9.99V7l-10-5z"/>
                      <path d="M12 8.5L8.5 12L12 15.5L15.5 12L12 8.5z" fill="white"/>
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                    ⚡
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
                  className={`bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:border-teal-200`}
                >
                  <CardContent className="p-0">
                    {/* Course Thumbnail */}
                    <div className="relative w-full h-40 rounded-t-xl overflow-hidden">
                      {typeof course.image === "string" ? (
                        <div className="text-6xl flex items-center justify-center h-full">
                          {course.image}
                        </div>
                      ) : (
                        course.image
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-3 right-3">
                        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                          {course.progress}% Complete
                        </div>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-teal-700 transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {course.instructor}
                        </p>
                      </div>

                      {/* Progress Section */}
                      <div className="space-y-3 mb-4">
                        <Progress
                          value={course.progress}
                          className={`h-2 rounded-md ${
                            course.progress === 0 ? "bg-gray-200" : "bg-teal-500"
                          }`}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {course.completedLessons}/{course.totalLessons} lessons
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.timeLeft}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg transition-all duration-300 py-2.5 flex items-center justify-center gap-2">
                        <Play className="h-4 w-4" />
                        Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

          {/* Side Panel - Weekly Progress */}
          <div className="space-y-4">
            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 shadow-xl border-4 border-blue-200">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-300 rounded-full animate-ping"></div>
              <div className="absolute top-2 right-4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-blue-200 rounded-full animate-bounce"></div>
              <div className="absolute top-3 left-3 w-1 h-1 bg-cyan-200 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-1 left-1 w-1 h-1 bg-blue-300 rounded-full animate-bounce"></div>
              <div className="absolute bottom-1 right-5 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
              <CardContent className="relative p-4 text-center">
                <div className="relative">
                  <Flame className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-300 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="text-xl font-bold text-white mb-1 drop-shadow-md">
                  {weeklyProgress.currentStreak}
                </div>
                <p className="text-white/90 font-medium text-sm drop-shadow-sm">Day Streak!</p>
                <p className="text-xs text-white/80 mt-1">Keep it up! 🔥</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 shadow-xl border-4 border-teal-200">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulse"></div>
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-3 right-2 w-1 h-1 bg-cyan-200 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-teal-200 rounded-full animate-bounce"></div>
              <div className="absolute bottom-3 left-3 w-1 h-1 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-2 left-4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 right-4 w-1 h-1 bg-teal-300 rounded-full animate-bounce"></div>
              <div className="absolute top-4 right-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
              <CardContent className="relative p-4 text-center">
                <div className="relative">
                  <Clock className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-cyan-200 rounded-full animate-ping"></div>
                  <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="text-xl font-bold text-white mb-1 drop-shadow-md">
                  {weeklyProgress.hoursThisWeek}h
                </div>
                <p className="text-white/90 font-medium text-sm drop-shadow-sm">This Week</p>
                <Progress
                  value={(weeklyProgress.lessonsCompleted / weeklyProgress.target) * 100}
                  className="mt-2 h-2 bg-white/20"
                />
                <p className="text-xs text-white/80 mt-2">
                  {weeklyProgress.lessonsCompleted}/{weeklyProgress.target} lessons
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-purple-400 via-violet-400 to-indigo-500 shadow-xl border-4 border-purple-200">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulse"></div>
              <div className="absolute top-2 left-2 w-1 h-1 bg-pink-300 rounded-full animate-ping"></div>
              <div className="absolute top-1 right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-3 left-1 w-2 h-2 bg-purple-200 rounded-full animate-bounce"></div>
              <div className="absolute bottom-1 right-2 w-1 h-1 bg-violet-200 rounded-full animate-ping"></div>
              <div className="absolute top-4 left-4 w-1 h-1 bg-white rounded-full animate-bounce"></div>
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-pink-200 rounded-full animate-pulse"></div>
              <div className="absolute top-1 left-5 w-1 h-1 bg-violet-300 rounded-full animate-ping"></div>
              <div className="absolute bottom-2 left-4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              <CardContent className="relative p-4 text-center">
                <div className="relative">
                  <Trophy className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                  <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-white rounded-full animate-bounce"></div>
                </div>
                <div className="text-xl font-bold text-white mb-1 drop-shadow-md">
                  92%
                </div>
                <p className="text-white/90 font-medium text-sm drop-shadow-sm">Overall Score</p>
                <p className="text-xs text-white/80 mt-1">Excellent! 🏆</p>
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
              {weeklyProgress.dailyData.map((day, index) => (
                <div key={index} className="text-center">
                  <div
                    className={cn(
                      "w-full h-16 rounded-xl mb-2 flex items-center justify-center transition-all duration-300 border-2",
                      day.completed
                        ? "bg-gradient-to-t from-emerald-500 to-green-400 shadow-lg border-emerald-300"
                        : "bg-emerald-100 hover:bg-emerald-200 border-emerald-200",
                    )}
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
