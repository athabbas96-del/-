import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

interface SectionProps {
  as?: ElementType;
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  noContainer?: boolean;
}

export function Section({
  as: Tag = "section",
  id,
  children,
  className,
  containerClassName,
  noContainer = false,
}: SectionProps) {
  const content = noContainer ? (
    children
  ) : (
    <Container className={containerClassName}>{children}</Container>
  );

  return (
    <Tag
      id={id}
      className={cn("w-full", className)}
      style={{ paddingBlock: "var(--section-padding-y)" }}
    >
      {content}
    </Tag>
  );
}
