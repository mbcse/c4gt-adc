import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/student/components/ui/button";
import { Progress } from "@/student/components/ui/progress";
import { Card, CardHeader, CardContent, CardTitle } from "@/student/components/ui/card";
import { Loader2, AlertCircle, ChevronLeft, ChevronRight, Play, Pause, BookOpen, Clock } from "lucide-react";
import DashboardLayout from "@/student/components/DashboardLayout";
import ErrorBoundary from "@/student/components/ErrorBoundary";
import { videoAPI, Video } from "@/api/videoAPI";
import { useVideoProgress } from "../hooks/useVideoProgress";

export default function VideoPage() {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBackendProgressUpdate = async () => {
    try {
      if (!courseId) return;
      const refreshedVideos = await videoAPI.getCourseVideos(Number(courseId));
      setVideos(refreshedVideos);
      if (currentVideo) {
        const updatedVideo = refreshedVideos.find(v => v.id === currentVideo.id);
        if (updatedVideo) setCurrentVideo(updatedVideo);
      }
    } catch (err) {
      console.error("Failed to refresh videos after progress update", err);
    }
  };

  const { progress, handleProgress, handlePause, handleSeek, handleEnded } = useVideoProgress({
    videoId: currentVideo?.id || 0,
    duration: currentVideo?.duration || 0,
    onBackendProgressUpdate: handleBackendProgressUpdate,
  });

  useEffect(() => {
    async function loadVideos() {
      if (!courseId) return;
      try {
        setIsLoading(true);
        const courseVideos = await videoAPI.getCourseVideos(Number(courseId));
        setVideos(courseVideos);
        if (videoId) {
          const foundVideo = courseVideos.find(v => v.id.toString() === videoId);
          if (foundVideo) {
            setCurrentVideo(foundVideo);
            setDuration(foundVideo.duration);
            setIsPlaying(false);
            setSeekValue(0);
          } else if (courseVideos.length) {
            setCurrentVideo(courseVideos[0]);
            setDuration(courseVideos[0].duration);
          }
        }
      } catch (err) {
        console.error("Failed to load videos:", err);
        setError("Failed to load videos");
      } finally {
        setIsLoading(false);
      }
    }
    loadVideos();
  }, [courseId, videoId]);

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;

  const handleReady = () => {
    if (progress.watchedPercentage > 0 && playerRef.current && currentVideo) {
      const resumeTime = (progress.watchedPercentage / 100) * currentVideo.duration;
      playerRef.current.seekTo(resumeTime, "seconds");
      setSeekValue(resumeTime);
    }
  };

  const onProgress = (state: { played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number; }) => {
    if (!isSeeking) {
      setSeekValue(state.playedSeconds);
      handleProgress(state);
    }
  };

  const handleSeekMouseDown = () => setIsSeeking(true);
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => setSeekValue(Number(e.target.value));
  const handleSeekMouseUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSeeking(false);
    const val = Number(e.target.value);
    playerRef.current?.seekTo(val, "seconds");
    handleSeek(val);
  };

  const togglePlay = () => setIsPlaying(p => !p);

  const currentIndex = videos.findIndex(v => v.id === currentVideo?.id);
  const nextLesson = currentIndex >= 0 && currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? videos[currentIndex - 1] : null;

  const navigateToLesson = lesson => {
    if (!lesson) return;
    navigate(`/courses/${courseId}/video/${lesson.id}`);
    setCurrentVideo(lesson);
    setDuration(lesson.duration);
    setSeekValue(0);
    setIsPlaying(false);
  };

  const safeProgress = Number.isFinite(progress.watchedPercentage) && progress.watchedPercentage >= 0 ? progress.watchedPercentage : 0;

  if (isLoading) {
    return (
      <ErrorBoundary>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="text-center">
              <div className="relative mb-6">
                <Loader2 className="h-16 w-16 animate-spin text-violet-600 mx-auto" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              </div>
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
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center shadow-xl">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-red-600 mb-3">{error || "No videos available"}</h3>
              <p className="text-slate-600 text-lg">Please check the lesson URL or try again later.</p>
            </div>
          </div>
        </DashboardLayout>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-100/20 via-purple-100/30 to-teal-100/20 animate-pulse pointer-events-none"></div>
          <div className="absolute top-16 right-16 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="absolute top-40 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-16 left-32 w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
          <div className="relative z-10 p-6">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-3 text-base bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border border-violet-200 overflow-x-auto">
            <Link to="/courses" className="hover:text-violet-600 flex items-center gap-2 font-medium transition-colors duration-200 flex-shrink-0">
              <BookOpen className="h-5 w-5 text-violet-600" />
              <span className="text-slate-700">Courses</span>
            </Link>
            <span className="text-violet-300 text-xl flex-shrink-0"> › </span>
            <Link to={`/courses/${courseId}`} className="hover:text-violet-600 font-medium text-slate-700 transition-colors duration-200 truncate max-w-xs">
              Course
            </Link>
            <span className="text-violet-300 text-xl flex-shrink-0"> › </span>
            <span className="font-bold text-slate-900 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent truncate max-w-xs">{currentVideo.title}</span>
          </nav>

          {/* Lesson Info Card */}
          <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-teal-500/10"></div>
            <CardHeader className="relative p-8">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent leading-tight pb-2">{currentVideo.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600">
                    <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2">
                      <Clock className="h-5 w-5 text-violet-500" />
                      <span className="font-medium text-lg">{formatTime(currentVideo.duration)}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Lesson {videos.findIndex(v => v.id === currentVideo.id) + 1} of {videos.length}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    onClick={togglePlay}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl flex items-center gap-3"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    <span>{isPlaying ? "Pause Video" : "Play Video"}</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Video Player */}
          <Card className="overflow-hidden shadow-2xl bg-white border-0 mb-8">
            <div className="relative bg-black aspect-video rounded-t-2xl overflow-hidden">
              <ReactPlayer
                ref={playerRef}
                src={currentVideo.videoUrl}
                width="100%"
                height="100%"
                controls
                playing={isPlaying}
                muted={false}
                onReady={handleReady}
                onPlay={() => setIsPlaying(true)}
                onPause={() => {
                  setIsPlaying(false);
                  handlePause();
                }}
                onProgress={onProgress as any}
                onSeeking={() => setIsSeeking(true)}
                onSeeked={() => setIsSeeking(false)}
                onEnded={handleEnded}
                onError={(err) => console.error("Video player error:", err)}
                config={{
                  youtube: {
                    modestbranding: 1,
                    cc_lang_pref: "en",
                    rel: 0,
                  }as any,
                }}
              />
            </div>

            {/* Progress Section */}
            <div className="p-6 bg-gradient-to-r from-violet-50 via-purple-50 to-teal-50 border-t">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-slate-800">Lesson Progress</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{Math.round(safeProgress)}%</div>
                  <div className="text-sm text-slate-500 font-medium">Complete</div>
                </div>
              </div>
              <div className="relative mb-4">
                <Progress value={safeProgress} className="h-4 rounded-full bg-slate-200 shadow-inner" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300" style={{ width: `${safeProgress}%` }}></div>
              </div>
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>Time: {formatTime(seekValue)} / {formatTime(currentVideo.duration)}</span>
                <span>{safeProgress >= 100 ? '✓ Completed!' : 'Keep watching to complete this lesson'}</span>
              </div>
            </div>
          </Card>

          {/* Navigation Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              variant="outline"
              disabled={!prevLesson}
              onClick={() => navigateToLesson(prevLesson)}
              className={`p-6 h-auto flex items-center justify-start gap-4 border-2 rounded-2xl transition-all duration-300 ${
                prevLesson
                  ? 'border-violet-200 bg-white/80 backdrop-blur-sm hover:bg-violet-50 hover:border-violet-300 hover:shadow-xl hover:-translate-y-1'
                  : 'border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              <div className={`p-3 rounded-2xl ${
                prevLesson
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                  : 'bg-slate-300 text-slate-500'
              }`}>
                <ChevronLeft className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Previous Lesson</div>
                {prevLesson && (
                  <div className="text-sm text-slate-600 truncate max-w-xs">{prevLesson.title}</div>
                )}
              </div>
            </Button>

            <Button
              variant="outline"
              disabled={!nextLesson}
              onClick={() => navigateToLesson(nextLesson)}
              className={`p-6 h-auto flex items-center justify-end gap-4 border-2 rounded-2xl transition-all duration-300 ${
                nextLesson
                  ? 'border-teal-200 bg-white/80 backdrop-blur-sm hover:bg-teal-50 hover:border-teal-300 hover:shadow-xl hover:-translate-y-1'
                  : 'border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              <div className="text-right">
                <div className="font-semibold text-lg">Next Lesson</div>
                {nextLesson && (
                  <div className="text-sm text-slate-600 truncate max-w-xs">{nextLesson.title}</div>
                )}
              </div>
              <div className={`p-3 rounded-2xl ${
                nextLesson
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white'
                  : 'bg-slate-300 text-slate-500'
              }`}>
                <ChevronRight className="h-6 w-6" />
              </div>
            </Button>
          </div>
          </div>
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
}
