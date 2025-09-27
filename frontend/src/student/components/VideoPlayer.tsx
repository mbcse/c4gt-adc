import React, { useRef, useEffect, useState, useCallback } from "react";
import ReactPlayer from "react-player";
import { useVideoProgressWithAnalytics } from "@/student/hooks/useVideoProgressWithAnalytics";

interface VideoPlayerProps {
  videoUrl: string;
  videoId: number;
  duration: number;
  playing: boolean;
  setIsPlaying: (playing: boolean) => void;
  seekPosition?: number;
  onReady?: () => void;
  onProgressUpdate?: (progress: {
    watchedPercentage: number;
    totalWatchTime: number;
    isCompleted?: boolean;
  }) => void;
}

interface ProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export function VideoPlayer({
  videoUrl,
  videoId,
  duration,
  playing,
  setIsPlaying,
  seekPosition,
  onReady,
  onProgressUpdate,
}: VideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const [isSeeking, setIsSeeking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [actualDuration, setActualDuration] = useState(duration);

  const hasUpdatedBackendDuration = useRef(false);

  const pollForDuration = useCallback(() => {
    let attempts = 0;
    function check() {
      if (playerRef.current && typeof playerRef.current.getDuration === 'function') {
        const d = playerRef.current.getDuration();
        if (d && d > 0) {
          if (actualDuration !== d) {
            setActualDuration(d);

            // // Send duration to backend once, if not done already
            // if (!hasUpdatedBackendDuration.current) {
            //   hasUpdatedBackendDuration.current = true;
            //   api.post(`/videos/${videoId}/metadata`, { duration: d })
            //     .then(() => {
            //       console.log(`Updated backend video duration to ${d} seconds`);
            //     })
            //     .catch((err) => {
            //       console.error("Failed to update video duration on backend", err);
            //     });
            // }
          }
        } else if (attempts < 20) {
          attempts++;
          setTimeout(check, 300);
        }
      }
    }
    check();
  }, [playerRef, actualDuration, videoId]);

  const {
    progress,
    error,
    isLoading,
    handleProgress,
    handlePlay,
    handlePause,
    handleSeek,
    handleEnded,
  } = useVideoProgressWithAnalytics({ 
    videoId, 
    duration: actualDuration,
    onBackendProgressUpdate: onProgressUpdate 
  });

  const handlePlayerReady = useCallback(() => {
    setIsPlayerReady(true);
    pollForDuration();
    
    if (onReady) onReady();

    // Initial seek if needed when player is ready
    if (
      seekPosition !== undefined &&
      playerRef.current &&
      typeof playerRef.current.seekTo === "function" &&
      Math.abs(seekPosition - currentTime) > 0.5
    ) {
      playerRef.current.seekTo(seekPosition, "seconds");
      setCurrentTime(seekPosition);
    }
  }, [seekPosition, currentTime, onReady, pollForDuration]);

  // Sync external seekPosition, only perform seeks when player is ready
  useEffect(() => {
    if (
      isPlayerReady &&
      seekPosition !== undefined &&
      playerRef.current &&
      typeof playerRef.current.seekTo === "function" &&
      Math.abs(seekPosition - currentTime) > 0.5
    ) {
      playerRef.current.seekTo(seekPosition, "seconds");
      setCurrentTime(seekPosition);
    }
  }, [seekPosition, currentTime, isPlayerReady]);

  // Sync currentTime with progress for display
  useEffect(() => {
    if (progress && !isSeeking) {
      setCurrentTime(progress.totalWatchTime);
    }
  }, [progress, isSeeking]);

  const onPlay = useCallback(() => {
    setIsPlaying(true);
    handlePlay(currentTime);
  }, [setIsPlaying, handlePlay, currentTime]);

  const onPause = useCallback(() => {
    setIsSeeking(false);
    setIsPlaying(false);
    handlePause(currentTime);
  }, [setIsPlaying, handlePause, currentTime]);

  const onSeeking = useCallback(() => {
    setIsSeeking(true);
  }, []);

  const onSeeked = useCallback(() => {
    setIsSeeking(false);
    if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
      const newTime = playerRef.current.getCurrentTime();
      handleSeek(currentTime, newTime);
      setCurrentTime(newTime);
    }
  }, [handleSeek, currentTime]);

  const onProgress = useCallback((state: any) => {
    if (isSeeking) return;

    const playedSeconds = state.playedSeconds || (state.target?.currentTime) || 0;
    const played = state.played || (state.target?.currentTime / actualDuration) || 0;
    
    // Update local time immediately for smooth UI
    setCurrentTime(playedSeconds);

    if (state.playedSeconds !== undefined) {
      handleProgress(state);
    } else if (state.target?.currentTime !== undefined) {
      const progressState = {
        played: state.target.currentTime / actualDuration,
        playedSeconds: state.target.currentTime,
        loaded: state.target.buffered.length > 0 ? state.target.buffered.end(0) / actualDuration : 0,
        loadedSeconds: state.target.buffered.length > 0 ? state.target.buffered.end(0) : 0,
      };
      handleProgress(progressState);
    }
  }, [isSeeking, handleProgress, actualDuration]);

  const onEnded = useCallback(() => {
    setIsPlaying(false);
    handleEnded();
  }, [setIsPlaying, handleEnded]);

  const onError = useCallback((error: any) => {
    console.error("Video player error:", error);
    setIsPlaying(false);
  }, [setIsPlaying]);

  if (isLoading) {
    return (
      <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-black p-8">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">Loading Video Progress...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-red-900 via-red-800 to-black p-8">
        <div className="text-center text-red-200">
          <h3 className="text-lg font-semibold mb-2">Video Error</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-black">
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        <ReactPlayer
          ref={playerRef}
          src={videoUrl}
          playing={playing}
          controls
          width="100%"
          height="100%"
          onReady={handlePlayerReady}
          onPlay={onPlay}
          onPause={onPause}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
          onProgress={onProgress}
          onEnded={onEnded}
          onError={onError}
          config={{
            youtube: {
              cc_lang_pref: "en",
              rel: 0,
            },
          }}
        />
      </div>

      {/* Custom UI Controls */}
      <div className="bg-gradient-to-r from-violet-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-sm p-4 border-t border-violet-500/20">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-violet-200 flex items-center gap-2">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              Video Progress
            </span>
            <span className="text-sm font-bold text-white bg-black/30 px-2 py-1 rounded-lg">
              {Math.floor(currentTime / 60)}:
              {Math.floor(currentTime % 60).toString().padStart(2, "0")} /{" "}
              {Math.floor(actualDuration / 60)}:
              {Math.floor(actualDuration % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-violet-200">
          <span className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                playing ? "bg-emerald-400 animate-pulse" : "bg-orange-400"
              }`}
            />
            <span className="font-medium">{playing ? "Playing" : "Paused"}</span>
          </span>
          <span className="text-xs font-medium">
            Progress: {progress ? Math.round(progress.watchedPercentage) : 0}%
          </span>
          <span className="text-xs font-medium bg-black/30 px-2 py-1 rounded">
            Quality: Auto
          </span>
        </div>
      </div>
    </div>
  );
}
