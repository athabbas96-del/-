"use client";

import { Moon, Sun } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white",
        className,
      )}
    >
      {mounted && <Icon icon={isDark ? Sun : Moon} size="sm" />}
    </button>
  );
}
