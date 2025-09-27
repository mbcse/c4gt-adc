import React, { useRef, useEffect, useState, useCallback } from "react";
import ReactPlayer from "react-player";
import { useVideoProgressWithAnalytics } from "@/student/hooks/useVideoProgressWithAnalytics";
import { Modal } from "@/student/components/Modal";

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
  const [hasSeeked, setHasSeeked] = useState(false);
  const [showSpeedWarning, setShowSpeedWarning] = useState(false);
  const [showSeekWarning, setShowSeekWarning] = useState(false);
  const [detectedSpeed, setDetectedSpeed] = useState<number>(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Track the last valid progress position (before speed violation)
  const [lastValidPosition, setLastValidPosition] = useState<number>(0);

  const hasSeekedOnceRef = useRef(false);
  const hasSeekedOnPlayRef = useRef(false);
  const wasPlayingBeforeSeek = useRef(false);

  useEffect(() => {
    hasSeekedOnceRef.current = false;
    hasSeekedOnPlayRef.current = false;
    setHasSeeked(false);
    setActualDuration(duration);
    setLastValidPosition(0);
  }, [videoId, duration]);

  // Handle speed violations from hook
  const handleSpeedViolation = useCallback((speed: number) => {
    console.warn("Speed violation callback triggered:", speed);
    setDetectedSpeed(speed);
    setShowSpeedWarning(true);
    setIsPlaying(false); // Pause the video
  }, [setIsPlaying, showSpeedWarning]);

  const handleSeekViolation = useCallback(() => {
    console.warn("Seek violation callback triggered");
    setShowSeekWarning(true);
    setIsPlaying(false); // Pause the video
  }, [setIsPlaying]);

  const {
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
  } = useVideoProgressWithAnalytics({
    videoId,
    duration: actualDuration,
    playbackRate,
    onBackendProgressUpdate: onProgressUpdate,
    onSpeedViolation: handleSpeedViolation,
    onSeekViolation: handleSeekViolation,
  });

  const handlePlayerReady = useCallback(() => {
    setIsPlayerReady(true);

    // Set the player reference for speed monitoring with a slight delay to ensure the internal player is fully initialized
    if (setPlayerRef) {
      setTimeout(() => {
        if (playerRef.current) {
          setPlayerRef(playerRef.current);
        }
      }, 300);
    }

    if (onReady) onReady();
  }, [onReady, setPlayerRef]);

  // Also set player ref when it becomes available
  useEffect(() => {
    if (isPlayerReady && playerRef.current && setPlayerRef) {
      setPlayerRef(playerRef.current);
    }
  }, [isPlayerReady, setPlayerRef]);

  // Sync external seekPosition, only perform seeks when player is ready
  useEffect(() => {
    if (!isPlayerReady || !seekPosition || hasSeekedOnceRef.current) return;

    const performSeek = () => {
      if (playerRef.current) {
        const internalPlayer = playerRef.current.getInternalPlayer?.() || playerRef.current;

        if (internalPlayer && typeof internalPlayer.currentTime === 'number') {
          internalPlayer.currentTime = seekPosition;

          const checkSeekComplete = () => {
            if (Math.abs(internalPlayer.currentTime - seekPosition) < 0.5) {
              hasSeekedOnceRef.current = true;
              setHasSeeked(true);
              setCurrentTime(seekPosition);
              setLastValidPosition(seekPosition);
            } else {
              setTimeout(checkSeekComplete, 100);
            }
          };
          checkSeekComplete();

        } else if (typeof playerRef.current.seekTo === 'function') {
          playerRef.current.seekTo(seekPosition, 'seconds');
          setTimeout(() => {
            hasSeekedOnceRef.current = true;
            setHasSeeked(true);
            setCurrentTime(seekPosition);
            setLastValidPosition(seekPosition);
          }, 300);
        }
      }
    };

    const timeoutId = setTimeout(performSeek, 500);
    return () => clearTimeout(timeoutId);
  }, [seekPosition, isPlayerReady]);

  const onPlay = useCallback(() => {
    setIsPlaying(true);
    handlePlay();
    if (
      !hasSeekedOnPlayRef.current &&
      seekPosition &&
      playerRef.current
    ) {
      const internalPlayer = playerRef.current.getInternalPlayer?.() || playerRef.current;
      if (internalPlayer && typeof internalPlayer.currentTime === 'number') {
        internalPlayer.currentTime = seekPosition;
      } else if (typeof playerRef.current.seekTo === 'function') {
        playerRef.current.seekTo(seekPosition, 'seconds');
      }
      setCurrentTime(seekPosition);
      setLastValidPosition(seekPosition);
      hasSeekedOnPlayRef.current = true;
      setHasSeeked(true);
    }
  }, [setIsPlaying, handlePlay, currentTime, seekPosition]);

  const onPause = useCallback(() => {
    setIsSeeking(false);
    setIsPlaying(false);
    handlePause();
  }, [setIsPlaying, handlePause, currentTime]);

  const onSeeking = useCallback(() => {
    setIsSeeking(true);
    wasPlayingBeforeSeek.current = playing;
  }, [playing]);

  const onSeeked = useCallback(() => {
    setIsSeeking(false);
    setHasSeeked(true);
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer?.() || playerRef.current;
      if (internalPlayer && typeof internalPlayer.currentTime === 'number') {
        const newTime = internalPlayer.currentTime;
        const skipDistance = Math.abs(newTime - currentTime);
        if (skipDistance > 2) {
          handleSeek(currentTime, newTime);
        }
        
        setCurrentTime(newTime);
      }
    }
  }, [handleSeek, currentTime]);

  const onProgress = useCallback((state: any) => {
    if (isSeeking) return;

    if (!hasSeeked) {
      // Ignore progress events until seeking is done
      return;
    }

    // Handle both ReactPlayer v2 and v3 progress events
    let playedSeconds = 0;
    let played = 0;

    if (state.playedSeconds !== undefined) {
      // ReactPlayer v2 format or onProgress callback
      playedSeconds = state.playedSeconds;
      played = state.played || 0;
    } else if (state.target?.currentTime !== undefined) {
      // Native HTML5 video element format or onTimeUpdate callback
      playedSeconds = state.target.currentTime;
      played = state.target.currentTime / actualDuration;
    } else if (playerRef.current) {
      // Fallback: get current time directly from player
      const internalPlayer = playerRef.current.getInternalPlayer?.() || playerRef.current;
      if (internalPlayer && typeof internalPlayer.currentTime === 'number') {
        playedSeconds = internalPlayer.currentTime;
        played = playedSeconds / actualDuration;
      }
    }

    setCurrentTime(playedSeconds);

    // Update last valid position only if we're not in a speed violation state
    if (!showSpeedWarning) {
      setLastValidPosition(playedSeconds);
    }

    // Create consistent progress state for the hook
    const progressState = {
      played,
      playedSeconds,
      loaded: state.loaded || (state.target?.buffered.length > 0 ? state.target.buffered.end(0) / actualDuration : 0),
      loadedSeconds: state.loadedSeconds || (state.target?.buffered.length > 0 ? state.target.buffered.end(0) : 0),
    };

    handleProgress(progressState);
  }, [isSeeking, hasSeeked, handleProgress, actualDuration, showSpeedWarning]);

  const onTimeUpdate = useCallback((state: any) => {
    if (isSeeking) return;

    let playedSeconds = 0;
    let played = 0;

    if (state.playedSeconds !== undefined) {
      playedSeconds = state.playedSeconds;
      played = state.played || 0;
    } else if (state.target?.currentTime !== undefined) {
      playedSeconds = state.target.currentTime;
      played = state.target.currentTime / actualDuration;
    } else if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer?.() || playerRef.current;
      if (internalPlayer && typeof internalPlayer.currentTime === 'number') {
        playedSeconds = internalPlayer.currentTime;
        played = playedSeconds / actualDuration;
      }
    }

    setCurrentTime(playedSeconds);

    if (!showSpeedWarning) {
      setLastValidPosition(playedSeconds);
    }

    const progressState = {
      played,
      playedSeconds,
      loaded: state.loaded || (state.target?.buffered.length > 0 ? state.target.buffered.end(0) / actualDuration : 0),
      loadedSeconds: state.loadedSeconds || (state.target?.buffered.length > 0 ? state.target.buffered.end(0) : 0),
    };

    handleProgress(progressState);
  }, [isSeeking, actualDuration, showSpeedWarning, handleProgress]);


  const onEnded = useCallback(() => {
    setIsPlaying(false);
    handleEnded();
  }, [setIsPlaying, handleEnded]);

  const onError = useCallback((error: any) => {
    console.error("Video player error:", error);
    setIsPlaying(false);
  }, [setIsPlaying]);

  const handleRateChange = useCallback((e: any) => {
    let newRate = e?.playbackRate;

    // fallback - some players don’t pass event.playbackRate
    if (!newRate && playerRef.current) {
      const internal = playerRef.current.getInternalPlayer?.() || playerRef.current;
      newRate = internal?.playbackRate || 1;
    }

    setPlaybackRate(newRate);

    // Violation check
    if (newRate > 1.5) {
      console.warn("Playback too fast:", newRate);
      setDetectedSpeed(newRate);
      setShowSpeedWarning(true);
      setIsPlaying(false); // pause immediately
    }
  }, [setIsPlaying]);

  const resetAndResumePlayer = useCallback(() => {
    if (resetViolationState) {
      resetViolationState();
    }

    const seekToSeconds = Math.max(0, Math.min(lastPersistedSeconds, actualDuration));

    hasSeekedOnceRef.current = true;
    setHasSeeked(true);

    const internalPlayer = playerRef.current.getInternalPlayer?.() || playerRef.current;
    if (internalPlayer && typeof internalPlayer.currentTime === 'number') {
      const oldTime = internalPlayer.currentTime;
      internalPlayer.currentTime = seekToSeconds;
      setCurrentTime(seekToSeconds);
      setLastValidPosition(seekToSeconds);
      handleSeek(oldTime, seekToSeconds);
    } else if (typeof playerRef.current.seekTo === 'function') {
      const oldTime = currentTime;
      playerRef.current.seekTo(seekToSeconds, 'seconds');
      setCurrentTime(seekToSeconds);
      setLastValidPosition(seekToSeconds);
      handleSeek(oldTime, seekToSeconds);
    }

    setPlaybackRate(1);
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  }, [resetViolationState, lastPersistedSeconds, actualDuration, setIsPlaying, handleSeek, currentTime]);

  const handleSpeedWarningClose = useCallback(() => {
    setShowSpeedWarning(false);
    resetAndResumePlayer();
  }, [resetAndResumePlayer]);

  const handleSeekWarningClose = useCallback(() => {
    setShowSeekWarning(false);
    resetAndResumePlayer();
  }, [resetAndResumePlayer]);


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

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-black">
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        <ReactPlayer
          key={videoId}
          ref={playerRef}
          src={videoUrl} 
          playing={playing}
          playbackRate={playbackRate}
          onRateChange={handleRateChange}
          controls
          width="100%"
          height="100%"
          onReady={handlePlayerReady}
          onPlay={onPlay}
          onPause={onPause}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
          // onProgress={onProgress}
          onTimeUpdate={onTimeUpdate}
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

      {/* --- MODAL RENDERING --- */}

      {/* MODAL 1: Playback Speed Warning */}
      {showSpeedWarning && (
        <Modal open={showSpeedWarning} onOpenChange={() => { }}>
          <div className="text-center p-6">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-red-600">
                Playback Speed Warning
              </h3>
            </div>

            <div className="text-left space-y-3 mb-6">
              <p className="text-gray-700">
                <strong>Speed detected:</strong> {detectedSpeed.toFixed(2)}x<br />
                <strong>Maximum allowed:</strong> 1.5x
              </p>
              <p className="text-gray-600">
                Our system detected that you may be watching this video at an unusually high speed.
              </p>
              <p className="text-gray-600">
                For effective learning and proper progress tracking, please watch at normal speed and avoid large skips.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 text-left">
              <p className="text-sm text-blue-800">
                <strong>What happens now?</strong><br />
                • The video has been paused<br />
                • You will be returned to the last valid position<br />
                • Please resume watching at normal speed
              </p>
            </div>

            <button
              onClick={handleSpeedWarningClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              I Understand - Resume Normal Playback
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL 2: Excessive Seek/Skip Warning */}
      {showSeekWarning && (
        <Modal open={showSeekWarning} onOpenChange={() => { }}>
          <div className="text-center p-6">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-red-600">
                Watch Behavior Notice
              </h3>
            </div>

            <div className="text-left space-y-3 mb-6">
              <p className="text-gray-700">
                <strong>Issue:</strong> Excessive video skipping detected
              </p>
              <p className="text-gray-600">
                Please watch videos sequentially without excessive skipping to ensure proper learning.
              </p>
              <p className="text-gray-600">
                For effective learning and proper progress tracking, please watch at normal speed and avoid large skips.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 text-left">
              <p className="text-sm text-blue-800">
                <strong>What happens now?</strong><br />
                • The video has been paused<br />
                • You will be returned to the last valid position<br />
                • Please resume watching at normal speed
              </p>
            </div>

            <button
              onClick={handleSeekWarningClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              I Understand - Resume Normal Playback
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}