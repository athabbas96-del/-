import { Reveal } from "@/components/animations/Reveal";
import { fadeInUp } from "@/lib/motion";
import type { MediaItem } from "@/types";

interface CaseStudyVideoProps {
  video: MediaItem;
}

export function CaseStudyVideo({ video }: CaseStudyVideoProps) {
  return (
    <Reveal variants={fadeInUp}>
      <div className="bg-surface overflow-hidden rounded-[var(--radius-lg)]">
        <video
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          className="aspect-video w-full object-cover"
        />
      </div>
    </Reveal>
  );
}
