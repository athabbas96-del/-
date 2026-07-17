import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const cardVariants = cva("rounded-[var(--radius-lg)] p-6 sm:p-8", {
  variants: {
    variant: {
      surface: "bg-surface",
      outline: "border border-border bg-transparent",
      elevated: "bg-background shadow-md",
      glass: "glass",
    },
  },
  defaultVariants: {
    variant: "surface",
  },
});

interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
}

export function Card({ children, variant, className }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)}>{children}</div>
  );
}
