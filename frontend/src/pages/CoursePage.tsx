import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { videoAPI, Video } from "../services/api";
import { Loader2, Play, CheckCircle, Clock, BookOpen, ChevronLeft } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import api from "../services/api";

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        setIsLoading(true);

        // Example API - replace with your own
        const courseRes = await api.get(`/api/courses/${courseId}`);
      const courseData = courseRes.data;
      setCourse(courseData.course); // or setCourse(courseData) if shape matches

        // The videoAPI is already configured
        const videosData = await videoAPI.getCourseVideos(Number(courseId));
        setVideos(videosData);
      } catch (e: any) {
        setError(e.message || "Failed to load course");
      } finally {
        setIsLoading(false);
      }
    }
    if (courseId) fetchCourse();
  }, [courseId]);

  const numCompleted = videos.filter((v) => v.progress.isCompleted).length;
  const progress = videos.length ? Math.round((numCompleted / videos.length) * 100) : 0;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="text-center">
            <div className="relative mb-6">
              <Loader2 className="h-16 w-16 animate-spin text-violet-600 mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Loading course details...</h3>
            <p className="text-slate-600">Get ready for an amazing learning experience! ✨</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !course) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="text-center p-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">{error || "Course not found"}</h3>
            <p className="text-slate-600 text-lg">Please check the course URL or try again later.</p>
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
          <div className="relative z-10 p-6">
          {/* Breadcrumb & Back */}
          <div className="mb-8 flex items-center gap-3 text-base bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border border-violet-200">
            <Link to="/courses" className="hover:text-violet-600 flex items-center gap-2 font-medium transition-colors duration-200">
              <ChevronLeft className="h-6 w-6 text-violet-600" />
              <span className="text-slate-700">Courses</span>
            </Link>
            <span className="text-violet-300 text-xl"> › </span>
            <span className="font-bold text-slate-900 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent truncate max-w-md">{course.title}</span>
          </div>

          {/* Course Header */}
          <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/10 to-teal-500/5"></div>
            <CardHeader className="relative p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent leading-tight">{course.title}</CardTitle>
                  </div>
                  <div className="text-slate-600 text-lg leading-relaxed max-w-2xl">{course.description}</div>
                </div>
                <div className="lg:min-w-[320px] bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-violet-200">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1">{progress}%</div>
                    <div className="text-slate-600 font-medium">Course Progress</div>
                  </div>
                  <div className="relative mb-4">
                    <Progress value={progress} className="h-4 rounded-full bg-slate-200 shadow-inner" />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="text-sm text-slate-500 text-center">{numCompleted} of {videos.length} lessons completed</div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Video/Lesson List */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-blue-500/10 to-violet-500/5"></div>
            <CardHeader className="relative p-8 border-b border-violet-100">
              <CardTitle className="flex items-center gap-4 text-2xl">
                <div className="p-3 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">Course Lessons</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative p-8">
              {videos.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center shadow-xl">
                    <BookOpen className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">No lessons available yet</h3>
                  <p className="text-slate-500">This course is being prepared. Check back soon!</p>
                </div>
              )}
              <div className="space-y-4">
                {videos.map((video, idx) => (
                  <div key={video.id} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-100 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ${
                            video.progress.isCompleted
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                              : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                          }`}>
                            {video.progress.isCompleted ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <span className="text-lg">{idx + 1}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate">{video.title}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Clock className="h-4 w-4 text-violet-400" />
                              <span className="font-medium">{Math.round(video.duration / 60)} min</span>
                            </div>
                            {video.progress.isCompleted && (
                              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                                <CheckCircle className="h-4 w-4" />
                                <span>Completed</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <Link to={`/courses/${courseId}/video/${video.id}`}>
                          <button className={`px-6 py-3 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group-hover:scale-105 ${
                            video.progress.isCompleted
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
                          }`}>
                            <Play className="h-5 w-5" />
                            <span>{video.progress.isCompleted ? "Review" : "Start Lesson"}</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
}
