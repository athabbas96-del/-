import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — ATH Portfolio",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="bg-background flex min-h-svh w-full items-center justify-center px-6">
      <div className="border-border bg-surface w-full max-w-sm rounded-[var(--radius-lg)] border p-8">
        <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
          Admin
        </span>
        <h1 className="text-foreground mt-3 text-2xl font-medium tracking-tight">
          Sign in to the dashboard
        </h1>
        <p className="text-muted mt-2 text-sm">
          Manage projects, clients, services, articles, and media.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
