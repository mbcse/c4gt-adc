import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/student/components/ui/button";
import { Progress } from "@/student/components/ui/progress";
import { Card, CardHeader, CardTitle } from "@/student/components/ui/card";
import { Loader2, AlertCircle, ChevronLeft, ChevronRight, Play, BookOpen, Clock } from "lucide-react";
import DashboardLayout from "@/student/components/DashboardLayout";
import ErrorBoundary from "@/student/components/ErrorBoundary";
import { videoAPI, Video } from "@/api/videoAPI";
import { VideoPlayer } from "@/student/components/VideoPlayer";
import { QuizModal } from "@/student/components/QuizModal";
import { quizAPI } from "@/api/quizAPI";
import { useApi } from "@/api/index";

export default function VideoPage() {
  const api = useApi();
  const { courseId, videoId } = useParams<{ courseId: string; videoId: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [quizUnlocked, setQuizUnlocked] = useState(false);
  const [isPollingForQuiz, setIsPollingForQuiz] = useState(false);
  const [videoProgress, setVideoProgress] = useState({
    totalWatchTime: 0,
    watchedPercentage: 0,
    isCompleted: false,
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

  useEffect(() => {
    if (!videoProgress.isCompleted || !currentVideo || quizUnlocked) return;
    setIsPollingForQuiz(true);
    let attempts = 0;
    const maxAttempts = 10;
    const pollForQuiz = async () => {
      attempts++;
      try {
        const quiz = await quizAPI.getQuizByVideoId(currentVideo.id, api);
        if (quiz) {
          setCurrentQuiz(quiz);
          setShowQuizModal(true);
          setQuizUnlocked(true);
          setIsPollingForQuiz(false);
          clearInterval(interval);
        }
      } catch (error) {
        if (attempts >= maxAttempts) {
          setIsPollingForQuiz(false);
          clearInterval(interval);
          console.warn("Quiz not unlocked within timeout period");
        }
      }
    };
    const interval = setInterval(pollForQuiz, 3000);
    pollForQuiz();
    return () => {
      clearInterval(interval);
      setIsPollingForQuiz(false);
    };
  }, [videoProgress.isCompleted, currentVideo?.id, quizUnlocked, api]);

  const handleQuizComplete = async (score: number, answers: any[]) => {
    try {
      if (currentQuiz) {
        await quizAPI.createQuizAttempt({
          quizId: currentQuiz.id,
          answers,
          score
        }, api);
      }
    } catch (error) {
      console.error("Failed to save quiz attempt:", error);
    }
  };

  const handleProgressUpdate = useCallback((progress) => {
    setVideoProgress({
      totalWatchTime: progress.totalWatchTime || 0,
      watchedPercentage: progress.watchedPercentage || 0,
      isCompleted: progress.isCompleted || false,
    });
  }, []);

  const formatTime = (seconds: number = 0) =>
    `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;

  if (isLoading) {
    return (
      <ErrorBoundary>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
            <div className="text-center">
              <Loader2 className="h-12 w-12 md:h-16 md:w-16 animate-spin text-violet-600 mx-auto" />
              <h3 className="text-lg md:text-xl font-bold text-slate-800 my-2">Loading your lesson...</h3>
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
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
            <div className="text-center p-8">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-6" />
              <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-3">{error || "No videos available"}</h3>
              <p className="text-slate-600 text-base md:text-lg">Please check the lesson URL or try again later.</p>
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
    navigate(`/courses/${courseId}/video/${lesson.id}`);
    setCurrentVideo(lesson);
    setIsPlaying(false);
    setQuizUnlocked(false);
    setIsPollingForQuiz(false);
  };

  return (
    <ErrorBoundary>
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
          <div className="relative z-10 p-4 md:p-6 lg:p-8">
            {/* Breadcrumb */}
            <nav className="mb-6 md:mb-8 flex items-center flex-wrap gap-2 text-sm md:text-base">
              <Link to="/courses" className="hover:text-violet-600 flex items-center gap-2 font-medium">
                <BookOpen className="h-5 w-5 text-violet-600" />
                <span className="text-slate-700">Courses</span>
              </Link>
              <span className="text-violet-300 text-lg">›</span>
              <Link to={`/courses/${courseId}`} className="hover:text-violet-600 font-medium text-slate-700 truncate max-w-[150px] sm:max-w-xs">
                Course
              </Link>
              <span className="text-violet-300 text-lg">›</span>
              <span className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-md">{currentVideo.title}</span>
            </nav>

            {/* Video Info Card */}
            <Card className="mb-6 md:mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="relative p-4 md:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 md:gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 md:gap-4 mb-4">
                      <Play className="h-8 w-8 text-white p-3 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-2xl flex-shrink-0" />
                      <CardTitle className="text-xl md:text-2xl font-bold">{currentVideo.title}</CardTitle>
                    </div>
                    {currentVideo.description && (
                      <p className="text-slate-600 max-w-3xl leading-relaxed mb-4">{currentVideo.description}</p>
                    )}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-slate-600">
                      <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 md:px-4 md:py-2">
                        <Clock className="h-5 w-5 text-violet-500" />
                        <span className="font-medium text-base md:text-lg">{formatTime(currentVideo.duration)}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 md:px-4 md:py-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-pulse"></div>
                        <span className="font-medium">Lesson {currentIndex + 1} of {videos.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Video Player */}
            <Card className="overflow-hidden shadow-2xl bg-white border-0 mb-6 md:mb-8">
              <div className="relative bg-black aspect-video rounded-t-2xl">
                <VideoPlayer
                  videoUrl={currentVideo.videoUrl}
                  videoId={currentVideo.id}
                  duration={currentVideo.duration}
                  playing={isPlaying}
                  setIsPlaying={setIsPlaying}
                  seekPosition={videoProgress.totalWatchTime}
                  onProgressUpdate={handleProgressUpdate}
                />
              </div>
              <div className="p-4 md:p-6 bg-gradient-to-r from-violet-50 via-purple-50 to-teal-50 border-t">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-white p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl" />
                    <span className="text-lg font-bold text-slate-800">Lesson Progress</span>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.round(videoProgress.watchedPercentage)}%
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                      {videoProgress.isCompleted ? "Completed" : "In Progress"}
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Progress value={videoProgress.watchedPercentage} className="h-3 md:h-4 rounded-full bg-slate-200" />
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-slate-600 font-medium">
                  <span>Watched: {formatTime(videoProgress.totalWatchTime)} / {formatTime(currentVideo.duration)}</span>
                  <span className="flex items-center gap-2">
                    {videoProgress.isCompleted ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600 font-semibold">✓ Completed!</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Keep watching to complete</span>
                      </>
                    )}
                  </span>
                </div>
                {isPollingForQuiz && (
                  <div className="mt-4 p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-3 text-blue-700">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="font-medium text-sm md:text-base">Your quiz will be available shortly...</span>
                    </div>
                    <p className="text-xs md:text-sm text-blue-600 mt-1">Please wait while we unlock your quiz ⏳</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Button
                variant="outline"
                disabled={!prevLesson}
                onClick={() => navigateToLesson(prevLesson)}
                className="p-4 md:p-6 h-auto flex items-center justify-start text-left gap-4 border-2 rounded-2xl"
              >
                <ChevronLeft className="h-6 w-6 flex-shrink-0" />
                <div className="overflow-hidden">
                  <div className="font-semibold text-base md:text-lg">Previous Lesson</div>
                  {prevLesson && <div className="text-sm text-slate-600 truncate">{prevLesson.title}</div>}
                </div>
              </Button>
              <Button
                variant="outline"
                disabled={!nextLesson}
                onClick={() => navigateToLesson(nextLesson)}
                className="p-4 md:p-6 h-auto flex items-center justify-end text-right gap-4 border-2 rounded-2xl"
              >
                <div className="overflow-hidden">
                  <div className="font-semibold text-base md:text-lg">Next Lesson</div>
                  {nextLesson && <div className="text-sm text-slate-600 truncate">{nextLesson.title}</div>}
                </div>
                <ChevronRight className="h-6 w-6 flex-shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
      {showQuizModal && currentQuiz && (
        <QuizModal
          quiz={currentQuiz}
          isOpen={showQuizModal}
          onClose={() => {
            setShowQuizModal(false);
            setCurrentQuiz(null);
          }}
          onComplete={handleQuizComplete}
        />
      )}
    </ErrorBoundary>
  );
}