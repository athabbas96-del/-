"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { loginAction, type LoginState } from "@/lib/actions/auth";
import { Icon } from "@/components/ui/Icon";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="text-muted font-mono text-xs tracking-[0.1em] uppercase">
          Username
        </span>
        <input
          name="username"
          type="text"
          autoComplete="username"
          required
          defaultValue="admin"
          className="border-border bg-background text-foreground focus:border-accent rounded-[var(--radius-xs)] border px-4 py-3 text-sm transition-colors outline-none"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-muted font-mono text-xs tracking-[0.1em] uppercase">
          Password
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="border-border bg-background text-foreground focus:border-accent rounded-[var(--radius-xs)] border px-4 py-3 text-sm transition-colors outline-none"
        />
      </label>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
      >
        {isPending ? (
          <Icon icon={Loader2} size="sm" className="animate-spin" />
        ) : (
          <Icon icon={Lock} size="sm" />
        )}
        Sign In
      </button>
    </form>
  );
}
