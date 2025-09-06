import React, { useEffect, useState, useReducer, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/student/components/ui/card";
import {
  BookOpen, Trophy, TrendingUp, Brain, Clock, Target, Calendar, Award, BarChart3,
  Star, Zap, Flame, CheckCircle, ArrowUp, Loader2, Activity, GraduationCap,
  TrendingDown, Minus, Medal,
} from "lucide-react";
import { cn } from "@/student/lib/utils";
import DashboardLayout from "@/student/components/DashboardLayout";
import { useStudentAnalytics } from "@/student/hooks/useStudentAnalytics";
import CourseProgressChart from "@/student/components/charts/CourseProgressChart";
import ActivityHeatmap from "@/student/components/charts/ActivityHeatmap";
import QuizScoresChart from "@/student/components/charts/QuizScoresChart";
import StudyTimeChart from "@/student/components/charts/StudyTimeChart";
import LessonCompletionChart from "@/student/components/charts/LessonCompletionChart";
import QuizPerformanceChart from "@/student/components/charts/QuizPerformanceChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/student/components/ui/tabs";
import { Link } from "react-router-dom";

// Constants for String Literals
const TIMEFRAMES = {
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

const QUIZ_CHART_TYPES = {
  SCORES: "scores",
  PERFORMANCE: "performance",
};

// Centralized State Management for Filters
const initialFilterState = {
  studyTimeTimeframe: TIMEFRAMES.WEEKLY,
  lessonTimeframe: TIMEFRAMES.WEEKLY,
  activeQuizChart: QUIZ_CHART_TYPES.SCORES,
  selectedQuizCourseId: null,
};

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_STUDY_TIMEFRAME':
      return { ...state, studyTimeTimeframe: action.payload };
    case 'SET_LESSON_TIMEFRAME':
      return { ...state, lessonTimeframe: action.payload };
    case 'SET_ACTIVE_QUIZ_CHART':
      return { ...state, activeQuizChart: action.payload };
    case 'SET_QUIZ_COURSE_ID':
      return { ...state, selectedQuizCourseId: action.payload };
    default:
      throw new Error();
  }
}

const getSnapshotMessage = (summary) => {
  const hours = summary?.studyTimeThisWeek || 0;
  const lessons = summary?.lessonsCompletedThisWeek || 0;
  const streak = summary?.currentStreak || 0;

  let openingPhrase;
  if (hours >= 10) {
    openingPhrase = "Incredible effort this week! 🚀";
  } else if (hours >= 5) {
    openingPhrase = "Fantastic work this week!";
  } else if (hours > 0) {
    openingPhrase = "Good start to the week!";
  } else {
    openingPhrase = "Ready to kick off your learning week?";
  }

  // If there's no activity, show a simpler message
  if (hours === 0 && lessons === 0) {
    return (
      <p className="text-gray-700 text-lg leading-relaxed flex-1">
        {openingPhrase} Your current streak is <strong className="font-bold text-emerald-600">{streak} days</strong>.
      </p>
    );
  }

  // If there is activity, show the full stats
  return (
    <p className="text-gray-700 text-lg leading-relaxed flex-1">
      {openingPhrase} You've studied for <strong className="font-bold text-emerald-600">{hours} hours</strong> and completed <strong className="font-bold text-emerald-600">{lessons} lessons</strong>. Your current streak is now <strong className="font-bold text-emerald-600">{streak} days</strong>!
    </p>
  );
};

