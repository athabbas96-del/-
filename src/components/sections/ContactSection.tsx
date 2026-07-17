"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactChannels } from "@/components/ui/ContactChannels";
import { fadeInUp, staggerChildren, viewportOnce } from "@/lib/motion";

export function ContactSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerChildren()}
      className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16"
    >
      <motion.div variants={fadeInUp}>
        <ContactForm />
      </motion.div>

      <ContactChannels />
    </motion.div>
  );
}
