// src/hooks/useVideoProgress.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { videoAPI, VideoProgress } from "@/api/videoAPI"; 

interface UseVideoProgressProps {
  videoId: number;
  duration: number;
  onBackendProgressUpdate?: (progress: VideoProgress) => void; // New callback prop
}

export const useVideoProgress = ({ videoId, duration, onBackendProgressUpdate }: UseVideoProgressProps) => {
  const [progress, setProgress] = useState<VideoProgress>({
    totalWatchTime: 0,
    isCompleted: false,
    watchedPercentage: 0,
    skipEvents: [],
    pauseEvents: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastUpdateTime = useRef<number>(0);
  const skipEventsRef = useRef<any[]>([]);
  const pauseEventsRef = useRef<any[]>([]);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  const debouncedUpdate = useCallback(
    (progressData: Partial<VideoProgress>) => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      updateTimeoutRef.current = setTimeout(async () => {
        try {
          const updatedProgress = await videoAPI.updateProgress(videoId, progressData);
          setProgress(prev => ({ ...prev, ...updatedProgress }));

          if (onBackendProgressUpdate) {
            onBackendProgressUpdate(updatedProgress);
          }
        } catch (err) {
          console.error("Failed to update progress:", err);
          setError("Failed to save progress");
        }
      }, 2000);
    },
    [videoId, onBackendProgressUpdate]
  );

  const handleProgress = useCallback(
    (progressEvent: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
      const currentTime = Date.now();

      // Defensive checks
      const played = typeof progressEvent.played === "number" && !isNaN(progressEvent.played)
        ? progressEvent.played
        : 0;
      const playedSeconds = typeof progressEvent.playedSeconds === "number" && !isNaN(progressEvent.playedSeconds)
        ? progressEvent.playedSeconds
        : 0;
      const watchedPercentage = duration > 0 ? Math.min(played * 100, 100) : 0;

      setProgress(prev => ({
        ...prev,
        watchedPercentage,
        totalWatchTime: Math.max(prev.totalWatchTime, playedSeconds),
        isCompleted: watchedPercentage >= 95,
      }));

      if (currentTime - lastUpdateTime.current > 5000) {
        lastUpdateTime.current = currentTime;

        debouncedUpdate({
          watchedPercentage,
          totalWatchTime: playedSeconds,
          isCompleted: watchedPercentage >= 95,
          skipEvents: skipEventsRef.current,
          pauseEvents: pauseEventsRef.current,
        });
      }
    },
    [debouncedUpdate, duration]
  );

  const handlePause = useCallback(() => {
    const pauseEvent = {
      timestamp: Date.now(),
      currentTime: progress.totalWatchTime,
    };

    pauseEventsRef.current.push(pauseEvent);
  }, [progress.totalWatchTime]);

  const handleSeek = useCallback(
    (seconds: number) => {
      const skipEvent = {
        timestamp: Date.now(),
        from: progress.totalWatchTime,
        to: seconds,
      };

      skipEventsRef.current.push(skipEvent);
    },
    [progress.totalWatchTime]
  );

  const handleEnded = useCallback(() => {
    const finalProgress = {
      watchedPercentage: 100,
      isCompleted: true,
      totalWatchTime: duration,
      skipEvents: skipEventsRef.current,
      pauseEvents: pauseEventsRef.current,
    };

    setProgress(prev => ({ ...prev, ...finalProgress }));

    videoAPI.updateProgress(videoId, finalProgress).then((updatedProgress) => {
      if (onBackendProgressUpdate) {
        onBackendProgressUpdate(updatedProgress);
      }
    }).catch(err => {
      console.error("Failed to save completion:", err);
    });
  }, [videoId, duration, onBackendProgressUpdate]);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        setIsLoading(true);
        const video = await videoAPI.getVideo(videoId);
        setProgress(video.progress);
        skipEventsRef.current = video.progress.skipEvents || [];
        pauseEventsRef.current = video.progress.pauseEvents || [];
      } catch (err) {
        console.error("Failed to load progress:", err);
        setError("Failed to load progress");
      } finally {
        setIsLoading(false);
      }
    };

    if (videoId > 0) loadProgress();
  }, [videoId]);

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  return {
    progress,
    isLoading,
    error,
    handleProgress,
    handlePause,
    handleSeek,
    handleEnded,
  };
};
