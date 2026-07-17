"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbox } from "@/components/ui/Lightbox";
import { staggerChildren, fadeInUp, viewportOnce } from "@/lib/motion";
import type { MediaItem } from "@/types";

interface CaseStudyGalleryProps {
  media: MediaItem[];
}

export function CaseStudyGallery({ media }: CaseStudyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren()}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {media.map((item, index) => (
          <motion.button
            key={item.src}
            type="button"
            variants={fadeInUp}
            onClick={() => setActiveIndex(index)}
            className="group bg-surface relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]"
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
              <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-black opacity-0 transition-opacity group-hover:opacity-100">
                View
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {activeIndex !== null && (
        <Lightbox
          items={media}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
