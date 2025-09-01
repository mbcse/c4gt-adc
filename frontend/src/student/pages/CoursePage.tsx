import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/student/components/ui/card";
import { Progress } from "@/student/components/ui/progress";
import { Loader2, BookOpen, ChevronLeft, CheckCircle, Clock, Play, RotateCcw, PlayCircle } from "lucide-react";
import DashboardLayout from "@/student/components/DashboardLayout";
import ErrorBoundary from "@/student/components/ErrorBoundary";
import { useApi } from "@/api/index";

export default function CoursePage() {
  const api = useApi();
  const { courseId } = useParams<{ courseId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [courseProgress, setCourseProgress] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      if (!courseId) return;
      setIsLoading(true);
      setError(null);
      try {
        const courseRes = await api.get(`/courses/${courseId}`);
        const { course: courseData, courseProgress: progressData } = courseRes.data;
        
        setCourse(courseData);
        setCourseProgress(progressData);
        
        const courseVideos = Array.isArray(courseData?.courseVideos) ? courseData.courseVideos : [];
        const videoList = courseVideos.map(cv => ({
          ...cv.video,
          order: cv.order,
          progress: cv.video.progress || {}
        }));
        setVideos(videoList);
      } catch (err: any) {
        setError(err.message || "Failed to load course");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourse();
  }, [api, courseId]);

  // Helper function to determine video status
  const getVideoStatus = (progress: any) => {
    if (progress?.isCompleted) return 'completed';
    if (progress?.watchedPercentage > 0) return 'in-progress';
    return 'not-started';
  };

  // Helper function to get button config
  const getButtonConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          text: 'Watch Again',
          icon: RotateCcw,
          className: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
        };
      case 'in-progress':
        return {
          text: 'Resume',
          icon: PlayCircle,
          className: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700'
        };
      default:
        return {
          text: 'Start Lesson',
          icon: Play,
          className: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
        };
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
          <div className="text-center">
            <Loader2 className="h-12 w-12 md:h-16 md:w-16 animate-spin text-violet-600 mx-auto mb-6" />
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">Loading course details...</h3>
            <p className="text-slate-600">Get ready for an amazing learning experience! ✨</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !course) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
          <div className="text-center p-8">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-3xl md:text-4xl">⚠️</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-3">{error || "Course not found"}</h3>
            <p className="text-slate-600 text-base md:text-lg">Please check the course URL or try again later.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ErrorBoundary>
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-100/20 via-purple-100/30 to-teal-100/20 animate-pulse pointer-events-none"></div>
          <div className="absolute top-10 right-10 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="absolute top-32 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-32 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-10 w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
          <div className="relative z-10 p-4 md:p-6 lg:p-8">
            {/* Breadcrumb & Back */}
            <div className="mb-6 md:mb-8 flex items-center flex-wrap gap-2 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-xl border border-violet-200">
              <Link
                to="/courses"
                className="hover:text-violet-600 flex items-center gap-2 font-medium transition-colors duration-200"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-violet-600" />
                <span className="text-slate-700 text-sm md:text-base">Courses</span>
              </Link>
              <span className="text-violet-300 text-lg md:text-xl"> › </span>
              <span className="font-bold text-slate-900 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent truncate text-sm md:text-base">
                {course.title}
              </span>
            </div>

            {/* Course Header with Enhanced Progress */}
            <Card className="mb-6 md:mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/10 to-teal-500/5"></div>
              <CardHeader className="relative p-4 md:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 md:gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                        <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent leading-tight">
                        {course.title}
                      </CardTitle>
                    </div>
                    <div className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">{course.description}</div>
                  </div>
                  
                  {/* Enhanced Progress Card */}
                  <div className="w-full lg:w-auto lg:min-w-[320px] bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-violet-200">
                    <div className="text-center mb-4">
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1">
                        {courseProgress?.completionPercentage?.toFixed(1) || 0}%
                      </div>
                      <div className="text-slate-600 font-medium">Course Progress</div>
                    </div>
                    <div className="relative mb-4">
                      <Progress value={courseProgress?.completionPercentage || 0} className="h-3 md:h-4 rounded-full bg-slate-200 shadow-inner" />
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${courseProgress?.completionPercentage || 0}%` }}
                      />
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-slate-600">
                        <span>Completed:</span>
                        <span className="font-semibold">{courseProgress?.completedVideos || 0} / {courseProgress?.totalVideos || 0}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Total Watch Time:</span>
                        <span className="font-semibold">{Math.floor((courseProgress?.totalWatchTime || 0) / 60)} min</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Avg Progress:</span>
                        <span className="font-semibold">{courseProgress?.averageProgress?.toFixed(1) || 0}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Enhanced Video List */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-blue-500/10 to-violet-500/5"></div>
              <CardHeader className="relative p-4 md:p-6 lg:p-8 border-b border-violet-100">
                <CardTitle className="flex items-center gap-3 md:gap-4 text-xl md:text-2xl">
                  <div className="p-3 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                    <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                    Course Lessons
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative p-4 md:p-6 lg:p-8">
                {videos.length === 0 && (
                  <div className="text-center py-12 md:py-16">
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center shadow-xl">
                      <BookOpen className="h-10 w-10 md:h-12 md:w-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-700 mb-2">No lessons available yet</h3>
                    <p className="text-slate-500">This course is being prepared. Check back soon!</p>
                  </div>
                )}
                <div className="space-y-4">
                  {videos.map((video, idx) => {
                    const status = getVideoStatus(video.progress);
                    const buttonConfig = getButtonConfig(status);
                    const ButtonIcon = buttonConfig.icon;
                    const progressValue = video.progress?.watchedPercentage || 0;

                    return (
                      <div
                        key={video.id}
                        className="group bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-violet-100 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <div
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ${
                                  status === 'completed'
                                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                                    : status === 'in-progress'
                                    ? "bg-gradient-to-r from-amber-500 to-orange-600"
                                    : "bg-gradient-to-r from-indigo-500 to-purple-600"
                                }`}
                              >
                                {status === 'completed' ? (
                                  <CheckCircle className="h-6 w-6" />
                                ) : (
                                  <span className="text-lg">{idx + 1}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base md:text-lg font-bold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate">
                                {video.title}
                              </h4>
                              <Progress value={progressValue} className="h-2 rounded-full mt-2" />
                              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                {status === 'in-progress' && <span>{progressValue.toFixed(0)}% watched</span>}
                                {status === 'completed' && <span>Completed</span>}
                                {status === 'not-started' && <span>Not started</span>}
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{Math.round(video.duration / 60)} min</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 w-full md:w-auto">
                            <Link to={`/courses/${courseId}/video/${video.id}`}>
                              <button
                                className={`w-full justify-center px-4 py-2.5 md:px-6 md:py-3 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group-hover:scale-105 ${buttonConfig.className}`}
                              >
                                <ButtonIcon className="h-5 w-5" />
                                <span>{buttonConfig.text}</span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
}