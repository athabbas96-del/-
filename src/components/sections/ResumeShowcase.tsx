"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerChildren } from "@/lib/motion";
import { VideoResumePlayer } from "@/components/ui/VideoResumePlayer";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { showreel } from "@/content/resume";

const AuroraBackground = dynamic(
  () => import("@/components/three/AuroraBackground"),
  {
    ssr: false,
  },
);

interface ResumeShowcaseProps {
  cvUrl: string | null;
  portfolioUrl: string | null;
}

export function ResumeShowcase({ cvUrl, portfolioUrl }: ResumeShowcaseProps) {
  return (
    <section className="bg-navy relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 15%, #16213d 0%, #0b1220 55%, #060a14 100%)",
          }}
        />
        <AuroraBackground />
        <div className="from-navy to-navy pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren()}
          className="flex w-full flex-col items-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-accent-blue font-mono text-xs tracking-[0.15em] uppercase"
          >
            Interactive Resume
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-display-sm mt-4 max-w-[20ch] leading-[1.05] font-medium tracking-tight text-white"
          >
            A 30-second walkthrough of seven years of work
          </motion.h1>

          <motion.div variants={fadeInUp} className="mt-12 w-full max-w-3xl">
            <VideoResumePlayer
              sources={showreel.sources}
              poster={showreel.poster}
              subtitlesSrc={showreel.subtitlesSrc}
              bookmarks={showreel.bookmarks}
            />
          </motion.div>

          {(cvUrl || portfolioUrl) && (
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              {cvUrl && (
                <a
                  href={cvUrl}
                  download
                  className={buttonVariants({ variant: "accent", size: "lg" })}
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              )}
              {portfolioUrl && (
                <a
                  href={portfolioUrl}
                  download
                  className={cn(
                    "inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-xs)] border border-white/25 px-8 text-base font-medium text-white transition-colors hover:bg-white/10",
                  )}
                >
                  <Download className="h-4 w-4" />
                  Download Portfolio PDF
                </a>
              )}
            </motion.div>
          )}

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <SocialLinks className="flex items-center gap-3" />
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:ath.abbas96@gmail.com"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-xs)] border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Email Me
              </a>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "accent", size: "md" })}
              >
                Let&rsquo;s Talk
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
