"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useMounted } from "@/hooks/useMounted";
import type { MediaItem } from "@/types";

interface LightboxProps {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const mounted = useMounted();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [goNext, goPrev, onClose]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
  }

  if (!mounted) return null;

  const item = items[index];

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-8"
      >
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 sm:top-6 sm:right-6">
          <span className="me-2 font-mono text-xs text-white/60 tabular-nums">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={(event) => {
              event.stopPropagation();
              toggleFullscreen();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icon icon={isFullscreen ? Minimize : Maximize} size="sm" />
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icon icon={X} size="sm" />
          </button>
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              className="absolute start-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:start-6"
            >
              <Icon icon={ChevronLeft} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              className="absolute end-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:end-6"
            >
              <Icon icon={ChevronRight} />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-full max-w-5xl items-center justify-center"
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                controls
                className="max-h-[85vh] w-auto max-w-full rounded-[var(--radius-sm)]"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                width={1600}
                height={1200}
                className="max-h-[85vh] w-auto max-w-full rounded-[var(--radius-sm)] object-contain"
                sizes="90vw"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
