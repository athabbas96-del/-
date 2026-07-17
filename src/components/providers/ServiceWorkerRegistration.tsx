"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Offline support is a progressive enhancement — a failed
      // registration (unsupported browser, blocked by extension) shouldn't
      // affect the rest of the app.
    });
  }, []);

  return null;
}
