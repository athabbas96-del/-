import Image from "next/image";
import type { Client } from "@/types";

interface LogoMarqueeProps {
  clients: Client[];
}

export function LogoMarquee({ clients }: LogoMarqueeProps) {
  const items = [...clients, ...clients];

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max items-center gap-16 group-hover:[animation-play-state:paused]">
        {items.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="relative h-9 w-24 shrink-0 opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-10 sm:w-28"
          >
            <Image
              src={client.logo}
              alt={client.name}
              fill
              className="object-contain"
              sizes="120px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