const DayOfWeekChart = ({ data = [] }: { data?: number[] }) => {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxValue = Math.max(...data, 1);

  const totalActivity = data.reduce((sum, value) => sum + value, 0);

  return (
    <div className="w-full">
      <div className="relative flex justify-between items-end h-32 space-x-2 border-b-2 border-gray-200">

        {totalActivity === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
              No activity to display.
            </p>
          </div>
        ) : (
          labels.map((label, index) => {
            const value = data[index] || 0;
            const height = `${(value / maxValue) * 100}%`;
            return (
              <div key={label} className="flex-1 h-full flex flex-col items-center justify-end" title={`${label}: ${value} hours`}>
                <div
                  className="w-full bg-blue-300 rounded-t-sm hover:bg-blue-400 transition-colors"
                  style={{ height: height, minHeight: height === '0%' ? '0px' : '2px' }}
                />
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-between items-start mt-1 space-x-2">
        {labels.map((label) => (
          <div key={label} className="flex-1 text-center">
            <p className="text-xs text-blue-800">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const RadialProgress = ({ value = 0, size = 60, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute" width={size} height={size}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-indigo-600"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="text-sm font-bold text-indigo-900">{`${Math.round(value)}%`}</span>
    </div>
  );
};

const ScoreDistributionChart = ({ data }: { data?: Record<string, number> }) => {
  if (!data) {
    return <p className="text-xs text-purple-600 text-center">Loading score data...</p>;
  }

  const ranges = ["90-100", "80-89", "70-79", "60-69", "Below 60"];
  const totalScores = Object.values(data).reduce((sum, val) => sum + (val || 0), 0);

  return (
    <div className="w-full pt-2">
      <div className="relative flex justify-between items-end h-24 space-x-2 border-b-2 border-gray-200">

        {totalScores === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
              No quiz scores to display.
            </p>
          </div>
        ) : (
          ranges.map(range => {
            const count = data[range] || 0;
            const height = `${(count / totalScores) * 100}%`;

            return (
              <div key={range} className="flex-1 h-full flex flex-col items-center justify-end" title={`${count} attempts in this range`}>
                <div
                  className="w-full bg-purple-300 rounded-t-sm hover:bg-purple-400 transition-all duration-300"
                  style={{ height: height, minHeight: height === '0%' ? '0px' : '2px' }}
                />
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-between items-start mt-1 space-x-2">
        {ranges.map(range => (
          <div key={range} className="flex-1 text-center">
            <p className="text-xs text-purple-700">{range}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProgressPage() {
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);

  const {
    summary,
    quizAnalytics,
    activityCalendar,
    detailedQuizPerformance,
    studyTimePatterns,
    lessonCompletionPatterns,
    availableCourses,
    peakStudyHours,
    courseSpecificQuizAnalytics,
    loading,
    error,
    fetchStudyTimePatterns,
    fetchLessonCompletionPatterns,
    fetchCourseSpecificQuizAnalytics,
    fetchDetailedQuizPerformance,
  } = useStudentAnalytics();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchStudyTimePatterns(filters.studyTimeTimeframe);
  }, [filters.studyTimeTimeframe, fetchStudyTimePatterns]);

  useEffect(() => {
    fetchLessonCompletionPatterns(filters.lessonTimeframe);
  }, [filters.lessonTimeframe, fetchLessonCompletionPatterns]);

  useEffect(() => {
    fetchCourseSpecificQuizAnalytics(filters.selectedQuizCourseId || undefined);
  }, [filters.selectedQuizCourseId, fetchCourseSpecificQuizAnalytics]);

  useEffect(() => {
    fetchDetailedQuizPerformance(filters.selectedQuizCourseId || undefined);
  }, [filters.selectedQuizCourseId, fetchDetailedQuizPerformance]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-emerald-500 mx-auto mb-4" />
            <p className="text-lg text-emerald-700">Loading your growth path...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen bg-red-50">
          <p className="text-lg text-red-600">Error loading data: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="relative z-10 space-y-6 p-4 md:p-6">
          <div className="text-center py-8 mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              🌱 Your Growth Path
            </h1>
            <p className="text-lg text-green-700 mb-4 font-medium">
              Every click counts • Every skill grows • Every step builds!
            </p>
          </div>

          {/* --- At a Glance Snapshot --- */}
          <Card className="bg-white border-l-4 border-emerald-500 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-emerald-800">
                <Zap className="h-6 w-6 mr-3" />
                Your Weekly Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">

              {getSnapshotMessage(summary)}

              {summary?.nextLesson?.courseTitle && (
                <div className="text-center md:text-right flex-shrink-0">
                  <p className="text-sm text-gray-500 mb-2">Keep the momentum going:</p>
                  <Link to={`/courses/${summary.nextLesson.id}`}>
                    <button className="w-full md:w-auto bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors">
                      Continue '{summary.nextLesson.courseTitle}'
                    </button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 shadow-xl border-4 border-blue-200">
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">{summary?.totalStudyTime || 0}h</div>
                <p className="text-white/90 font-medium text-sm drop-shadow-sm">Total Study Time</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-400 via-emerald-400 to-lime-500 shadow-xl border-4 border-green-200">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">{summary?.completedCourses || 0}</div>
                <p className="text-white/90 font-medium text-sm drop-shadow-sm">Courses completed</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-400 via-yellow-400 to-amber-500 shadow-xl border-4 border-orange-200">
              <CardContent className="p-4 text-center">
                <Flame className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">{summary?.currentStreak || 0}</div>
                <p className="text-white/90 font-medium text-sm drop-shadow-sm">Day Streak</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-pink-400 via-rose-400 to-red-500 shadow-xl border-4 border-pink-200">
              <CardContent className="p-4 text-center">
                <Brain className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">{summary?.averageQuizScore || 0}%</div>
                <p className="text-white/90 font-medium text-sm drop-shadow-sm">Avg Quiz Performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Video Progress + Quiz Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Progress Chart */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-green-900">
                  <GraduationCap className="h-6 w-6 mr-2 text-green-600" />
                  Video Progress by Course
                </CardTitle>
                <CardDescription className="text-green-700">
                  Select a course to see individual video completion status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CourseProgressChart />
              </CardContent>
            </Card>

            {/* Quiz & Assessment Analytics */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-200 shadow-xl">
              <CardHeader>
                <div className="flex flex-col space-y-3">
                  <div>
                    <CardTitle className="flex items-center text-xl font-bold text-purple-900">
                      <Target className="h-5 w-5 mr-2 text-purple-600" />
                      Quiz & Assessment Analytics
                    </CardTitle>
                    <CardDescription className="text-purple-700">Detailed breakdown of quiz performance</CardDescription>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-1">Course Filter</label>
                      <select
                        value={filters.selectedQuizCourseId || ''}
                        onChange={(e) => dispatch({ type: 'SET_QUIZ_COURSE_ID', payload: e.target.value ? Number(e.target.value) : null })}
                        className="w-full text-sm p-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 bg-white"
                      >
                        <option value="">All Courses</option>
                        {availableCourses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-1">View Type</label>
                      <div className="flex space-x-1 bg-white rounded-lg p-1 border border-purple-300">
                        <button
                          onClick={() => dispatch({ type: 'SET_ACTIVE_QUIZ_CHART', payload: QUIZ_CHART_TYPES.SCORES })}
                          className={cn(
                            "flex-1 px-3 py-1 text-sm font-medium rounded-md transition-colors",
                            filters.activeQuizChart === QUIZ_CHART_TYPES.SCORES ? 'bg-purple-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                          )}
                        >
                          Score Distribution
                        </button>
                        <button
                          onClick={() => dispatch({ type: 'SET_ACTIVE_QUIZ_CHART', payload: QUIZ_CHART_TYPES.PERFORMANCE })}
                          className={cn(
                            "flex-1 px-3 py-1 text-sm font-medium rounded-md transition-colors",
                            filters.activeQuizChart === QUIZ_CHART_TYPES.PERFORMANCE ? 'bg-purple-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                          )}
                        >
                          Performance Trend
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filters.activeQuizChart === 'scores' && detailedQuizPerformance && detailedQuizPerformance.length > 0 && (
                  <QuizScoresChart data={detailedQuizPerformance} type="bar" />
                )}
                {filters.activeQuizChart === 'performance' && courseSpecificQuizAnalytics?.performanceTrend && courseSpecificQuizAnalytics.performanceTrend.length > 0 && (
                  <QuizPerformanceChart data={courseSpecificQuizAnalytics.performanceTrend} />
                )}
                {((filters.activeQuizChart === 'scores' && (!detailedQuizPerformance || detailedQuizPerformance.length === 0)) ||
                  (filters.activeQuizChart === 'performance' && (!courseSpecificQuizAnalytics?.performanceTrend || courseSpecificQuizAnalytics.performanceTrend.length === 0))) && (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                      <div className="text-center">
                        <Brain className="h-8 w-8 mx-auto mb-2" />
                        <p className="font-medium">No quiz data available</p>
                        <p className="text-sm">
                          {filters.selectedQuizCourseId ? 'No quizzes found for selected course' : 'Start taking quizzes to track your performance!'}
                        </p>
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>

          {/* Study Time and Lesson Completion Charts */}
          <Card className="shadow-xl border-gray-200">
            <Tabs defaultValue="studyTime" className="w-full">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Learning Activity Trends</CardTitle>
                    <CardDescription className="text-slate-600">Toggle between your study time and lesson completion history.</CardDescription>
                  </div>
                  <TabsList className="grid w-full md:w-auto grid-cols-2 mt-4 md:mt-0">
                    <TabsTrigger value="studyTime"><Clock className="h-4 w-4 mr-2" />Study Time</TabsTrigger>
                    <TabsTrigger value="lessonCompletion"><CheckCircle className="h-4 w-4 mr-2" />Lessons Completed</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="studyTime">
                  <div className="flex justify-end mb-4">
                    <div className="flex space-x-1 bg-white rounded-lg p-1 border">
                      {Object.values(TIMEFRAMES).map(period => (
                        <button
                          key={period}
                          onClick={() => dispatch({ type: 'SET_STUDY_TIMEFRAME', payload: period })}
                          className={cn("px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize", filters.studyTimeTimeframe === period ? "bg-blue-500 text-white shadow-sm" : "text-gray-600 hover:text-gray-900")}
                        >{period}</button>
                      ))}
                    </div>
                  </div>
                  <StudyTimeChart data={studyTimePatterns} />
                </TabsContent>
                <TabsContent value="lessonCompletion">
                  <div className="flex justify-end mb-4">
                    <div className="flex space-x-1 bg-white rounded-lg p-1 border">
                      {Object.values(TIMEFRAMES).map(period => (
                        <button
                          key={period}
                          onClick={() => dispatch({ type: 'SET_LESSON_TIMEFRAME', payload: period })}
                          className={cn("px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize", filters.lessonTimeframe === period ? "bg-emerald-500 text-white shadow-sm" : "text-gray-600 hover:text-gray-900")}
                        >{period}</button>
                      ))}
                    </div>
                  </div>
                  <LessonCompletionChart data={lessonCompletionPatterns} />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>

          {/* Activity Calendar */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-blue-900">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Yearly Activity Overview
              </CardTitle>
              <CardDescription className="text-blue-700">
                Your learning footprint for {new Date().getFullYear()}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                style={{
                  overflowX: 'auto',
                  minWidth: '100%',
                }}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div style={{ minWidth: '600px' }}>
                  <ActivityHeatmap data={activityCalendar?.calendarData || []} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Yearly Summary */}
                <div className="p-4 rounded-lg bg-white/50 border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">Yearly Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800">Active Days:</span>
                      <span className="font-bold text-blue-900">{activityCalendar?.summary?.totalActiveDays || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Avg Daily Study Time:</span>
                      <span className="font-bold text-blue-900">
                        {parseFloat(
                          (
                            (activityCalendar?.summary?.totalStudyTimeYear || 0) /
                            (activityCalendar?.summary?.totalActiveDays || 1)
                          ).toFixed(2)
                        )} h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Courses Completed:</span>
                      <span className="font-bold text-blue-900">{activityCalendar?.summary?.totalLessonsYear || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Busiest Days */}
                <div className="p-4 rounded-lg bg-white/50 border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">Busiest Days of the Week</h4>
                  <DayOfWeekChart data={activityCalendar?.summary?.activityByDayOfWeek} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Cards*/}
          <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-2 border-slate-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-slate-900">
                <BarChart3 className="h-5 w-5 mr-2 text-slate-600" />
                Performance Insights
              </CardTitle>
              <CardDescription className="text-slate-700">A detailed summary of your efficiency, quiz scores, and habits.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">

              {/* Learning Efficiency with Radial Progress */}
              <div className="p-4 rounded-lg bg-indigo-50/50 border border-indigo-200 flex flex-col">
                <h3 className="font-bold text-indigo-900 flex items-center text-lg mb-4">
                  <Zap className="h-5 w-5 mr-2 text-indigo-600" />Learning Efficiency
                </h3>
                <div className="flex-grow flex flex-col justify-center items-center text-center space-y-4">
                  <RadialProgress value={summary?.completionRate || 0} />
                  <p className="font-bold text-indigo-900">{summary?.completedCourses || 0} of {summary?.enrolledCourses || 0} courses complete</p>
                  <p className="text-xs text-indigo-700">This is your completion rate across all enrolled courses.</p>
                </div>
              </div>

              {/* Quiz Performance with Score Distribution */}
              <div className="p-4 rounded-lg bg-purple-50/50 border border-purple-200 flex flex-col">
                <h3 className="font-bold text-purple-900 flex items-center text-lg mb-4">
                  <Target className="h-5 w-5 mr-2 text-purple-600" />Quiz Performance
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Average Score</span>
                    <span className="font-bold text-purple-900">{quizAnalytics?.averageScore || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Recent Improvement</span>
                    <span className={cn("font-bold flex items-center", (quizAnalytics?.improvementRate || 0) >= 0 ? "text-green-600" : "text-red-500")}>
                      {(quizAnalytics?.improvementRate || 0) >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {quizAnalytics?.improvementRate || 0}%
                    </span>
                  </div>
                </div>
                <div className="flex-grow mt-4">
                  <p className="text-sm font-medium text-purple-800 text-center mb-1">Score Distribution</p>
                  <ScoreDistributionChart data={quizAnalytics?.scoreDistribution} />
                </div>
              </div>

              {/* Study Habits */}
              <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200 flex flex-col">
                <h3 className="font-bold text-emerald-900 flex items-center text-lg mb-4">
                  <Calendar className="h-5 w-5 mr-2 text-emerald-600" />Study Habits
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700">Peak Study Hours</span>
                    <span className="font-bold text-emerald-900 flex items-center">{peakStudyHours || 'N/A'} <Clock className="h-3 w-3 text-emerald-600 ml-1" /></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700">Current Streak</span>
                    <span className="font-bold text-emerald-900 flex items-center">{summary?.currentStreak || 0} days <Flame className="h-3 w-3 text-orange-500 ml-1" /></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700">Longest Streak</span>
                    <span className="font-bold text-emerald-900 flex items-center">{summary?.longestStreak || 0} days <Trophy className="h-3 w-3 text-yellow-500 ml-1" /></span>
                  </div>
                </div>
                <div className="flex-grow mt-4 pt-4 border-t border-emerald-200 text-center flex items-center justify-center">
                  <p className="text-xs text-emerald-700 font-medium">
                    {(summary?.currentStreak || 0) > (summary?.longestStreak || 0)
                      ? "🎉 New record! You've set a new longest streak!"
                      : (summary?.currentStreak || 0) >= (summary?.longestStreak || 0) * 0.8 && (summary?.longestStreak || 0) > 0
                        ? `You're close to your record of ${summary.longestStreak} days. Keep it up!`
                        : "Consistency is key. Build up your streak one day at a time!"
                    }
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}