import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function Container({
  as: Tag = "div",
  children,
  className,
}: ContainerProps) {
  return createElement(
    Tag,
    {
      className: cn("mx-auto w-full max-w-[var(--container-max)]", className),
      style: { paddingInline: "var(--container-padding)" },
    },
    children,
  );
}
