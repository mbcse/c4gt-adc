import { useState, useEffect, useCallback, useRef } from "react";
import { useApi } from "@/api/index";
import { analyticsAPI } from "@/api/analyticsAPI";

interface UseVideoProgressWithAnalyticsProps {
  videoId: number;
  duration: number;
  playbackRate: number;
  onBackendProgressUpdate?: (progress: any) => void;
  onSpeedViolation?: (speed: number) => void;
  onSeekViolation?: () => void;
}

const MAX_EVENTS = 100;
const MAX_ALLOWED_SPEED = 1.5;

export function useVideoProgressWithAnalytics({
  videoId,
  duration,
  playbackRate,
  onBackendProgressUpdate,
  onSpeedViolation,
  onSeekViolation,
}: UseVideoProgressWithAnalyticsProps) {
  const api = useApi();

  const [progress, setProgress] = useState({
    totalWatchTime: 0,
    isCompleted: false,
    watchedPercentage: 0,
    skipEvents: [],
    pauseEvents: [],
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPersistedSeconds, setLastPersistedSeconds] = useState(0);

  const lastUpdateTime = useRef<number>(0);
  const skipEventsRef = useRef<any[]>([]);
  const pauseEventsRef = useRef<[number, number | null][]>([]);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();
  const maxWatchedTimeRef = useRef<number>(0);
  const [isViolationActive, setIsViolationActive] = useState(false);

  const isPlayingRef = useRef<boolean>(false);

  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const closeOpenIntervals = useCallback((timestamp: number) => {
    const intervals = pauseEventsRef.current;
    if (intervals.length > 0 && intervals[intervals.length - 1][1] === null) {
      intervals[intervals.length - 1][1] = timestamp;
    }
    isPlayingRef.current = false;
  }, []);

  // Check speed violation on playbackRate changes
  useEffect(() => {
    if (playbackRate > MAX_ALLOWED_SPEED) {
      if (!isViolationActive) {
        setIsViolationActive(true);
        if (onSpeedViolation) {
          onSpeedViolation(playbackRate);
        }
      }
    } else if (isViolationActive) {
      setIsViolationActive(false);
    }
  }, [playbackRate, onSpeedViolation, isViolationActive]);

  const setPlayerRef = useCallback((playerRef: any) => {
  }, []);

  const retryAttempts = useRef(0);

  const debouncedUpdate = useCallback(
    (progressData: Partial<typeof progress>) => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      updateTimeoutRef.current = setTimeout(async () => {
        try {

          const progressToSend = {
            ...progressData,
            skipEvents: skipEventsRef.current.slice(-MAX_EVENTS),
            pauseEvents: pauseEventsRef.current.slice(-MAX_EVENTS)
          };

          const response = await api.post(`/videos/${videoId}/progress`, progressToSend);
          setError(null);
          setLastPersistedSeconds(progressToSend.totalWatchTime || 0);
          retryAttempts.current = 0;
        } catch (err: any) {
          console.error("Progress update failed:", err);

          if (err.response?.status === 400) {
            const errorCode = err.response.data?.code;
            const errorData = err.response.data?.details || {};

            switch (errorCode) {
              case 'SPEED_VIOLATION':
                if (onSpeedViolation) {
                  onSpeedViolation(errorData.detectedSpeed || 2.0);
                }
                setError('Please watch videos at normal speed for effective learning.');
                break;

              case 'EXCESSIVE_SKIPPING':
                if (onSeekViolation) {
                  onSeekViolation();
                }
                setError('Excessive skipping detected. Please watch sequentially.');
                break;

              case 'DURATION_OVERFLOW':
              case 'DURATION_EXCEEDED':
                setError('Watch time error. Please refresh and watch normally.');
                break;

              case 'INVALID_INPUT':
                setError('Invalid progress data. Please refresh the page.');
                break;

              default:
                setError(err.response.data?.error || 'Failed to save progress');
            }
            useEffect(() => {
              return () => {
                if (updateTimeoutRef.current) {
                  clearTimeout(updateTimeoutRef.current);
                  updateTimeoutRef.current = undefined;
                }
              };
            }, []);
            return;
          }

          if (retryAttempts.current < 3) {
            retryAttempts.current++;
            const delay = Math.pow(2, retryAttempts.current) * 1000;
            updateTimeoutRef.current = setTimeout(() => debouncedUpdate(progressData), delay);
          } else {
            setError("Failed to save progress. Please refresh and try again.");
          }
        }
      }, 5000);
    },
    [api, videoId, onSpeedViolation, onSeekViolation]
  );

  // Handle progress event with immediate UI updates
  const handleProgress = useCallback(
    (progressEvent: { played: number; playedSeconds: number }) => {
      if (isViolationActive) {
        return;
      }

      const playedSeconds = Math.max(0, progressEvent.playedSeconds || 0);

      if (typeof maxWatchedTimeRef.current !== 'number') {
        maxWatchedTimeRef.current = 0;
      }

      const newMaxWatchTime = Math.max(maxWatchedTimeRef.current, playedSeconds);

      if (
        playedSeconds >= maxWatchedTimeRef.current - 2 &&
        newMaxWatchTime <= maxWatchedTimeRef.current + 10
      ) {
        maxWatchedTimeRef.current = newMaxWatchTime;

        const watchedPercentage = duration > 0 ? Math.min((newMaxWatchTime / duration) * 100, 100) : 0;

        const newProgress = {
          watchedPercentage,
          totalWatchTime: newMaxWatchTime,
          isCompleted: watchedPercentage >= 95,
          // skipEvents: skipEventsRef.current,
          // pauseEvents: pauseEventsRef.current,
        };

        setProgress(prev => ({
          ...prev,
          ...newProgress,
          skipEvents: skipEventsRef.current,
          pauseEvents: pauseEventsRef.current,
        }));

        if (onBackendProgressUpdate) {
          onBackendProgressUpdate({
            ...newProgress,
            skipEvents: skipEventsRef.current,
            pauseEvents: pauseEventsRef.current,
          });
        }

        const now = Date.now();
        if (now - lastUpdateTime.current > 5000) {
          lastUpdateTime.current = now;

          debouncedUpdate(newProgress);
        }
      }
    },
    [duration, debouncedUpdate, onBackendProgressUpdate, isViolationActive]
  );

  const handlePlay = useCallback(
    () => {
      isPlayingRef.current = true;
      const playTimestamp = Date.now();
      pauseEventsRef.current.push([playTimestamp, null]);
    },
    []
  );

  const handlePause = useCallback(
    () => {
      if (isPlayingRef.current) {
        const pauseTimestamp = Date.now();
        closeOpenIntervals(pauseTimestamp);

        const immediateUpdate = {
          watchedPercentage: progress.watchedPercentage,
          totalWatchTime: progress.totalWatchTime,
          isCompleted: progress.isCompleted,
        };

        // Cancel any existing timeout and send immediately
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }

        debouncedUpdate(immediateUpdate); 
      }
    },
    [closeOpenIntervals]
  );

  const handleSeek = useCallback(
    (from: number, to: number) => {
      if (isViolationActive) {
        return;
      }

      const skipEvent = { timestamp: Date.now(), from, to };
      skipEventsRef.current.push(skipEvent);

      if (isPlayingRef.current) {
        const seekTimestamp = Date.now();
        closeOpenIntervals(seekTimestamp);
      }

      const skipDistance = Math.abs(to - from);
      const isForwardSkip = to > from;

      const now = Date.now();
      const recentSkips = skipEventsRef.current.filter(event =>
        now - event.timestamp < 30000 &&
        Math.abs(event.to - event.from) >= 5
      );

      if (
        (isForwardSkip && skipDistance > 30) ||
        recentSkips.length > 5
      ) {
        console.warn(`🚨 EXCESSIVE SKIPPING DETECTED: ${skipDistance}s skip, ${recentSkips.length} recent skips`);
        setIsViolationActive(true);
        if (onSeekViolation) {
          onSeekViolation();
        }
        return;
      }
      if (isPlayingRef.current) {
        const seekTimestamp = Date.now();
        pauseEventsRef.current.push([seekTimestamp, null]);
      }
    },
    [onSpeedViolation, isViolationActive, onSeekViolation, closeOpenIntervals]
  );

  // **Handle video ended event with immediate backend sync**
  const handleEnded = useCallback(async () => {
    const endTimestamp = Date.now();
    closeOpenIntervals(endTimestamp);

    const finalProgress = {
      watchedPercentage: 100,
      isCompleted: true,
      totalWatchTime: duration,
      skipEvents: skipEventsRef.current,
      pauseEvents: pauseEventsRef.current,
    };

    maxWatchedTimeRef.current = duration;
    setProgress((prev) => ({ ...prev, ...finalProgress }));

    // Notify parent immediately
    if (onBackendProgressUpdate) {
      onBackendProgressUpdate(finalProgress);
    }

    // Immediately update backend on video end
    try {
      await api.post(`/videos/${videoId}/progress`, finalProgress);
      setLastPersistedSeconds(finalProgress.totalWatchTime || duration);
    } catch (err) {
      console.error("Failed to save completion:", err);
    }
  }, [api, videoId, duration, onBackendProgressUpdate, closeOpenIntervals]);

  // Load initial progress from backend
  useEffect(() => {
    const loadProgress = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/videos/${videoId}`);
        const videoData = res.data.video;
        const initialProgress = videoData.progress || {
          totalWatchTime: 0,
          isCompleted: false,
          watchedPercentage: 0,
          skipEvents: [],
          pauseEvents: [],
        };

        maxWatchedTimeRef.current = initialProgress.totalWatchTime || 0;

        setProgress(initialProgress);
        setLastPersistedSeconds(initialProgress.totalWatchTime || 0);
        skipEventsRef.current = initialProgress.skipEvents || [];
        pauseEventsRef.current = initialProgress.pauseEvents || [];

        if (onBackendProgressUpdate) {
          onBackendProgressUpdate(initialProgress);
        }
      } catch (error) {
        setError("Failed to load progress");
        console.error("Failed to load progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (videoId > 0) loadProgress();

    return () => {
      const cleanupTimestamp = Date.now();
      closeOpenIntervals(cleanupTimestamp);
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    };
  }, [api, videoId, onBackendProgressUpdate, closeOpenIntervals]);

  const resetViolationState = useCallback(() => {
    setIsViolationActive(false);
    skipEventsRef.current = [];
    // Close any open intervals when resetting violations
    const resetTimestamp = Date.now();
    closeOpenIntervals(resetTimestamp);
  }, [closeOpenIntervals]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const finalProgress = { ...progressRef.current };

      const lastInterval = finalProgress.pauseEvents[finalProgress.pauseEvents.length - 1];
      if (lastInterval && lastInterval[1] === null) {
        lastInterval[1] = Date.now();
      }

      if (finalProgress.totalWatchTime > lastPersistedSeconds &&
        localStorage.getItem('authToken')) { // Check auth before sending
        analyticsAPI.logVideoProgressBeacon(videoId, finalProgress);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePause();
      } else if (isPlayingRef.current) {
        handlePlay();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      handleBeforeUnload();
    };
  }, [videoId, lastPersistedSeconds, closeOpenIntervals, handlePause, handlePlay]);

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
        updateTimeoutRef.current = undefined;
      }
    };
  }, []);


  return {
    progress,
    error,
    isLoading,
    lastPersistedSeconds,
    handleProgress,
    handlePlay,
    handlePause,
    handleSeek,
    handleEnded,
    setPlayerRef,
    resetViolationState,
  };
}
