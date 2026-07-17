"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Grid } from "@/components/ui/Grid";
import { fadeInUp, viewportOnce, staggerChildren } from "@/lib/motion";
import { localizedHref } from "@/i18n/config";
import { useI18n } from "@/i18n/DictionaryProvider";
import type { Client } from "@/types";

interface LogoWallProps {
  clients: Client[];
}

export function LogoWall({ clients }: LogoWallProps) {
  const { locale } = useI18n();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerChildren()}
    >
      <Grid cols={3}>
        {clients.map((client) => {
          const tile = (
            <div className="flex aspect-[3/2] items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/[0.03] p-8 transition-colors hover:bg-white/[0.06]">
              <div className="relative h-full w-full opacity-70 grayscale-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 33vw, 50vw"
                />
              </div>
            </div>
          );

          return (
            <motion.div key={client.name} variants={fadeInUp} className="group">
              {client.slug ? (
                <Link
                  href={localizedHref(locale, `/work/${client.slug}`)}
                  aria-label={client.name}
                >
                  {tile}
                </Link>
              ) : (
                <div aria-label={client.name}>{tile}</div>
              )}
            </motion.div>
          );
        })}
      </Grid>
    </motion.div>
  );
}
