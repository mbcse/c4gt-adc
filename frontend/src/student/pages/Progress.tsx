import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/student/components/ui/card";
import { Progress } from "@/student/components/ui/progress";
import {
  BookOpen,
  Trophy,
  TrendingUp,
  Brain,
  Clock,
  Target,
  Calendar,
  Award,
  BarChart3,
  Star,
  Zap,
  Activity,
  Timer,
  Medal,
  Flame,
  Users,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  
} from "lucide-react";
import { cn } from "@/student/lib/utils";
import DashboardLayout from "@/student/components/DashboardLayout";

export default function ProgressPage() {
  const [activeTimeframe, setActiveTimeframe] = useState<"weekly" | "monthly" | "yearly">("weekly");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data for different timeframes
  const weeklyData = [
    { period: "Mon", studyTime: 2.5, quizTime: 0.5, lessons: 3 },
    { period: "Tue", studyTime: 1.8, quizTime: 0.7, lessons: 2 },
    { period: "Wed", studyTime: 2.2, quizTime: 0.3, lessons: 3 },
    { period: "Thu", studyTime: 1.5, quizTime: 1.0, lessons: 1 },
    { period: "Fri", studyTime: 2.8, quizTime: 0.2, lessons: 4 },
    { period: "Sat", studyTime: 1.7, quizTime: 0.8, lessons: 2 },
    { period: "Sun", studyTime: 0.5, quizTime: 0.0, lessons: 0 },
  ];

  const monthlyData = [
    { period: "Week 1", studyTime: 12.3, quizTime: 3.2, lessons: 15 },
    { period: "Week 2", studyTime: 15.7, quizTime: 2.8, lessons: 18 },
    { period: "Week 3", studyTime: 18.2, quizTime: 4.1, lessons: 22 },
    { period: "Week 4", studyTime: 14.8, quizTime: 3.5, lessons: 17 },
  ];

  const yearlyData = [
    { period: "Jan", studyTime: 45.2, quizTime: 12.3, lessons: 67 },
    { period: "Feb", studyTime: 52.1, quizTime: 15.7, lessons: 78 },
    { period: "Mar", studyTime: 38.9, quizTime: 11.2, lessons: 58 },
    { period: "Apr", studyTime: 47.6, quizTime: 14.8, lessons: 71 },
    { period: "May", studyTime: 55.3, quizTime: 16.9, lessons: 82 },
    { period: "Jun", studyTime: 41.7, quizTime: 13.1, lessons: 62 },
  ];

  const currentData = activeTimeframe === "weekly" ? weeklyData : 
                     activeTimeframe === "monthly" ? monthlyData : yearlyData;

  const maxStudyTime = Math.max(...currentData.map(item => item.studyTime));

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        {/* Clean Growth Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 via-teal-50 to-green-50"></div>

        <div className="relative z-10 space-y-6 p-6">
        {/* Growth-Focused Progress Header */}
        <div className="text-center py-8 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            🌱 Your Growth Path
          </h1>
          <p className="text-lg text-green-700 mb-4 font-medium">
            Every click counts • Every skill grows • Every step builds!
          </p>

        </div>
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 shadow-xl border-4 border-blue-200">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
              <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">133.4h</div>
              <p className="text-white/90 font-medium text-sm drop-shadow-sm">Total Study Time</p>
              <div className="flex items-center justify-center mt-1">
                <ArrowUp className="h-3 w-3 text-green-300 mr-1" />
                <span className="text-xs text-white/80">+12% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-400 via-emerald-400 to-lime-500 shadow-xl border-4 border-green-200">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
              <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">127</div>
              <p className="text-white/90 font-medium text-sm drop-shadow-sm">Knowledge Seeds 🌿</p>
              <div className="flex items-center justify-center mt-1">
                <ArrowUp className="h-3 w-3 text-green-300 mr-1" />
                <span className="text-xs text-white/80">+8% growth</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-400 via-yellow-400 to-amber-500 shadow-xl border-4 border-orange-200">
            <CardContent className="p-4 text-center">
              <Flame className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
              <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">14</div>
              <p className="text-white/90 font-medium text-sm drop-shadow-sm">Day Streak</p>
              <div className="flex items-center justify-center mt-1">
                <ArrowUp className="h-3 w-3 text-green-300 mr-1" />
                <span className="text-xs text-white/80">Personal best!</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-400 via-rose-400 to-red-500 shadow-xl border-4 border-pink-200">
            <CardContent className="p-4 text-center">
              <Brain className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
              <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">87.3%</div>
              <p className="text-white/90 font-medium text-sm drop-shadow-sm">Avg Performance</p>
              <div className="flex items-center justify-center mt-1">
                <ArrowUp className="h-3 w-3 text-green-300 mr-1" />
                <span className="text-xs text-white/80">+3.2% improved</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Activity Chart */}
        <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-xl font-bold text-slate-800">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Learning Activity Trends
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Study time and learning patterns over time
                </CardDescription>
              </div>
              <div className="flex space-x-1 bg-white rounded-lg p-1 border border-gray-200">
                {(["weekly", "monthly", "yearly"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setActiveTimeframe(period)}
                    className={cn(
                      "px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize",
                      activeTimeframe === period
                        ? "bg-blue-500 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Legend */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded mr-2"></div>
                  <span>Study Time (hours)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded mr-2"></div>
                  <span>Quiz Time (hours)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded mr-2"></div>
                  <span>Lessons Completed</span>
                </div>
              </div>

              {/* Chart */}
              <div className="grid gap-4" style={{gridTemplateColumns: `repeat(${currentData.length}, 1fr)`}}>
                {currentData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    {/* Study Time Bar */}
                    <div className="w-full max-w-16 space-y-1">
                      <div className="h-32 bg-gray-100 rounded-lg relative overflow-hidden">
                        <div 
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-500 to-indigo-400 rounded-lg transition-all duration-500"
                          style={{ height: `${(item.studyTime / maxStudyTime) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-bold text-center text-blue-600">
                        {item.studyTime}h
                      </div>
                    </div>

                    {/* Quiz Time Bar */}
                    <div className="w-full max-w-16">
                      <div className="h-16 bg-gray-100 rounded-lg relative overflow-hidden">
                        <div 
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-purple-500 to-pink-400 rounded-lg transition-all duration-500"
                          style={{ height: `${(item.quizTime / (maxStudyTime * 0.5)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-bold text-center text-purple-600 mt-1">
                        {item.quizTime}h
                      </div>
                    </div>

                    {/* Lessons Count */}
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {item.lessons}
                      </div>
                      <div className="text-xs text-emerald-600 font-medium mt-1">lessons</div>
                    </div>

                    {/* Period Label */}
                    <div className="text-xs font-medium text-gray-600 text-center">
                      {item.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Learning Efficiency */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-bold text-indigo-900">
                <Zap className="h-5 w-5 mr-2 text-indigo-600" />
                Learning Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-700">Avg Time per Lesson</span>
                <span className="font-bold text-indigo-900">1.05h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-700">Completion Rate</span>
                <span className="font-bold text-indigo-900 flex items-center">
                  94.2%
                  <ArrowUp className="h-3 w-3 text-green-600 ml-1" />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-700">Focus Score</span>
                <span className="font-bold text-indigo-900">8.7/10</span>
              </div>
              <Progress value={87} className="h-2" />
              <div className="text-xs text-indigo-600 text-center">Above average efficiency</div>
            </CardContent>
          </Card>

          {/* Quiz Analytics */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-bold text-purple-900">
                <Target className="h-5 w-5 mr-2 text-purple-600" />
                Quiz Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-700">Total Quizzes</span>
                <span className="font-bold text-purple-900">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-700">Perfect Scores</span>
                <span className="font-bold text-purple-900 flex items-center">
                  8
                  <Star className="h-3 w-3 text-yellow-500 ml-1" />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-700">Improvement</span>
                <span className="font-bold text-purple-900 flex items-center">
                  +15.3%
                  <ArrowUp className="h-3 w-3 text-green-600 ml-1" />
                </span>
              </div>
              <Progress value={87} className="h-2" />
              <div className="text-xs text-purple-600 text-center">Strong quiz performance</div>
            </CardContent>
          </Card>

          {/* Study Habits */}
          <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-bold text-emerald-900">
                <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                Study Habits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-700">Peak Study Time</span>
                <span className="font-bold text-emerald-900">7-9 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-700">Weekly Goal</span>
                <span className="font-bold text-emerald-900 flex items-center">
                  127%
                  <Trophy className="h-3 w-3 text-yellow-500 ml-1" />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-700">Consistency</span>
                <span className="font-bold text-emerald-900">9.1/10</span>
              </div>
              <Progress value={91} className="h-2" />
              <div className="text-xs text-emerald-600 text-center">Excellent consistency</div>
            </CardContent>
          </Card>
        </div>

        {/* Goals & Achievements Summary */}
        <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-2 border-yellow-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold text-orange-900">
              <Award className="h-6 w-6 mr-2 text-orange-600" />
              Goals & Milestones
            </CardTitle>
            <CardDescription className="text-orange-700">
              Track your learning objectives and celebrate achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-yellow-200 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-green-700">2/3</div>
                <p className="text-sm text-green-600">Courses Completed</p>
                <div className="mt-2">
                  <Progress value={67} className="h-2" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-yellow-200 text-center">
                <Timer className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-blue-700">133/120</div>
                <p className="text-sm text-blue-600">Hours Goal</p>
                <div className="mt-2">
                  <Progress value={100} className="h-2" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-yellow-200 text-center">
                <Medal className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-purple-700">6/10</div>
                <p className="text-sm text-purple-600">Badges Earned</p>
                <div className="mt-2">
                  <Progress value={60} className="h-2" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-yellow-200 text-center">
                <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-emerald-700">87%</div>
                <p className="text-sm text-emerald-600">Score Target</p>
                <div className="mt-2">
                  <Progress value={87} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
