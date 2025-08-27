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
          // console.log("Backend progress updated:", response.data.progress);
          setError(null);
          setLastPersistedSeconds(progressToSend.totalWatchTime || 0);
          retryAttempts.current = 0;
        } catch (err: any) {
          console.error("Progress update failed:", err);
          
          // Handle different types of backend errors
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
          
          // Retry logic for network errors
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
      // console.log('Progress update blocked - violation active');
      return;
    }

    const playedSeconds = Math.max(0, progressEvent.playedSeconds || 0);

    if (typeof maxWatchedTimeRef.current !== 'number') {
      maxWatchedTimeRef.current = 0;
    }

    // Allow minor regressions and forward jumps up to 10s
    const newMaxWatchTime = Math.max(maxWatchedTimeRef.current, playedSeconds);

    if (
      playedSeconds >= maxWatchedTimeRef.current - 2 && // allow 2s regressions
      newMaxWatchTime <= maxWatchedTimeRef.current + 10 // allow forward jumps up to 10s
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
        // console.log('Progress update sent to parent:', newProgress);
        onBackendProgressUpdate(newProgress);
      }

      // Throttle backend updates every 5 seconds
      const now = Date.now();
      if (now - lastUpdateTime.current > 5000) {
        lastUpdateTime.current = now;
        sendAnalyticsEvent("video_progress", {
          currentTime: playedSeconds,
          percentWatched: watchedPercentage,
        });

        debouncedUpdate(newProgress);
      }
    } else {
      // console.log(`Invalid progress rejected: ${playedSeconds}s vs max ${maxWatchedTimeRef.current}s`);
    }
  },
  [duration, sendAnalyticsEvent, debouncedUpdate, onBackendProgressUpdate, isViolationActive]
);

  // Handle play event
  const handlePlay = useCallback(
    (currentTime: number) => {
      sendAnalyticsEvent("video_play", { currentTime });
    },
    [sendAnalyticsEvent]
  );

  // Handle pause event
  const handlePause = useCallback(
    (currentTime: number) => {
      const pauseEvent = { timestamp: Date.now(), currentTime };
      pauseEventsRef.current.push(pauseEvent);
      sendAnalyticsEvent("video_pause", { currentTime });
    },
    [sendAnalyticsEvent]
  );

  // Handle seek event
  const handleSeek = useCallback(
    (from: number, to: number) => {
      // Don't process seeks if violation is active
      if (isViolationActive) {
        return;
      }

      const skipEvent = { timestamp: Date.now(), from, to };
      skipEventsRef.current.push(skipEvent);
      sendAnalyticsEvent("video_seek", { seekFrom: from, seekTo: to });
      
      const skipDistance = Math.abs(to - from);
      const isForwardSkip = to > from;
      
      // console.log(`Seek detected: ${from.toFixed(1)}s -> ${to.toFixed(1)}s (${skipDistance.toFixed(1)}s skip)`);
      
      // Check recent skip events for excessive skipping pattern
      const now = Date.now();
      const recentSkips = skipEventsRef.current.filter(event => 
        now - event.timestamp < 30000 && // Within last 30 seconds
        Math.abs(event.to - event.from) >= 5 // Skips 5 seconds or longer
      );
      
      // console.log(`Recent skips in last 30s: ${recentSkips.length}`);
      
      // Trigger violation if:
      // 1. Single large forward skip (>60 seconds), OR
      // 2. More than 5 skips >=5 seconds in last 30s (frequent small skips)
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

  // Handle video ended event
  const handleEnded = useCallback(() => {
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

    // Immediately update backend on video end
    api
      .post(`/videos/${videoId}/progress`, finalProgress)
      .then((res) => {
        setLastPersistedSeconds(finalProgress.totalWatchTime || duration);
        // console.log("Video completion saved:", res.data.progress);
      })
      .catch((err) => console.error("Failed to save completion:", err));
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

  // Reset violation state (called when modal is dismissed)
  const resetViolationState = useCallback(() => {
    // console.log('Resetting violation state');
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
