import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

type ProgressState = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

interface VideoPlayerProps {
  videoUrl: string;
  duration: number;
  playing: boolean;
  seekPosition?: number; // optional seek command from parent
  onProgress: (state: ProgressState) => void;
  onSeeked?: (seconds: number) => void; // notify parent after user seek
  onPlayPause: () => void;
  onReady?: () => void;
}

export function VideoPlayer({
  videoUrl,
  duration,
  playing,
  seekPosition,
  onProgress,
  onSeeked,
  onPlayPause,
  onReady,
}: VideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  // Sync internal seek with external seekPosition prop
  useEffect(() => {
    if (
      seekPosition !== undefined &&
      playerRef.current &&
      Math.abs(seekPosition - seekValue) > 0.5
    ) {
      playerRef.current.seekTo(seekPosition, "seconds");
      setSeekValue(seekPosition);
    }
  }, [seekPosition, seekValue]);

  const handleProgress = (state: ProgressState) => {
    if (!isSeeking) {
      setSeekValue(state.playedSeconds);
      onProgress(state);
    }
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeekValue(Number(event.target.value));
  };

  const handleSeekMouseUp = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(event.target.value);
    setIsSeeking(false);
    playerRef.current?.seekTo(val, "seconds");
    onSeeked?.(val);
  };
  

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
          onProgress={handleProgress as any}
          onSeeked={() => setIsSeeking(false)}
          onPlay={onPlayPause}
          onPause={onPlayPause}
          onReady={onReady}
          config={{
            youtube: {
              modestbranding: 1,
              cc_lang_pref: "en",
              rel: 0,
            } as any,
          }}
        />
      </div>

      {/* Custom Controls Panel */}
      <div className="bg-gradient-to-r from-violet-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-sm p-4 border-t border-violet-500/20">
        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-violet-200 flex items-center gap-2">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
              Video Progress
            </span>
            <span className="text-sm font-bold text-white bg-black/30 px-2 py-1 rounded-lg">
              {Math.floor(seekValue / 60)}:{Math.floor(seekValue % 60).toString().padStart(2, '0')} /
              {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
            </span>
          </div>

          
        </div>

        {/* Video Info */}
        <div className="flex items-center justify-between text-xs text-violet-200">
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              playing ? 'bg-emerald-400 animate-pulse' : 'bg-orange-400'
            }`}></div>
            <span className="font-medium">{playing ? 'Playing' : 'Paused'}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium bg-black/30 px-2 py-1 rounded">Quality: Auto</span>
          </span>
        </div>
      </div>


    </div>
  );
}
