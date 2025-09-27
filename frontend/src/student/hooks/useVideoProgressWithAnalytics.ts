import { useState, useEffect, useCallback, useRef } from "react";
import { useApi } from "@/api/index";

interface UseVideoProgressWithAnalyticsProps {
  videoId: number;
  duration: number;
  playbackRate: number; 
  onBackendProgressUpdate?: (progress: any) => void;
  onSpeedViolation?: (speed: number) => void;
}

const MAX_EVENTS = 100;
const MAX_ALLOWED_SPEED = 1.5;

export function useVideoProgressWithAnalytics({
  videoId,
  duration,
  playbackRate,
  onBackendProgressUpdate,
  onSpeedViolation,
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
  const pauseEventsRef = useRef<any[]>([]);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();
  const maxWatchedTimeRef = useRef<number>(0);
  const [isViolationActive, setIsViolationActive] = useState(false);

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

  // Unified analytics event sender
  const sendAnalyticsEvent = useCallback(
    async (eventType: string, data: any) => {
      try {
        await api.post("/analytics/event", { eventType, videoId, ...data });
      } catch (err) {
        console.error("Failed to send analytics event", err);
      }
    },
    [api, videoId]
  );

  const retryAttempts = useRef(0);

  const debouncedUpdate = useCallback(
    (progressData: Partial<typeof progress>) => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      const progressToSend = { ...progressData };
      progressToSend.skipEvents = (progressToSend.skipEvents || []).slice(-MAX_EVENTS);
      progressToSend.pauseEvents = (progressToSend.pauseEvents || []).slice(-MAX_EVENTS);

      updateTimeoutRef.current = setTimeout(async () => {
        try {
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
                if (onSpeedViolation) {
                  onSpeedViolation(1.0); 
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
      }, 10000);
    },
    [api, videoId, onSpeedViolation]
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
          skipEvents: skipEventsRef.current,
          pauseEvents: pauseEventsRef.current,
        };

        setProgress(prev => ({ ...prev, ...newProgress }));

        if (onBackendProgressUpdate) {
          onBackendProgressUpdate(newProgress);
        }

        const now = Date.now();
        if (now - lastUpdateTime.current > 5000) {
          lastUpdateTime.current = now;
          sendAnalyticsEvent("video_progress", {
            currentTime: playedSeconds,
            percentWatched: watchedPercentage,
          });

          debouncedUpdate(newProgress);
        }
      }
    },
    [duration, sendAnalyticsEvent, debouncedUpdate, onBackendProgressUpdate, isViolationActive]
  );

  const handlePlay = useCallback(
    (currentTime: number) => {
      sendAnalyticsEvent("video_play", { currentTime });
    },
    [sendAnalyticsEvent]
  );

  const handlePause = useCallback(
    (currentTime: number) => {
      const pauseEvent = { timestamp: Date.now(), currentTime };
      pauseEventsRef.current.push(pauseEvent);
      sendAnalyticsEvent("video_pause", { currentTime });
    },
    [sendAnalyticsEvent]
  );

  const handleSeek = useCallback(
    (from: number, to: number) => {
      if (isViolationActive) {
        return;
      }

      const skipEvent = { timestamp: Date.now(), from, to };
      skipEventsRef.current.push(skipEvent);
      sendAnalyticsEvent("video_seek", { seekFrom: from, seekTo: to });
      
      const skipDistance = Math.abs(to - from);
      const isForwardSkip = to > from;
      
      const now = Date.now();
      const recentSkips = skipEventsRef.current.filter(event => 
        now - event.timestamp < 30000 &&
        Math.abs(event.to - event.from) >= 5
      );
      
      if (
        (isForwardSkip && skipDistance > 60) || 
        recentSkips.length > 5
      ) {
        console.warn(`🚨 EXCESSIVE SKIPPING DETECTED: ${skipDistance}s skip, ${recentSkips.length} recent skips`);
        setIsViolationActive(true);
        if (onSpeedViolation) {
          onSpeedViolation(1.0);
        }
        return;
      }
    },
    [sendAnalyticsEvent, onSpeedViolation, isViolationActive]
  );

  // **Handle video ended event with immediate backend sync**
  const handleEnded = useCallback(async () => {
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

    sendAnalyticsEvent("video_ended", {});

    // **Immediately update backend on video end (no debounce)**
    try {
      await api.post(`/videos/${videoId}/progress`, finalProgress);
      setLastPersistedSeconds(finalProgress.totalWatchTime || duration);
      // console.log("Video completion saved immediately");
    } catch (err) {
      console.error("Failed to save completion:", err);
    }
  }, [api, videoId, duration, onBackendProgressUpdate, sendAnalyticsEvent]);

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
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    };
  }, [api, videoId, onBackendProgressUpdate]);

  const resetViolationState = useCallback(() => {
    setIsViolationActive(false);
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
