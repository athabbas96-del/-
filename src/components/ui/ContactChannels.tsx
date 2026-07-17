"use client";

import {
  Camera,
  MessageCircle,
  Mail,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { fadeInUp, staggerChildren } from "@/lib/motion";
import { contactChannels } from "@/config/site";

const iconMap: Record<string, LucideIcon> = {
  Camera,
  MessageCircle,
  Mail,
  Briefcase,
};

export function ContactChannels() {
  return (
    <motion.div
      variants={staggerChildren(0.06)}
      className="flex flex-col gap-3"
    >
      {contactChannels.map((channel) => {
        const IconComponent = iconMap[channel.icon] ?? Mail;
        return (
          <motion.a
            key={channel.label}
            variants={fadeInUp}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={
              channel.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="group border-border bg-surface hover:border-accent/40 flex items-center gap-4 rounded-[var(--radius-md)] border px-5 py-4 transition-colors"
          >
            <span className="bg-background text-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
              <Icon icon={IconComponent} size="sm" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-muted font-mono text-[11px] tracking-[0.1em] uppercase">
                {channel.label}
              </span>
              <span className="text-foreground truncate text-sm font-medium">
                {channel.value}
              </span>
            </span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
