"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import type { BeforeAfter } from "@/types";

interface BeforeAfterSliderProps {
  data: BeforeAfter;
}

export function BeforeAfterSlider({ data }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-surface relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] select-none">
        <Image
          src={data.before}
          alt={data.beforeAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 800px, 100vw"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={data.after}
            alt={data.afterAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 800px, 100vw"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg">
            <Icon icon={MoveHorizontal} size="sm" />
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Before and after comparison slider"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      {data.caption && (
        <p className="text-muted text-center text-sm">{data.caption}</p>
      )}
    </div>
  );
}
