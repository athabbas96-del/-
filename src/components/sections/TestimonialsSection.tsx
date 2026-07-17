"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Grid } from "@/components/ui/Grid";
import { fadeInUp, viewportOnce, staggerChildren } from "@/lib/motion";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerChildren()}
    >
      <Grid
        cols={testimonials.length >= 3 ? 3 : (testimonials.length as 1 | 2)}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.author}
            variants={fadeInUp}
            className="h-full"
          >
            <Card variant="surface" className="flex h-full flex-col gap-4">
              {testimonial.rating && <StarRating rating={testimonial.rating} />}
              <p className="text-foreground text-base">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="text-muted mt-auto text-sm">
                <span className="text-foreground font-medium">
                  {testimonial.author}
                </span>
                {" — "}
                {testimonial.role}
              </div>
            </Card>
          </motion.div>
        ))}
      </Grid>
    </motion.div>
  );
}
