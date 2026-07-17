import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

interface IconProps {
  icon: LucideIcon;
  size?: keyof typeof sizeMap;
  className?: string;
}

/**
 * Enforces the icon style guideline: 1.5px stroke, three fixed sizes
 * (16 / 20 / 24), no filled icons.
 */
export function Icon({
  icon: LucideIconComponent,
  size = "md",
  className,
}: IconProps) {
  return (
    <LucideIconComponent
      size={sizeMap[size]}
      strokeWidth={1.5}
      className={cn("shrink-0", className)}
    />
  );
}
