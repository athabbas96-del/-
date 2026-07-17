"use client";

import { type ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { LoadingScreen } from "@/components/animations/LoadingScreen";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageTransition } from "@/components/animations/PageTransition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      <CustomCursor />
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </SmoothScrollProvider>
  );
}
