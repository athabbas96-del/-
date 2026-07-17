"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { Play, Pause, Maximize, Minimize } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface VideoBookmark {
  time: number;
  label: string;
}

interface VideoSource {
  src: string;
  type: string;
}

interface VideoResumePlayerProps {
  sources: VideoSource[];
  poster: string;
  subtitlesSrc: string;
  bookmarks: VideoBookmark[];
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function VideoResumePlayer({
  sources,
  poster,
  subtitlesSrc,
  bookmarks,
}: VideoResumePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(true);

  const play = useCallback(() => {
    videoRef.current?.play();
    setHasStarted(true);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) play();
    else video.pause();
  }, [play]);

  const seekTo = useCallback(
    (time: number) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = time;
      if (video.paused) play();
    },
    [play],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onDurationChange = () => {
      if (Number.isFinite(video.duration)) setDuration(video.duration);
    };
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onDurationChange);
    video.addEventListener("durationchange", onDurationChange);
    // Metadata can finish loading before this effect attaches its listeners
    // (small local video, fast network) — re-check the current state directly.
    onDurationChange();
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("loadedmetadata", onDurationChange);
    };
  }, []);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const track = videoRef.current?.textTracks?.[0];
    if (track) {
      // eslint-disable-next-line react-hooks/immutability -- TextTrack.mode is a native mutable DOM property, not React state
      track.mode = captionsOn ? "showing" : "hidden";
    }
  }, [captionsOn, hasStarted]);

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current?.requestFullscreen();
  }

  function handleScrubberClick(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const pct = (event.clientX - rect.left) / rect.width;
    seekTo(pct * duration);
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="group relative w-full overflow-hidden rounded-[var(--radius-lg)] bg-black"
      >
        <video
          ref={videoRef}
          poster={poster}
          playsInline
          className="aspect-video w-full cursor-pointer"
          onClick={togglePlay}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
          <track
            kind="subtitles"
            src={subtitlesSrc}
            srcLang="en"
            label="English"
            default
          />
        </video>

        {!hasStarted && (
          <button
            type="button"
            onClick={play}
            aria-label="Play introduction video"
            className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform hover:scale-105">
              <Icon icon={Play} size="lg" className="ms-1" />
            </span>
          </button>
        )}

        {hasStarted && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100">
            <div
              onPointerDown={handleScrubberClick}
              className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/25"
            >
              <div
                className="bg-accent h-full rounded-full"
                style={{ width: `${progress}%` }}
              />
              {bookmarks.map((bookmark) => (
                <span
                  key={bookmark.label}
                  aria-hidden="true"
                  className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/40 bg-white"
                  style={{
                    left: `${(bookmark.time / (duration || 1)) * 100}%`,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="text-white/90 transition-colors hover:text-white"
                >
                  <Icon icon={isPlaying ? Pause : Play} size="sm" />
                </button>
                <span className="font-mono text-xs text-white/70 tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCaptionsOn((value) => !value)}
                  aria-label="Toggle subtitles"
                  aria-pressed={captionsOn}
                  className={cn(
                    "rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold transition-colors",
                    captionsOn
                      ? "bg-white text-black"
                      : "text-white/70 hover:text-white",
                  )}
                >
                  CC
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={
                    isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                  }
                  className="text-white/90 transition-colors hover:text-white"
                >
                  <Icon icon={isFullscreen ? Minimize : Maximize} size="sm" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {bookmarks.map((bookmark) => (
          <button
            key={bookmark.label}
            type="button"
            onClick={() => seekTo(bookmark.time)}
            className="rounded-full border border-white/20 px-3 py-1.5 font-mono text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            {formatTime(bookmark.time)} · {bookmark.label}
          </button>
        ))}
      </div>
    </div>
  );
}
