"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True only after client-side hydration. Avoids the SSR/client mismatch
 * you'd get by rendering portal-dependent UI (document.body, window) on
 * the server, without needing a setState-in-effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
