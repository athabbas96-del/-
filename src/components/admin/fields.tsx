import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-muted font-mono text-xs tracking-[0.1em] uppercase">
        {label}
      </span>
      {children}
      {hint && <span className="text-muted text-xs">{hint}</span>}
    </label>
  );
}

const controlClass =
  "border-border bg-background text-foreground focus:border-accent w-full rounded-[var(--radius-xs)] border px-4 py-2.5 text-sm outline-none transition-colors";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlClass, props.className)} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return <textarea {...props} className={cn(controlClass, props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(controlClass, props.className)} />;
}

export function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        {...props}
        className="accent-accent h-4 w-4 rounded"
      />
      {label}
    </label>
  );
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-foreground text-2xl font-medium tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-muted mt-1 text-sm">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border bg-surface rounded-[var(--radius-md)] border p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="border-border text-muted rounded-[var(--radius-md)] border border-dashed p-10 text-center text-sm">
      {label}
    </div>
  );
}
