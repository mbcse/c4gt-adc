import { useState, useEffect, useCallback, useRef } from "react";
import { useApi } from "@/api/index";

interface UseVideoProgressWithAnalyticsProps {
  videoId: number;
  duration: number;
  onBackendProgressUpdate?: (progress: any) => void;
}

const MAX_EVENTS = 100;

export function useVideoProgressWithAnalytics({
  videoId,
  duration,
  onBackendProgressUpdate,
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

  const lastUpdateTime = useRef<number>(0);
  const skipEventsRef = useRef<any[]>([]);
  const pauseEventsRef = useRef<any[]>([]);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

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
  // Debounced backend progress update
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
        console.log("Backend progress updated:", response.data.progress);
        setError(null);
      } catch (err) {
if (retryAttempts.current < 5) {
  retryAttempts.current++;
  const delay = Math.pow(2, retryAttempts.current) * 1000;
  updateTimeoutRef.current = setTimeout(() => debouncedUpdate(progressData), delay);
} else {
  setError("Failed to save progress after several attempts.");
}
      }
    }, 2000);
  },
  [api, videoId]
  );

  // Handle progress event with immediate UI updates
  const handleProgress = useCallback(
    (progressEvent: { played: number; playedSeconds: number }) => {
      const now = Date.now();
      const played = Math.max(0, Math.min(1, progressEvent.played || 0));
      const playedSeconds = Math.max(0, progressEvent.playedSeconds || 0);
      const watchedPercentage = duration > 0 ? Math.min(played * 100, 100) : 0;

      // Update progress state immediately for UI responsiveness
      const newProgress = {
        watchedPercentage,
        totalWatchTime: Math.max(playedSeconds, progress.totalWatchTime),
        isCompleted: watchedPercentage >= 95,
        skipEvents: skipEventsRef.current,
        pauseEvents: pauseEventsRef.current,
      };

      setProgress(prev => ({
        ...prev,
        ...newProgress
      }));

      // Notify parent immediately
      if (onBackendProgressUpdate) {
        console.log('Progress update sent to parent:', newProgress); // Debug log
        onBackendProgressUpdate(newProgress);
      }

      // Send analytics event for progress (throttled every 5 seconds)
      if (now - lastUpdateTime.current > 5000) {
        lastUpdateTime.current = now;
        sendAnalyticsEvent("video_progress", {
          currentTime: playedSeconds,
          percentWatched: watchedPercentage,
        });

        // Send backend progress update debounced
        debouncedUpdate(newProgress);
      }
    },
    [duration, sendAnalyticsEvent, debouncedUpdate, onBackendProgressUpdate, progress.totalWatchTime]
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
      const skipEvent = { timestamp: Date.now(), from, to };
      skipEventsRef.current.push(skipEvent);
      sendAnalyticsEvent("video_seek", { seekFrom: from, seekTo: to });
    },
    [sendAnalyticsEvent]
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
        console.log("Video completion saved:", res.data.progress);
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
        
        setProgress(initialProgress);
        skipEventsRef.current = initialProgress.skipEvents || [];
        pauseEventsRef.current = initialProgress.pauseEvents || [];
        
        // Notify parent of initial progress
        if (onBackendProgressUpdate) {
          console.log('Initial progress loaded:', initialProgress); // Debug log
          onBackendProgressUpdate(initialProgress);
        }
      } catch (error) {
        setError("Failed to load progress");
        console.error("Failed to load progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (videoId > 0) {
      loadProgress();
    }

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [api, videoId, onBackendProgressUpdate]);

  return {
    progress,
    error,
    isLoading,
    handleProgress,
    handlePlay,
    handlePause,
    handleSeek,
    handleEnded,
  };
}
