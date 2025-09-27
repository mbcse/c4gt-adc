import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/student/components/ui/button";
import { Progress } from "@/student/components/ui/progress";
import { Card, CardHeader, CardTitle } from "@/student/components/ui/card";
import { Loader2, AlertCircle, ChevronLeft, ChevronRight, Play, Pause, BookOpen, Clock } from "lucide-react";
import DashboardLayout from "@/student/components/DashboardLayout";
import ErrorBoundary from "@/student/components/ErrorBoundary";
import { videoAPI, Video } from "@/api/videoAPI";
import { VideoPlayer } from "@/student/components/VideoPlayer";

export default function VideoPage() {
  const { courseId, videoId } = useParams<{ courseId: string; videoId: string }>();
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const [liveProgress, setLiveProgress] = useState<{
    watchedPercentage: number;
    totalWatchTime: number;
    isCompleted?: boolean;
  }>({ 
    watchedPercentage: 0, 
    totalWatchTime: 0 
  });

  useEffect(() => {
    async function loadVideos() {
      if (!courseId) return;
      try {
        setIsLoading(true);
        setError(null);
        const { videos } = await videoAPI.getCourseVideos(Number(courseId));
        setVideos(Array.isArray(videos) ? videos : []);
        if (videoId) {
          const foundVideo = videos.find((v) => v.id.toString() === videoId);
          setCurrentVideo(foundVideo || videos[0] || null);
        }
      } catch (err) {
        setError("Failed to load videos");
      } finally {
        setIsLoading(false);
      }
    }
    loadVideos();
  }, [courseId, videoId]);

  // Simplified progress update handler
  const handleProgressUpdate = useCallback((progress: any) => {
    console.log('Progress update received:', progress); // Debug log
    setLiveProgress(progress);
  }, []);

  const formatTime = (seconds: number = 0) =>
     `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")} `;

  if (isLoading) {
    return (
      <ErrorBoundary>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="text-center">
              <Loader2 className="h-16 w-16 animate-spin text-violet-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Loading your lesson...</h3>
              <p className="text-slate-600">Get ready for an amazing learning experience! ✨</p>
            </div>
          </div>
        </DashboardLayout>
      </ErrorBoundary>
    );
  }

  if (error || !currentVideo) {
    return (
      <ErrorBoundary>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="text-center p-8">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-red-600 mb-3">{error || "No videos available"}</h3>
              <p className="text-slate-600 text-lg">Please check the lesson URL or try again later.</p>
            </div>
          </div>
        </DashboardLayout>
      </ErrorBoundary>
    );
  }

 const currentIndex = videos.findIndex((v) => v.id === currentVideo.id);
  const nextLesson = currentIndex >= 0 && currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? videos[currentIndex - 1] : null;

  const navigateToLesson = (lesson: Video | null) => {
    if (!lesson) return;
    navigate( `/courses/${courseId}/video/${lesson.id} `);
    setCurrentVideo(lesson);
    setIsPlaying(false);
  };

  return (
    <ErrorBoundary>
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
          <div className="relative z-10 p-6">
            {/* Breadcrumb  */}
            <nav className="mb-8 flex items-center gap-3 text-base">
              <Link to="/courses" className="hover:text-violet-600 flex items-center gap-2 font-medium">
                <BookOpen className="h-5 w-5 text-violet-600" />
                <span className="text-slate-700">Courses</span>
              </Link>
              <span className="text-violet-300 text-xl">›</span>
              <Link to={ `/courses/${courseId} `} className="hover:text-violet-600 font-medium text-slate-700 truncate max-w-xs">
                Course
              </Link>
              <span className="text-violet-300 text-xl">›</span>
              <span className="font-bold text-slate-900">{currentVideo.title}</span>
            </nav>

            {/* Video Info Card  */}
            <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0">
              <CardHeader className="relative p-8">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <Play className="h-8 w-8 text-white p-3 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-2xl" />
                      <CardTitle className="text-2xl font-bold">{currentVideo.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2">
                        <Clock className="h-5 w-5 text-violet-500" />
                        <span className="font-medium text-lg">{formatTime(currentVideo.duration)}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-pulse"></div>
                        <span className="font-medium">
                          Lesson {currentIndex + 1} of {videos.length}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      onClick={() => setIsPlaying((p) => !p)}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl flex items-center gap-3"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      <span>{isPlaying ? "Pause Video" : "Play Video"}</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

           {/* Video Player  */}
            <Card className="overflow-hidden shadow-2xl bg-white border-0 mb-8">
              <div className="relative bg-black aspect-video rounded-t-2xl">
                <VideoPlayer
                  videoUrl={currentVideo.videoUrl}
                  videoId={currentVideo.id}
                  duration={currentVideo.duration}
                  playing={isPlaying}
                  setIsPlaying={setIsPlaying}
                  seekPosition={currentVideo.progress?.totalWatchTime || 0}
                  onProgressUpdate={handleProgressUpdate}
                />
              </div>
              {/* Progress Section  */}
              <div className="p-6 bg-gradient-to-r from-violet-50 via-purple-50 to-teal-50 border-t">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-white p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl" />
                    <span className="text-lg font-bold text-slate-800">Lesson Progress</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.round(liveProgress.watchedPercentage)}%
                    </div>
                    <div className="text-sm text-slate-500 font-medium">Complete</div>
                  </div>
                </div>
                <div className="mb-4">
                  <Progress value={liveProgress.watchedPercentage} className="h-4 rounded-full bg-slate-200" />
                </div>
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>
                    Time: {formatTime(liveProgress.totalWatchTime)} / {formatTime(currentVideo.duration)}
                  </span>
                  <span>
                    {liveProgress.watchedPercentage >= 100 ? "✓ Completed!" : "Keep watching to complete this lesson"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Navigation Buttons  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button
                variant="outline"
                disabled={!prevLesson}
                onClick={() => navigateToLesson(prevLesson)}
                className="p-6 h-auto flex items-center justify-start gap-4 border-2 rounded-2xl"
              >
                <ChevronLeft className="h-6 w-6" />
                <div>
                  <div className="font-semibold text-lg">Previous Lesson</div>
                  {prevLesson && <div className="text-sm text-slate-600 truncate">{prevLesson.title}</div>}
                </div>
              </Button>
              <Button
                variant="outline"
                disabled={!nextLesson}
                onClick={() => navigateToLesson(nextLesson)}
                className="p-6 h-auto flex items-center justify-end gap-4 border-2 rounded-2xl"
              >
                <div>
                  <div className="font-semibold text-lg">Next Lesson</div>
                  {nextLesson && <div className="text-sm text-slate-600 truncate">{nextLesson.title}</div>}
                </div>
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
}
